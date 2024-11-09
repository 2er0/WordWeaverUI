export interface User {
  id: string;
  name: string;
  seatNumber: number;
  score: number;
}

export interface Gap {
  id: string;
  value?: string;
  filledBy?: string;
}

export interface Guess {
  userId: string;
  gapId: string;
  guessedUserId: string;
  correct: boolean;
}

export interface GameState {
  users: User[];
  gaps: Gap[];
  guesses: Guess[];
  currentView: 'fill' | 'guess' | 'ranking';
}

export type GameEvent = 
  | { type: 'state_update'; payload: GameState }
  | { type: 'view_change'; payload: { view: 'fill' | 'guess' | 'ranking' } }
  | { type: 'gap_filled'; payload: { gapId: string; value: string; filledBy: string } }
  | { type: 'guess_made'; payload: { userId: string; gapId: string; correct: boolean } };