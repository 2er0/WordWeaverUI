'use client';

import React, {useEffect, useState} from 'react';
import {useGame} from "@/components/providers/GameProvider.tsx";

export function FillView() {
    const {gameState, claimedGap, claimGap, fillGap} = useGame();
    const [input, setInput] = useState('');

    const verifyGapClaim = async (gapId: number) => {
        // open prompt to verify that the user wants to claim the gap
        const confirmed = window.confirm('Are you sure you want to claim this gap?');
        if (confirmed) {
            await handleGapClaim(gapId);
        }
    }

    const handleGapClaim = async (gapId: number) => {
        await claimGap(gapId);
    }

    const handleFill = async () => {
        if (claimedGap != null && input.trim()) {
            await fillGap(claimedGap, input.trim());
        }
    };

    useEffect(() => {
        if (gameState.gaps != undefined && claimedGap != null) {
            console.log('claimedGap:', claimedGap);
            setInput(gameState.gaps[claimedGap].value || '');
        }
    }, []);

    if (gameState.gaps === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-8">
            <h2 className="text-2xl font-bold text-center mb-8">Fill in the Story</h2>

            <div className="prose lg:prose-xl">
                {gameState.gaps.map((gap, index) => {
                    const isFilledByCurrentUser = gap.filledLocally;
                    const canFill = !gap.claimed && !isFilledByCurrentUser;
                    const isFilled = gap.filled && !isFilledByCurrentUser;

                    return (
                        <React.Fragment key={gap.id}>
                            <span>{gameState.textSections[index]}</span>
                            {' '}
                            <span
                                onClick={() => canFill && verifyGapClaim(gap.id)}
                                className={`inline-block min-w-[100px] px-3 py-1 rounded ${
                                    isFilledByCurrentUser
                                        ? 'bg-indigo-100'
                                        : isFilled
                                            ? 'bg-green-100'
                                            : canFill
                                                ? 'bg-yellow-100 cursor-pointer hover:bg-yellow-200'
                                                : 'bg-gray-100'
                                }`}
                            >
                {gap.value || '________'}
              </span>
                            {' '}
                        </React.Fragment>
                    );
                })}
                <span>{gameState.textSections[gameState.textSections.length - 1]}</span>
            </div>

            {claimedGap != null && (
                <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-200">
                    <div className="max-w-md mx-auto flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your word or phrase..."
                        />
                        <button
                            onClick={handleFill}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Fill
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}