import '../styles/Scoreboard.css';

function Scoreboard({ score, bestScore }) {
  return (
    <div className="scoreboard">
      <h1>Score: {score}</h1>
      <h1>Best score: {bestScore}</h1>
    </div>
  );
}

export default Scoreboard;
