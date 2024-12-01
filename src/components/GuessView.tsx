'use client';

import {useState} from 'react';
import {useGame} from "@/components/providers/GameProvider.tsx";
import {GuessBlock} from "@/components/GuessBlock.tsx";

export function GuessView() {
    const {gameState, currentUser, submitGuesses} = useGame();
    const [guesses, setGuesses] = useState<Record<number, string>>([]);

    const handleGuess = (gapId: number, userId: string) => {
        // TODO Implement me
        // save to state
        console.log('handleGuess', gapId, userId);
        setGuesses({...guesses, [gapId]: userId});
    };

    const handleGuessSubmit = () => {
        // TODO Implement me
        console.log('Submit Guess', guesses);
        const guessArray = Object.entries(guesses)
            .map(([gapId, userId]) => ({gapId: parseInt(gapId), userId}));
        submitGuesses(guessArray);
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-8">Guess Who Wrote What</h2>

            <div className="space-y-6">
                {gameState.gaps.filter(gap => gap.value).map((gap) => {
                    return (
                        <GuessBlock key={gap.id}
                            currentUser={currentUser}
                            gap={gap}
                            users={gameState.users}
                            onGuess={handleGuess}/>
                    )
                })}
            </div>
            <button
                onClick={() => handleGuessSubmit()}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
                Submit Guess
            </button>
        </div>
    );
}