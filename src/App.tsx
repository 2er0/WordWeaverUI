'use client';

import {useGameId} from './hooks/useGameId';
import {GameProvider} from './components/providers/GameProvider';
import {Game} from './components/Game';
import {NoGame} from './components/NoGame';
import {useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router";

function App() {
    const [updatedGameId, setUpdatedGameId] = useState<string | null>(null);
    const gameId = useGameId({updatedGameId});

    if (!gameId) {
        return <NoGame updateGameId={setUpdatedGameId} />;
    }

    return (
        <GameProvider initialGameId={gameId}>
            <Game/>
        </GameProvider>
    );
}


function RouterApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterApp;