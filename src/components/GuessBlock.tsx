'use client';

import {useState} from 'react';
import {Gap, User} from "@/lib/types.ts";
import {CheckCircle2} from "lucide-react";

interface GuessBlockProps {
    currentUser: User | null;
    gap: Gap;
    users: User[];
    onGuess: (gapId: number, userId: string) => void;
}

export function GuessBlock({currentUser, gap, users, onGuess}: GuessBlockProps) {
    const [guess, setGuess] = useState('');

    const handleGuessSelect = (gapId: number, userId: string) => {
        console.log('handleGuessSelect', gapId, userId);
        setGuess(userId);
        onGuess(gapId, userId);
    };

    return (
        <div key={gap.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="prose lg:prose-xl mb-4">
                <p className="text-gray-600">
                    {gap.text}{' '}
                    <span className="bg-indigo-50 px-3 py-1 rounded font-medium">
                    {gap.value}
                  </span>
                </p>
            </div>

            {gap.filledLocally ? (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50">
                    <CheckCircle2 className="w-5 h-5 text-green-600"/>
                    <span className="text-green-700">You wrote this part</span>
                </div>
            ) : (
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">Who wrote this part?</p>
                    <div className="grid gap-2">
                        {users
                            .filter((u) => u.id !== currentUser?.id)
                            .map((user) => (
                                <button
                                    key={user.id}
                                    onClick={() => handleGuessSelect(gap.id, user.id)}
                                    className={`flex items-center justify-center p-3 text-sm rounded-lg transition-colors ${
                                        guess === user.id
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'bg-indigo-50 hover:bg-indigo-100'
                                    }`}
                                >
                                    <span className="font-medium">{user.name}</span>
                                </button>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}