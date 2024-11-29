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

export interface GuessScoreDTO {
    name: string;
    token: string;
    score: number;
}

export interface UserDTO {
    name: string;
    token: string;
}

export interface PreGapTextDTO {
    id: number;
    text: string;
    gap_after: boolean;
}

export interface RejoinPreGapTextDTO {
    id: number;
    text: string;
    gap_after: boolean;
    claimed: boolean;
    filled: boolean;
    gap_value?: string;
    filled_by_current_user: boolean;
}

export interface JoinResponse extends BaseResponse {
    pre_gaps_text: PreGapTextDTO[];
}

export interface CurrentGapTextDTO {
    id: number;
    text: string;
    gap_after: boolean;
    claimed: boolean;
}

export interface RejoinResponseDTO {
    users: UserDTO[];
    view: 'waiting' | 'fill' | 'guess' | 'ranking';
    current_gap_text: CurrentGapTextDTO[]
}

// WebSocket Types
export interface WebSocketAuthMessage {
    obj: 'auth';
    token: string;
}

export interface WebSocketUserJoinedMessage {
    obj: 'user_joined';
    value: {
        token: string;
        name: string;
    }
}

export interface WebSocketChangeViewMessage {
    obj: 'change_view';
    value: 'waiting' | 'fill' | 'guess' | 'ranking';
}

export interface WebSocketGapClaimedMessage {
    obj: 'gap_claimed';
    value: number;
}

export interface WebSocketGapFilledMessage {
    obj: 'gap_filled';
    value: number;
}

export interface WebSocketStartGuessingMessage {
    obj: 'start_guessing';
    value: number;
}

export interface WebSocketGuessedMessage {
    obj: 'guess_scores';
    value: GuessScoreDTO[]
}

export type WebSocketMessage =
    | WebSocketAuthMessage
    | WebSocketUserJoinedMessage
    | WebSocketChangeViewMessage
    | WebSocketGapClaimedMessage
    | WebSocketGapFilledMessage
    | WebSocketStartGuessingMessage
    | WebSocketGuessedMessage;

// Application Types
export interface User {
    id: string;
    name: string;
    token: string;
}

export interface Gap {
    id: number;
    text?: string;
    claimed?: boolean;
    filledLocally?: boolean;
    filled?: boolean;
    value?: string;
}

export interface Guess {
    userId: string;
    gapId: number;
    guessedUserId: string;
}

export interface GameState {
    users: User[];
    gaps: Gap[];
    guesses: Guess[];
    textSections: string[];
}