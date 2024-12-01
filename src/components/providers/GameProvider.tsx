'use client';

import React, {createContext, useContext, useState, useCallback, useEffect} from 'react';
import {
    User,
    GameState,
    PreGapTextDTO,
    WebSocketMessage,
    UserDTO,
    RejoinPreGapTextDTO,
    GuessScoreDTO
} from '@/lib/types';
import {api} from '@/lib/api';
import {useWebSocket} from '@/hooks/useWebSocket';

interface GameContextType {
    gameState: GameState;
    currentUser: User | null;
    gameId: string;
    view: 'none' | 'waiting' | 'fill' | 'guess' | 'ranking';
    setView: (view: 'none' | 'waiting' | 'fill' | 'guess' | 'ranking') => void;
    joinGame: (name: string) => Promise<void>;
    claimedGap: number | null;
    claimGap: (gapId: number) => Promise<void>;
    fillGap: (gapId: number, content: string) => Promise<void>;
    submitGuesses: (guesses: { gapId: number, userId: string }[]) => Promise<void>;
    guessScores: { name: string, token: string, score: number }[];
    setGuessScores: (scores: { name: string, token: string, score: number }[]) => void;
    showSpinnerType: 'none' | 'getready' | 'guess' | 'waiting_for_scores' | 'ranking';
    showSpinnerCountDown: number;
}

const GameContext = createContext<GameContextType | null>(null);

interface GameProviderProps {
    children: React.ReactNode;
    initialGameId: string;
}

export function GameProvider({children, initialGameId}: GameProviderProps) {
    const [gameState, setGameState] = useState<GameState>({
        users: [],
        gaps: [],
        guesses: [],
        textSections: []
    });

    const [view, setView] = useState<'none' | 'waiting' | 'fill' | 'guess' | 'ranking'>('none');

    // const [view, setView] = useState<'none' | 'waiting' |
    //     'fill' | 'guess' | 'ranking'>('none');
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // tryGapClaim placeholder
    const [claimedGap, setClaimedGap] = useState<number | null>(null);

    // guessScores placeholder
    const [guessScores, setGuessScores] = useState<{ name: string, token: string, score: number }[]>([]);

    // getReady placeholder
    const [showSpinnerType, setShowSpinnerType] = useState<'none' | 'getready' | 'guess' | 'waiting_for_scores' | 'ranking'>('none');
    const [showSpinnerCountDown, setShowSpinnerCountDown] = useState<number>(0);

    const handleWebSocketMessage = useCallback((message: WebSocketMessage) => {
        console.log('WS message:', message);
        switch (message.obj) {
            case 'user_joined':
                // Add new user to the game state
                setGameState(prev => ({
                    ...prev,
                    users: [...prev.users, {
                        id: message.value.token,
                        name: message.value.name,
                        token: message.value.token,
                        score: 0
                    }]
                }));
                break;

            case 'change_view':
                if (message.value === 'fill') {
                    // Update view to fill
                    setShowSpinnerCountDown(10);
                    setShowSpinnerType('getready');
                    setTimeout(() => {
                        setView('fill');
                        setShowSpinnerType('none');
                        setShowSpinnerCountDown(0);
                    }, 10000);
                } else {
                    setView(message.value);
                }
                break;

            case 'gap_claimed':
                // Update gap claiming status
                if (message.value === claimedGap) {
                    console.log('you claimed the gap:', message.value);
                } else {
                    // Update gap claiming status for other users
                    // ignore if the gap is already claimed locally
                    setGameState(prev => ({
                        ...prev,
                        gaps: prev.gaps.map(gap =>
                            gap.id === message.value && !gap.filledLocally
                                ? {...gap, claimed: true}
                                : gap
                        )
                    }))
                }
                break;

            case 'gap_filled':
                // Update gap content
                if (message.value === claimedGap) {
                    console.log('you filled the gap:', message.value);
                } else {
                    setGameState(prev => ({
                        ...prev,
                        gaps: prev.gaps.map(gap =>
                            gap.id === message.value && !gap.filledLocally
                                ? {...gap, filled: true}
                                : gap
                        )
                    }));
                }
                break;

            case 'start_guessing':
                // Update view to guess
                setShowSpinnerCountDown(5);
                setShowSpinnerType('guess');
                // load data for guess view from backend
                api.filledGaps(initialGameId, currentUser?.token || '').then(response => {
                    console.log('filled gaps:', response);
                    setGameState(prev => ({
                        ...prev,
                        gaps: prev.gaps.map(gap => {
                            // save filled gaps
                            const b_gap = response.gaps
                                .find((g: { gap_id: number, value: string }) => g.gap_id === gap.id);
                            if (b_gap) {
                                return {...gap, filled: true, value: b_gap.value}
                            } else {
                                return {...gap, filled: true, value: '...'}
                            }
                        }),
                        users: response.users.map((user: UserDTO) => userDTOconvert(user)),
                    }));
                });
                setTimeout(() => {
                    setView('guess');
                    setShowSpinnerType('none');
                    setShowSpinnerCountDown(0);
                }, 5000);
                break;

            case 'guess_scores':
                // Update guesses
                console.log('guess scores:', message.value);
                setShowSpinnerCountDown(5);
                setShowSpinnerType('ranking');
                setGuessScores(message.value
                    .map((score: GuessScoreDTO) => ({
                        name: score.name,
                        token: score.token,
                        score: score.score
                    })));
                setTimeout(() => {
                    setView('ranking');
                    setShowSpinnerType('none');
                    setShowSpinnerCountDown(0);
                }, 5000);
                break;
        }
    }, [currentUser]);

    const [joinCom, setJoinCom] = useState(false);
    // @ts-ignore
    const {sendMessage} = useWebSocket(
        joinCom,
        initialGameId,
        currentUser?.token || '',
        handleWebSocketMessage
    );

    const userDTOconvert = (user: UserDTO) => ({
        id: user.token,
        token: user.token,
        name: user.name,
    });

    const joinGame = async (name: string) => {
        const token = crypto.randomUUID();
        const response = await api.joinGame(initialGameId, name, token);

        if (response.success) {
            const newUser = {
                id: token,
                name: name,
                token,
                score: 0
            };

            setCurrentUser(newUser);
            // save to session storage
            sessionStorage.setItem(initialGameId + '_user', JSON.stringify(newUser));

            console.log(response.pre_gaps_text);
            setGameState(prev => ({
                ...prev,
                users: [...prev.users, newUser, ...response.current_users
                    .map((user: UserDTO) => (userDTOconvert(user)))],
                textSections: response.pre_gaps_text.map((section: PreGapTextDTO) => section.text),
                gaps: response.pre_gaps_text
                    .filter((section: PreGapTextDTO) => section.gap_after)
                    .map((section: PreGapTextDTO) => ({
                        id: section.id,
                        text: section.text,
                        claimed: false,
                        filledLocally: false,
                        value: '',
                    })),
            }));
            // join websocket
            setJoinCom(true);
        } else {
            throw new Error(response.message || 'Failed to join game');
        }
    };

    const claimGap = async (gapId: number) => {
        if (!currentUser) return;
        const result = await api.claimGap(initialGameId, gapId, currentUser.token);
        if (!result.success) {
            setClaimedGap(null);
        } else {
            setClaimedGap(gapId);
            setGameState(prev => ({
                ...prev,
                gaps: prev.gaps.map(gap =>
                    gap.id === gapId
                        ? {...gap, claimed: true, filledLocally: true}
                        : gap
                )
            }));
        }
    };

    const fillGap = async (gapId: number, content: string) => {
        if (!currentUser) return;
        const result = await api.fillGap(initialGameId, gapId, content, currentUser.token);
        if (!result.success) {
            console.error('Failed to fill gap:', result.message);
            setClaimedGap(null);
        } else {
            setGameState(prev => ({
                ...prev,
                gaps: prev.gaps.map(gap =>
                    gap.id === gapId
                        ? {...gap, filledLocally: true, filled: true, value: content}
                        : gap
                )
            }));
        }
    };

    const submitGuesses = async (guesses: { gapId: number, userId: string }[]) => {
        if (!currentUser) return;

        const guessesDTO = guesses.map(guess => ({
            gap_id: guess.gapId,
            token: guess.userId
        }));

        await api.submitGuesses(initialGameId, currentUser.token, guessesDTO).then(
            () => {
                console.log('showSpinnerType', showSpinnerType);
                if (showSpinnerType === 'none') {
                    // TODO don't show waiting for score if this is the last guess
                    setShowSpinnerCountDown(0);
                    setShowSpinnerType('waiting_for_scores');
                }
            }
        );
    };

    // recover user from session storage
    const recoverUser = async () => {
        const userString = sessionStorage.getItem(initialGameId + '_user');
        if (userString) {
            const currentUser = JSON.parse(userString);
            const response = await api.rejoinGame(initialGameId, currentUser?.name, currentUser?.token);

            if (response.success) {
                setCurrentUser(currentUser);
                if (response.view === 'ranking') {
                    setView('ranking');
                    setGuessScores(response.value.map((score: GuessScoreDTO) => ({
                        name: score.name,
                        token: score.token,
                        score: score.score
                    })));
                    return currentUser;
                } else {
                    // response is RejoinResponseDTO
                    setGameState(prev => ({
                        ...prev,
                        users: response.users
                            .map((user: User) => userDTOconvert(user)),
                        textSections: response.current_gap_text
                            .map((section: RejoinPreGapTextDTO) => section.text),
                        gaps: response.current_gap_text
                            .filter((section: RejoinPreGapTextDTO) => section.gap_after)
                            .map((section: RejoinPreGapTextDTO) => ({
                                id: section.id,
                                text: section.text,
                                claimed: section.claimed,
                                filled: section.filled,
                                filledLocally: section.filled_by_current_user,
                                value: section.gap_value || '',
                            })),
                        view: response.view
                    }))
                    response.current_gap_text
                        .filter((section: RejoinPreGapTextDTO) => section.filled_by_current_user)
                        .forEach((section: RejoinPreGapTextDTO) => {
                            setClaimedGap(section.id);
                        });
                    // join websocket
                    setJoinCom(true);
                    setView(response.view);
                    return currentUser;
                }
            } else {
                console.log('failed to recover user');
                return null;
            }
        } else {
            console.log('no user to recover');
            return null;
        }
    };
    useEffect(() => {
        recoverUser().then(r => console.log('recover user:', r));
    }, []);

    return (
        <GameContext.Provider
            value={{
                gameState,
                currentUser,
                gameId: initialGameId,
                view,
                setView,
                joinGame,
                claimedGap,
                claimGap,
                fillGap,
                submitGuesses,
                guessScores,
                setGuessScores,
                showSpinnerType,
                showSpinnerCountDown
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame must be used within a GameProvider');
    return context;
}