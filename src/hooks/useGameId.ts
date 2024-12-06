'use client';

import {useEffect, useState} from 'react';
import {api} from "@/lib/api.ts";
import {useSearchParams} from "react-router";

interface UseGameIdProps {
    updatedGameId: string | null;
}

export function useGameId({updatedGameId}: UseGameIdProps): string | null {
    const [gameId, setGameId] = useState<string | null>(null);
    const [params, setParams] = useSearchParams();

    useEffect(() => {
        // Get game ID from URL path
        const id = params.get('gameId');
        if (!id) {
            return;
        }

        api.helloGame(id).then(data => {
            if (data.success && id) {
                setGameId(id);
            }
        }).catch(err => {
            console.error(err);
        });
    }, []);

    useEffect(() => {
        if (updatedGameId) {
            api.helloGame(updatedGameId).then(data => {
                if (data.success) {
                    setGameId(updatedGameId);
                    // Update URL path
                    setParams({gameId: updatedGameId});
                }
            }).catch(err => {
                console.error(err);
            });
        }
    }, [updatedGameId]);

    return gameId;
}