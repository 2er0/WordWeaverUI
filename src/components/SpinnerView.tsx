'use client';

import {useGame} from "@/components/providers/GameProvider.tsx";
import {useEffect, useState} from "react";
import './SpinnerView.css';

export function SpinnerView() {
    const {showSpinnerType, showSpinnerCountDown} = useGame();
    // for debugging
    // const showSpinnerType = 'ranking';
    // const showSpinnerCountDown = 10;

    const [countdown, setCountdown] = useState<number>(showSpinnerCountDown);

    useEffect(() => {
        setCountdown(showSpinnerCountDown);
        console.log('countdown:', countdown);
        const interval = setInterval(() => {
            console.log('countdown:', countdown);
            setCountdown(prevCountdown => {
                if (prevCountdown <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [showSpinnerType, showSpinnerCountDown]);


    // Overlay ui with spinner to indicate loading
    if (showSpinnerType === 'none') {
        return null;
    } else {
        let titleText = ''
        let additionalText = (<></>);
        if (showSpinnerType === 'getready') {
            titleText = 'Get Ready';
            additionalText = (
                <div className='mt-6'>
                    <h3 className="text-xl mb-6 font-bold text-center">The game is about to start! Here's how to
                        play:</h3>
                    <ul className="pulsing-list">
                        <li className="m-1">Select <strong>ONE</strong> gap and fill it with a word or phrase.</li>
                        <li className="m-1">The story will be filled by all players in the game.</li>
                        <li className="m-1">You will then be asked to guess who filled in each gap.</li>
                    </ul>
                </div>
            );
        } else if (showSpinnerType === 'guess') {
            titleText = 'Guess the Gap filler ...';
            additionalText = (
                <ul className="pulsing-list">
                    <li className="m-1">Read the story and guess who filled in each gap.</li>
                    <li className="m-1">Points are awarded for each correct guess.</li>
                </ul>
            );
        } else if (showSpinnerType === 'waiting_for_scores') {
            titleText = 'Waiting for other ...';
            additionalText = (
                <ul className="pulsing-list">
                    <li className="m-1">...</li>
                    <li className="m-1">......</li>
                    <li className="m-1">Puhhh ......</li>
                    <li className="m-1">Waiting for other to finish their guesses ...</li>
                </ul>
            );
        } else if (showSpinnerType === 'ranking') {
            titleText = 'Scores incoming ...';
            additionalText = (
                <ul className="pulsing-list">
                    <li className="m-1">The game is over.</li>
                    <li className="m-1">All guesses are collected.</li>
                    <li className="m-1">The final scores are being calculated.</li>
                    <li className="m-1">Here are the final scores ...</li>
                </ul>
            );
        }
        return (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center w-full h-full">
                <div className="bg-white p-8 rounded-lg w-full h-full ml-6 mt-6 mr-6">
                    <h2 className="text-2xl font-bold text-center">{titleText}</h2>
                    <p className="h-36 flex items-center justify-center">
                        <div className="loader text-center">
                            <p className="flex items-center justify-center h-36" id="countdown"><strong>{countdown > 0 ? countdown : ''}</strong></p>
                        </div>
                    </p>
                    <div className="text-center mt-4">{additionalText}</div>
                </div>
            </div>
        );
    }
}