'use client';

import {useEffect, useState} from 'react';
import {api} from "@/lib/api.ts";

export function useGameId(): string | null {
    const [gameId, setGameId] = useState<string | null>(null);

    useEffect(() => {
        // Get game ID from URL path
        const pathSegments = window.location.pathname.split('/');
        const id = pathSegments[1]; // Assuming URL structure is /:gameId/*

        api.helloGame(id).then( data=> {
            console.log(data)
            if (data.success && id) {
                setGameId(id);
            }
        });
    }, []);

    return gameId;
}