import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../../lib/api';
import { useWebSocket } from '../../hooks/useWebSocket';
import {GameState, User} from "../../types.ts";

interface GameContextType {
  gameState: GameState;
  currentUser: User | null;
  gameId: string;
  joinGame: (username: string) => Promise<void>;
  claimGap: (gapId: number) => Promise<void>;
  fillGap: (gapId: number, content: string) => Promise<void>;
  submitGuesses: (gapId: number, guesses: { gapId: number, userId: string }[]) => Promise<void>;
}

const GameContext = createContext<GameContextType | null>(null);

interface GameProviderProps {
  children: React.ReactNode;
  initialGameId: string;
}

export function GameProvider({ children, initialGameId }: GameProviderProps) {
  const [gameState, setGameState] = useState<GameState>({
    users: [],
    gaps: [],
    guesses: [],
    textSections: []
  });
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleWebSocketMessage = useCallback((data: any) => {
    switch (data.type) {
      case 'state_update':
        setGameState(data.payload);
        break;
      case 'gap_claimed':
        setGameState(prev => ({
          ...prev,
          gaps: prev.gaps.map(gap =>
            gap.id === data.payload.gap_id
              ? { ...gap, claimedBy: data.payload.user_id }
              : gap
          )
        }));
        break;
      case 'gap_filled':
        setGameState(prev => ({
          ...prev,
          gaps: prev.gaps.map(gap =>
            gap.id === data.payload.gap_id
              ? { ...gap, value: data.payload.content, filledBy: data.payload.user_id }
              : gap
          )
        }));
        break;
      case 'guess_submitted':
        setGameState(prev => ({
          ...prev,
          guesses: [...prev.guesses, data.payload]
        }));
        break;
    }
  }, []);

  const { sendMessage } = useWebSocket(
    initialGameId,
    currentUser?.token || '',
    handleWebSocketMessage
  );

  const joinGame = async (username: string) => {
    const token = crypto.randomUUID();
    const response = await api.joinGame(initialGameId, username, token);
    
    if (response.success) {
      setCurrentUser({
        id: token,
        name: username,
        token,
        score: 0
      });
      
      // Initialize game state with pre-gap text
      const textSections = response.pre_gaps_text.map((section: PreGapTextDTO) => section.text);
      const gaps = response.pre_gaps_text
        .filter(section => section.gap_after)
        .map((section, index) => ({
          id: section.id,
          text: section.text
        }));
      
      setGameState(prev => ({
        ...prev,
        textSections,
        gaps
      }));
    }
  };

  const claimGap = async (gapId: number) => {
    if (!currentUser) return;
    await api.claimGap(initialGameId, gapId, currentUser.token);
  };

  const fillGap = async (gapId: number, content: string) => {
    if (!currentUser) return;
    await api.fillGap(initialGameId, gapId, content, currentUser.token);
  };

  const submitGuesses = async (gapId: number, guesses: { gapId: number, userId: string }[]) => {
    if (!currentUser) return;
    
    const guessesDTO = guesses.map(guess => ({
      gap_id: guess.gapId,
      token: guess.userId
    }));
    
    await api.submitGuesses(initialGameId, gapId, currentUser.token, guessesDTO);
  };

  return (
    <GameContext.Provider 
      value={{
        gameState,
        currentUser,
        gameId: initialGameId,
        joinGame,
        claimGap,
        fillGap,
        submitGuesses
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