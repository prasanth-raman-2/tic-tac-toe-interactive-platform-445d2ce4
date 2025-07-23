import axios from 'axios';
import { handleApiError } from '../utils/errorHandler';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = {
  // Player endpoints
  async createPlayer(name) {
    try {
      const response = await axios.post(`${API_BASE_URL}/players/`, { name });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async getPlayers() {
    const response = await axios.get(`${API_BASE_URL}/players/`);
    return response.data;
  },

  // Game endpoints
  async createGame(player1Id, player2Id = null) {
    const response = await axios.post(`${API_BASE_URL}/games/`, {
      player1_id: player1Id,
      player2_id: player2Id
    });
    return response.data;
  },

  async getGames() {
    const response = await axios.get(`${API_BASE_URL}/games/`);
    return response.data;
  },

  async getGame(gameId) {
    const response = await axios.get(`${API_BASE_URL}/games/${gameId}`);
    return response.data;
  },

  async makeMove(gameId, row, col) {
    const response = await axios.post(`${API_BASE_URL}/games/${gameId}/move`, {
      row,
      col
    });
    return response.data;
  }
};

export default api;
