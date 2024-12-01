'use client';

import {User} from "@/lib/types.ts";
import {useGame} from "@/components/providers/GameProvider.tsx";

export function WaitingView() {
    const {gameState, currentUser} = useGame();
    const users = gameState.users.filter((user: User) => user.token !== currentUser?.token);
    console.log('gameState:', gameState);
    console.log('currentUser:', currentUser);
    console.log('users:', gameState.users);
    return (
        <div className="max-w-2xl mx-auto p-6 space-y-8">
            <h2 className="text-2xl font-bold text-center mb-8">You: {currentUser?.name}</h2>
            <h2 className="text-2xl font-bold text-center mb-8">Other users</h2>
            <div className="flex flex-wrap gap-4">
                {users.map((user) => (
                    <div key={user.token} className="bg-white p-4 rounded-lg shadow-md">
                        {user.name}
                    </div>
                ))}
            </div>
        </div>
    );
}