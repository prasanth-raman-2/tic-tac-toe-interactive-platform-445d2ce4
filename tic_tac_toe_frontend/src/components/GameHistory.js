import React from 'react';

const GameHistory = ({ games, onSelect }) => {
  return (
    <div className="history">
      <h3>Game History</h3>
      {games.map((game) => (
        <div
          key={game.id}
          className="history-item"
          onClick={() => onSelect(game.id)}
        >
          <p>
            {game.player1.name} vs {game.player2 ? game.player2.name : 'AI'}
            {game.is_completed && (
              <span className="winner">
                {game.is_draw
                  ? " - Draw"
                  : ` - Winner: ${
                      game.winner_id === game.player1.id
                        ? game.player1.name
                        : game.player2
                        ? game.player2.name
                        : 'AI'
                    }`}
              </span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default GameHistory;
