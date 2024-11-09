import axios from 'axios';
import { GameDTO, UserDTO, GapClaimDTO, GapFillDTO, GuessesDTO } from './types';

const API_BASE = '/api';

export const api = {
  // Admin endpoints
  getActiveGames: () => 
    axios.get(`${API_BASE}/admin/active`).then(res => res.data),
  
  getAvailableGames: () =>
    axios.get(`${API_BASE}/admin/available`).then(res => res.data),
  
  createNewGame: (game: GameDTO, force?: boolean) =>
    axios.post(`${API_BASE}/admin/new${force ? '?force=true' : ''}`, game).then(res => res.data),
  
  startGame: (name: string) =>
    axios.post(`${API_BASE}/admin/start`, { name }).then(res => res.data),
  
  closeGame: (name: string) =>
    axios.post(`${API_BASE}/admin/close`, { name }).then(res => res.data),

  // Game endpoints
  joinGame: (gameId: string, username: string, token: string) =>
    axios.post(`${API_BASE}/${gameId}/join`, { username, token }).then(res => res.data),
  
  claimGap: (gameId: string, gapId: number, token: string) =>
    axios.post(`${API_BASE}/${gameId}/claim`, { gap_id: gapId, token }).then(res => res.data),
  
  fillGap: (gameId: string, gapId: number, content: string, token: string) =>
    axios.post(`${API_BASE}/${gameId}/fill`, { gap_id: gapId, content, token }).then(res => res.data),
  
  submitGuesses: (gameId: string, gapId: number, token: string, guesses: { gap_id: number, token: string }[]) =>
    axios.post(`${API_BASE}/${gameId}/guess`, { gap_id: gapId, token, guesses }).then(res => res.data),
};