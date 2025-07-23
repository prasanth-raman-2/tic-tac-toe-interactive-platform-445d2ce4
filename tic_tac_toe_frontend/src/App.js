import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import PlayerForm from './components/PlayerForm';
import GameHistory from './components/GameHistory';
import LoadingSpinner from './components/LoadingSpinner';
import api from './services/api';

function App() {
  const [players, setPlayers] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [games, setGames] = useState([]);
  const [gameMode, setGameMode] = useState('two-player'); // 'two-player' or 'single-player'
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPlayers();
    loadGames();
  }, []);

  const loadPlayers = async () => {
    setIsLoading(true);
    try {
      const fetchedPlayers = await api.getPlayers();
      setPlayers(fetchedPlayers);
    } catch (err) {
      setError('Failed to load players');
    } finally {
      setIsLoading(false);
    }
  };

  const loadGames = async () => {
    try {
      const fetchedGames = await api.getGames();
      setGames(fetchedGames);
    } catch (err) {
      setError('Failed to load games');
    }
  };

  const createPlayer = async (name) => {
    try {
      const newPlayer = await api.createPlayer(name);
      setPlayers([...players, newPlayer]);
    } catch (err) {
      setError('Failed to create player');
    }
  };

  const startNewGame = async () => {
    if (players.length < (gameMode === 'two-player' ? 2 : 1)) {
      setError('Not enough players');
      return;
    }

    try {
      const player1 = players[0];
      const player2 = gameMode === 'two-player' ? players[1] : null;
      const newGame = await api.createGame(player1.id, player2?.id);
      setCurrentGame(newGame);
      loadGames();
    } catch (err) {
      setError('Failed to start new game');
    }
  };

  const handleMove = async (row, col) => {
    if (!currentGame || currentGame.is_completed) return;

    try {
      const updatedGame = await api.makeMove(currentGame.id, row, col);
      setCurrentGame(updatedGame);
      if (updatedGame.is_completed) {
        loadGames();
      }
    } catch (err) {
      setError('Invalid move');
    }
  };

  const loadGame = async (gameId) => {
    try {
      const game = await api.getGame(gameId);
      setCurrentGame(game);
    } catch (err) {
      setError('Failed to load game');
    }
  };

  const getGameStatus = () => {
    if (!currentGame) return 'Start a new game';
    if (currentGame.is_completed) {
      if (currentGame.is_draw) return 'Game ended in a draw!';
      const winner = currentGame.winner_id === currentGame.player1.id
        ? currentGame.player1.name
        : currentGame.player2?.name || 'AI';
      return `Winner: ${winner}!`;
    }
    const currentPlayer = currentGame.current_player === currentGame.player1.id
      ? currentGame.player1.name
      : currentGame.player2?.name || 'AI';
    return `Current turn: ${currentPlayer}`;
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button 
            className="button" 
            onClick={() => setError(null)}
            style={{ marginTop: '10px', background: '#c62828' }}
          >
            Dismiss
          </button>
        </div>
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="game-container">
          <div className="game-board">
            <div className="game-mode-selector">
              <button
                className={`button ${gameMode === 'single-player' ? 'active' : ''}`}
                onClick={() => setGameMode('single-player')}
              >
                Single Player
              </button>
              <button
                className={`button ${gameMode === 'two-player' ? 'active' : ''}`}
                onClick={() => setGameMode('two-player')}
              >
                Two Players
              </button>
            </div>

            {currentGame && (
              <Board
                squares={currentGame.board}
                onClick={handleMove}
                disabled={currentGame.is_completed}
              />
            )}
            
            <div className="status">{getGameStatus()}</div>
            
            <button
              className="button"
              onClick={startNewGame}
              disabled={players.length < (gameMode === 'two-player' ? 2 : 1)}
            >
              New Game
            </button>
          </div>

          <div className="game-info">
            <h2>Players</h2>
            <PlayerForm
              onSubmit={createPlayer}
              label={players.length === 0 ? "Player 1" : "Player 2"}
            />
            
            <GameHistory
              games={games}
              onSelect={loadGame}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
