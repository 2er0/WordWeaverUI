'use client';

import {useState} from "react";
import {PenLine, Microscope, Trophy, Users, Info} from 'lucide-react';
import './Navigation.css';
import dart from '../assets/dart-18.svg'

interface NavigationProps {
    currentView: 'none' | 'waiting' | 'fill' | 'guess' | 'ranking';
}

export function Navigation({currentView}: NavigationProps) {
    const [showInfo, setShowInfo] = useState(false);
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
                    <Microscope className={`h-6 w-6 ${currentView === 'guess' ? 'animate-bounce' : ''}`}/>
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
                <div className={`flex flex-col items-center text-gray-500 cursor-pointer`}
                     onClick={() => setShowInfo(true)}>
                    <Info className={`h-6 w-6`}/>
                    <span className="text-sm">Help / About</span>
                </div>
                {showInfo && <div>
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 z-50"/>
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
                        <div className="bg-white p-4 max-w-lg max-h-screen scroll-auto overflow-scroll rounded">
                            <img src={dart} alt="DART Logo" className="float-left mt-4 mr-4 mb-4 h-24"/>
                            <h2 className="text-xl font-bold m-5">About | Blank against DARTies</h2>
                            <p className="text-gray-700 mt-2">
                                Welcome to this word guessing game where you have to figure out who filled what blank.
                            </p>
                            <p className={`text-gray-700 mt-4`}>
                                <strong>Steps:</strong>
                                <ol>
                                    <li><strong>Fill:</strong> Select a blank and fill it with a word or a phrase</li>
                                    <li><strong>Guess:</strong> Guess what friend filled what blank</li>
                                    <li><strong>Ranking:</strong> See who knows everyone the best</li>
                                </ol>
                            </p>
                            <p className={`text-gray-700 mt-4`}>
                                This is simple as long as you know how to write and read. Enjoy the game!
                                Let's see who knows everyone the best.
                                Enjoy the game! 🎉
                            </p>
                            <p className={`text-gray-700 mt-4`}>
                                <strong>Developed by:</strong> <a href="https://github.com/2er0">
                                    2er0
                                </a>
                            </p>
                            <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
                                    onClick={() => setShowInfo(false)}>Close
                            </button>
                        </div>
                    </div>
                </div>}
            </div>
        </nav>
    );
}