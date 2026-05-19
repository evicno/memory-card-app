import { useState } from 'react';
import { useEffect } from 'react';
import './styles/App.css';

import Scoreboard from './components/Scoreboard';
import Playboard from './components/Playboard';
import ButtonsOptionsNumberOfCards from './components/ButtonsOptionsOfCards';

function App() {
  const [numberOfCards, setNumberOfCards] = useState(4);
  const [fullData, setFullData] = useState(null);
  const [randomData, setRandomData] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const url =
    'https://api.imdbapi.dev/titles?types=TV_SERIES&types=TV_MINI_SERIES&minVoteCount=100000&minAggregateRating=8.0';
  const optionsNumberOfCards = [4, 8, 12];

  function selectNumberOfCards(number) {
    setNumberOfCards(number);
    setGameStarted(true);
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
    <div className="main">
      <Scoreboard numberOfCards={numberOfCards} />
      {!gameStarted ? (
        <ButtonsOptionsNumberOfCards
          options={optionsNumberOfCards}
          selectNumberOfCards={selectNumberOfCards}
        />
      ) : (
        randomData && <Playboard randomData={randomData} />
      )}
    </div>
  );
}

export default App;
