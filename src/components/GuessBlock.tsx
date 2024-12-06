'use client';

import {useState} from 'react';
import {Gap, User} from "@/lib/types.ts";
import {BadgeInfo, MousePointerSquare} from "lucide-react";

interface GuessBlockProps {
    gap: Gap;
    users: User[];
    onGuess: (gapId: number, userId: string) => void;
}

export function GuessBlock({gap, users, onGuess}: GuessBlockProps) {
    const [guess, setGuess] = useState('');
    const [name, setName] = useState('');
    const [showOptions, setShowOptions] = useState(false);

    const handleGuessSelect = (gapId: number, userId: string, name: string) => {
        setGuess(userId);
        setName(name);
        onGuess(gapId, userId);
    };

    return (
        <span>
            <span key={gap.id} className="bg-gray-200 rounded ml-1 mr-1 p-1" onClick={() => setShowOptions(true)}>
                <span>
                    {gap.value}{guess ? (<span className="text-blue-500 ml-1">
                        {' '}{name}
                        <BadgeInfo className="h-4 w-4 ml-1 inline-block align-text-top"/>
                    </span>
                ) : (<span className={'text-red-400 ml-1'}><MousePointerSquare className="h-4 w-4 ml-1 inline-block align-text-top" /></span>
                )}
                </span>
            </span>
            {showOptions && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                     onClick={(e) => {
                         if (e.target === e.currentTarget) {
                             setShowOptions(false);
                         }
                     }}>
                    <div className="max-h-screen w-3/6 bg-white p-5 rounded">
                        <p className="mb-4 text-sm text-gray-600">
                            <button className="bg-gray-200 p-2 rounded"
                                    onClick={() => {
                                        setShowOptions(false)
                                    }
                                    }>Back
                            </button>
                            {' '}
                            Who wrote this part?
                        </p>
                        <div className="flex gap-2">
                            {users
                                .map((user) => (
                                    <button
                                        key={user.id}
                                        onClick={() => handleGuessSelect(gap.id, user.id, user.name)}
                                        className={`flex items-center justify-center p-3 pr-4 pl-4 mb-1 text-sm rounded-lg transition-colors ${
                                            guess === user.id
                                                ? 'bg-indigo-200 text-indigo-700'
                                                : 'bg-indigo-50 hover:bg-indigo-100'
                                        }`}
                                    >
                                        <span className="font-medium">{user.name}</span>
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </span>
    );
}