import '../styles/App.css';
import homeIcon from '../assets/home.png';

function Header({ gameStarted, resetGame }) {
  return (
    <div className="header">
      {gameStarted ? (
        <div className="header-img">
          <img src={homeIcon} alt="home" onClick={resetGame} />
        </div>
      ) : null}
      <h1>MEMORY CARD</h1>
      {gameStarted ? <p>Don't click on the same card twice!</p> : null}
    </div>
  );
}

export default Header;
