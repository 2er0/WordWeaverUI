'use client';

import {useGame} from './providers/GameProvider';
import {UserSelect} from './UserSelect';
import {Navigation} from './Navigation';
import {WaitingView} from './WaitingView';
import {FillView} from './FillView';
import {GuessView} from './GuessView';
import {RankingView} from './RankingView';
import {SpinnerView} from "./SpinnerView";

export function Game() {
    const {view, setView} = useGame();

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {view === 'none' && <UserSelect onViewChange={setView}/>}
            {view === 'waiting' && <WaitingView/>}
            {view === 'fill' && <FillView/>}
            {view === 'guess' && <GuessView/>}
            {view === 'ranking' && <RankingView/>}

            <SpinnerView/>

            <Navigation currentView={view}/>
        </div>
    );
}