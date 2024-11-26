'use client';

import {useGame} from './providers/GameProvider';
import {UserSelect} from './UserSelect';
import {Navigation} from './Navigation';
import {WaitingView} from './WaitingView';
import {FillView} from './FillView';
import {GuessView} from './GuessView';
import {RankingView} from './RankingView';
import {GetReadyView} from "@/components/GetReadyView.tsx";

export function Game() {
    const {view, setView, showGetReady} = useGame();

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {showGetReady &&  <GetReadyView/>}
            {view === 'none' && <UserSelect onViewChange={setView}/>}
            {view === 'waiting' && <WaitingView/>}
            {view === 'fill' && <FillView/>}
            {view === 'guess' && <GuessView/>}
            {view === 'ranking' && <RankingView/>}

            <Navigation currentView={view} onViewChange={setView}/>
        </div>
    );
}