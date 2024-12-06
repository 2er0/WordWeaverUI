'use client';

import React, {useEffect, useState} from 'react';
import {Send} from 'lucide-react'
import {useGame} from "@/components/providers/GameProvider.tsx";

export function FillView() {
    const {gameState, claimedGap, claimGap, fillGap} = useGame();
    const [input, setInput] = useState('');

    const verifyGapClaim = async (gapId: number) => {
        // open prompt to verify that the user wants to claim the gap
        if (claimedGap != null) {
            window.alert('You have already claimed a gap!');
        } else {
            const confirmed = window.confirm('Are you sure you want to claim this gap?');
            if (confirmed) {
                await handleGapClaim(gapId);
            }
        }
    }

    const handleGapClaim = async (gapId: number) => {
        await claimGap(gapId);
    }

    const handleFill = async () => {
        if (claimedGap != null && input.trim()) {
            // reduce input length to 140 characters
            const shortInput = input.substring(0, 140);
            await fillGap(claimedGap, shortInput.trim());
        }
    };

    useEffect(() => {
        if (gameState.gaps != undefined && claimedGap != null) {
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
                        <div className="relative flex-1">
                            <input
                                id="gapFill"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full px-4 py-2 pr-16 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your word or phrase..."
                                autoFocus={true}
                                maxLength={140}
                            />
                            <span
                                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm 
                                ${input.length > 120 ? 'text-red-500' : 'text-gray-500'}`}>
                                {input.length}/140
                        </span>
                        </div>
                        <button
                            onClick={handleFill}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Fill
                            <Send className="inline-block w-6 h-6 ml-2"/>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}