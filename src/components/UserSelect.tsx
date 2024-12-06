'use client';

import React, {useState} from 'react';
import {UserPlus} from 'lucide-react';
import {useGame} from './providers/GameProvider';

interface NavigationProps {
    onViewChange: (view: 'none' | 'waiting' | 'fill' | 'guess' | 'ranking') => void;
}

export function UserSelect({onViewChange}: NavigationProps) {
    const {joinGame} = useGame();
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError('Please enter your name');
            return;
        }

        try {
            await joinGame(name.trim());
            onViewChange('waiting');
        } catch (err) {
            console.log(err);
            setError('Failed to join the game.');
        }
    };

    return (
        <div
            className="fixed inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
                <div className="flex justify-center mb-8">
                    <div className="bg-indigo-100 p-4 rounded-full">
                        <UserPlus className="w-12 h-12 text-indigo-600"/>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-center">Join Blank against DART</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Join Game
                    </button>
                </form>
            </div>
        </div>
    );
}