'use client';

import {PenLine, Search, Trophy, Users} from 'lucide-react';
import './Navigation.css';

interface NavigationProps {
    currentView: 'none' | 'waiting' | 'fill' | 'guess' | 'ranking';
}

export function Navigation({currentView}: NavigationProps) {
    console.log('currentView:', currentView);
    // TODO disable buttons - will be controlled by the server
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="max-w-md mx-auto flex justify-around">
                <div
                    className={`flex flex-col items-center ${
                        currentView === 'waiting' ? 'text-indigo-600' : 'text-gray-500'
                    }`}>
                    <Users className={`h-6 w-6 ${currentView === 'waiting' ? 'animate-bounce' : ''}`}/>
                    <span className="text-sm">Waiting</span>
                </div>
                <div
                    className={`flex flex-col items-center ${
                        currentView === 'fill' ? 'text-indigo-600' : 'text-gray-500'
                    }`}
                >
                    <PenLine className={`h-6 w-6 ${currentView === 'fill' ? 'animate-bounce' : ''}`}/>
                    <span className="text-sm">Fill</span>
                </div>
                <div
                    className={`flex flex-col items-center ${
                        currentView === 'guess' ? 'text-indigo-600' : 'text-gray-500'
                    }`}
                >
                    <Search className={`h-6 w-6 ${currentView === 'guess' ? 'animate-bounce' : ''}`}/>
                    <span className="text-sm">Guess</span>
                </div>
                <div
                    className={`flex flex-col items-center ${
                        currentView === 'ranking' ? 'text-indigo-600' : 'text-gray-500'
                    }`}
                >
                    <Trophy className={`h-6 w-6 ${currentView === 'ranking' ? 'animate-bounce' : ''}`}/>
                    <span className="text-sm">Ranking</span>
                </div>
            </div>
        </nav>
    );
}