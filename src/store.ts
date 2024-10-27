import { create } from 'zustand';
import { Gap, User, Guess } from './types';

interface GameState {
  currentUser: User | null;
  users: User[];
  gaps: Gap[];
  guesses: Guess[];
  view: 'fill' | 'guess' | 'ranking';
  setCurrentUser: (user: User) => void;
  fillGap: (gapId: string, value: string) => void;
  makeGuess: (gapId: string, guessedUserId: string) => void;
  setView: (view: 'fill' | 'guess' | 'ranking') => void;
  addUser: (name: string, seatNumber: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentUser: null,
  users: [],
  gaps: [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ],
  guesses: [],
  view: 'fill',
  addUser: (name, seatNumber) => set((state) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      seatNumber,
      score: 0
    };
    return {
      users: [...state.users, newUser],
      currentUser: newUser
    };
  }),
  setCurrentUser: (user) => set({ currentUser: user }),
  fillGap: (gapId, value) => set((state) => ({
    gaps: state.gaps.map((gap) =>
      gap.id === gapId ? { ...gap, value, filledBy: state.currentUser?.id } : gap
    ),
  })),
  makeGuess: (gapId, guessedUserId) => set((state) => {
    const gap = state.gaps.find((g) => g.id === gapId);
    const correct = gap?.filledBy === guessedUserId;
    
    const newGuess: Guess = {
      userId: state.currentUser?.id || '',
      gapId,
      guessedUserId,
      correct,
    };

    const updatedUsers = state.users.map((user) => {
      if (user.id === state.currentUser?.id && correct) {
        return { ...user, score: user.score + 10 };
      }
      return user;
    });

    return {
      guesses: [...state.guesses, newGuess],
      users: updatedUsers,
    };
  }),
  setView: (view) => set({ view }),
}));