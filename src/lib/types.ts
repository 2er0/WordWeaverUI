// API Types
export interface BaseResponse {
  success: boolean;
  message?: string;
}

export interface BaseStringDTO {
  name: string;
}

export interface GameDTO {
  name: string;
  text_section: string[];
}

export interface GapClaimDTO {
  gap_id: number;
  token: string;
}

export interface GapFillDTO {
  gap_id: number;
  token: string;
  content: string;
}

export interface GuessDTO {
  gap_id: number;
  token: string;
}

export interface GuessesDTO {
  gap_id: number;
  token: string;
  guesses: GuessDTO[];
}

export interface UserDTO {
  username: string;
  token: string;
}

export interface PreGapTextDTO {
  id: number;
  text: string;
  gap_after: boolean;
}

export interface JoinResponse extends BaseResponse {
  pre_gaps_text: PreGapTextDTO[];
}

// Application Types
export interface User {
  id: string;
  name: string;
  token: string;
  score: number;
}

export interface Gap {
  id: number;
  text?: string;
  claimedBy?: string;
  filledBy?: string;
  value?: string;
}

export interface Guess {
  userId: string;
  gapId: number;
  guessedUserId: string;
  correct: boolean;
}

export interface GameState {
  users: User[];
  gaps: Gap[];
  guesses: Guess[];
  textSections: string[];
}