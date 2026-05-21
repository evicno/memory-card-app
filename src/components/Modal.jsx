import '../styles/Modal.css';

function Modal({ score, bestScore, gameOver, resetGame }) {
  return (
    <div className="modal">
      <div className="result">
        <h1>
          {gameOver === 'win'
            ? 'You win!'
            : gameOver === 'lose'
              ? 'Game over'
              : null}{' '}
        </h1>
        <h2>Score: {score}</h2>
        <h2>Best Score: {bestScore}</h2>
      </div>
      <button onClick={resetGame}>Close</button>
    </div>
  );
}

export default Modal;
