'use client';

import {useState} from 'react';
import {useGame} from "@/components/providers/GameProvider.tsx";
import {GuessBlock} from "@/components/GuessBlock.tsx";

export function GuessView() {
    const {gameState, submitGuesses} = useGame();
    const [guesses, setGuesses] = useState<Record<number, string>>([]);

    const handleGuess = (gapId: number, userId: string) => {
        setGuesses({...guesses, [gapId]: userId});
    };

    const handleGuessSubmit = () => {
        const guessArray = Object.entries(guesses)
            .map(([gapId, userId]) => ({gapId: parseInt(gapId), userId}));
        submitGuesses(guessArray);
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-8">Guess who wrote what …</h2>

            <div className="space-y-6">
                {gameState.gaps.filter(gap => gap.value).map((gap) => {
                    return (<span key={gap.id + "-span"}>
                       {gap.text}
                        <GuessBlock key={gap.id}
                                    gap={gap}
                                    users={gameState.users}
                                    onGuess={handleGuess}/>
                    </span>)
                })}.
            </div>
            <div className={`mt-10`}>
                <button
                    onClick={() => handleGuessSubmit()}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Submit Guess
                </button>
            </div>
        </div>
    );
}