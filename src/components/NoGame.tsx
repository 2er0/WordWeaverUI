'use client';

import React from 'react';
import {AlertCircle} from 'lucide-react';

export function NoGame() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <div className="flex justify-center mb-4">
                    <AlertCircle className="w-12 h-12 text-amber-500"/>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">No Game Set</h1>
                <p className="text-gray-600 mb-6">
                    Please make sure you have the correct game URL or contact the game administrator.
                </p>
                <div className="text-sm text-gray-500">
                    Expected URL format: <code className="bg-gray-100 px-2 py-1 rounded">/:gameId</code>
                </div>
                <div className="mt-6">
                    <input
                        type="text"
                        placeholder="Enter game ID"
                        className="border rounded px-3 py-2 w-full"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                window.location.href = `/${(e.target as HTMLInputElement).value}`;
                            }
                        }}
                    />
                    <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => {
                            const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                            if (input) {
                                window.location.href = `/${input.value}`;
                            }
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}