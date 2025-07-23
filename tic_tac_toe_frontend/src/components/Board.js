import React from 'react';

const Board = ({ squares, onClick, disabled }) => {
  return (
    <div className="board">
      {squares.map((row, rowIndex) => (
        row.map((square, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            className="square"
            onClick={() => onClick(rowIndex, colIndex)}
            disabled={disabled || square !== null}
          >
            {square}
          </button>
        ))
      ))}
    </div>
  );
};

export default Board;
