import { useState } from 'react';
import { useEffect } from 'react';
import './styles/App.css';

import Header from './components/Header';
import Scoreboard from './components/Scoreboard';
import Playboard from './components/Playboard';
import ButtonsOptionsNumberOfCards from './components/ButtonsOptionsOfCards';
import Modal from './components/Modal';

function App() {
  const [numberOfCards, setNumberOfCards] = useState(4);
  const [fullData, setFullData] = useState(null);
  const [randomData, setRandomData] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [cardsPlayed, setCardsPlayed] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(null);

  const url =
    'https://api.imdbapi.dev/titles?types=TV_SERIES&types=TV_MINI_SERIES&minVoteCount=100000&minAggregateRating=8.0';
  const optionsNumberOfCards = [4, 8, 12];

  function selectNumberOfCards(number) {
    setNumberOfCards(number);
    setGameStarted(true);
  }

  // Shuffle function using the Fisher-Yates algorithm
  function shuffleCards(data) {
    const shuffled = [...data];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setRandomData(shuffled);
  }

  function clickCard(id) {
    if (cardsPlayed.length === 0 || !cardsPlayed.includes(id)) {
      shuffleCards(randomData);
      const newCardsPlayed = [...cardsPlayed, id];
      setCardsPlayed(newCardsPlayed);
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) setBestScore(bestScore + 1);
      if (newCardsPlayed.length == numberOfCards) {
        setGameOver('win');
      }
    } else {
      setGameOver('lose');
    }
  }

  function resetGame() {
    setCardsPlayed([]);
    setScore(0);
    setGameStarted(false);
    setGameOver(null);
  }

  useEffect(() => {
    let ignore = false;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!ignore) {
          setFullData(data.titles);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (fullData && fullData.length > 1) {
      let randomIndex = new Set();
      let randomArray = [];
      while (randomIndex.size < numberOfCards) {
        let newIndex = Math.floor(Math.random() * fullData.length);
        randomIndex.add(newIndex);
      }
      for (let index of randomIndex) {
        let newEntry = {
          id: fullData[index].id,
          title: fullData[index].primaryTitle,
          image: fullData[index].primaryImage,
        };
        randomArray.push(newEntry);
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRandomData(randomArray);
    }
  }, [fullData, numberOfCards, gameStarted]);

  return (
    <>
      {!gameStarted ? (
        <div className="home">
          <Header gameStarted={gameStarted} resetGame={resetGame} />

          <div className="select">
            <h2>Choose a number of cards</h2>
            <ButtonsOptionsNumberOfCards
              options={optionsNumberOfCards}
              selectNumberOfCards={selectNumberOfCards}
            />
          </div>
        </div>
      ) : (
        randomData && (
          <div className="main">
            <Header gameStarted={gameStarted} resetGame={resetGame} />
            <Scoreboard
              numberOfCards={numberOfCards}
              score={score}
              bestScore={bestScore}
            />
            <Playboard randomData={randomData} clickCard={clickCard} />
          </div>
        )
      )}
      {gameOver && (
        <>
          <div className="backdrop" />
          <Modal
            score={score}
            bestScore={bestScore}
            gameOver={gameOver}
            resetGame={resetGame}
          />
        </>
      )}
    </>
  );
}

export default App;
