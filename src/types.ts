export interface Gap {
  id: string;
  filledBy?: string;
  value?: string;
}

export interface User {
  id: string;
  name: string;
  score: number;
  seatNumber: number;
}

export interface Guess {
  userId: string;
  gapId: string;
  guessedUserId: string;
  correct: boolean;
}