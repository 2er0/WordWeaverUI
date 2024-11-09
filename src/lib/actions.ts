'use server'

import { cookies } from 'next/headers';
import { GameState, User, Gap, Guess } from './types';

// In a real app, this would be a database
let gameState: GameState = {
  users: [],
  gaps: [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ],
  guesses: [],
};

export async function getGameState(): Promise<GameState> {
  return gameState;
}

export async function getCurrentUser(): Promise<User | null> {
  const userId = cookies().get('userId')?.value;
  return gameState.users.find(u => u.id === userId) ?? null;
}

export async function addUser(name: string, seatNumber: number): Promise<User> {
  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    seatNumber,
    score: 0,
  };

  gameState.users.push(newUser);
  cookies().set('userId', newUser.id);
  return newUser;
}

export async function fillGap(gapId: string, value: string, userId: string): Promise<void> {
  gameState.gaps = gameState.gaps.map(gap =>
    gap.id === gapId ? { ...gap, value, filledBy: userId } : gap
  );
}

export async function makeGuess(gapId: string, guessedUserId: string, userId: string): Promise<void> {
  const gap = gameState.gaps.find(g => g.id === gapId);
  const correct = gap?.filledBy === guessedUserId;

  const newGuess: Guess = {
    userId,
    gapId,
    guessedUserId,
    correct,
  };

  if (correct) {
    gameState.users = gameState.users.map(user =>
      user.id === userId ? { ...user, score: user.score + 10 } : user
    );
  }

  gameState.guesses.push(newGuess);
}