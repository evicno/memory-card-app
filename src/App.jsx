import { useState } from 'react';
import { useEffect } from 'react';
import './styles/App.css';

import Scoreboard from './components/Scoreboard';
import Playboard from './components/Playboard';

function App() {
  const [numberOfCards, setNumberOfCards] = useState(4);
  const [fullData, setFullData] = useState(null);
  const [randomData, setRandomData] = useState(null);

  const url =
    'https://api.imdbapi.dev/titles?types=TV_SERIES&types=TV_MINI_SERIES&minVoteCount=100000&minAggregateRating=8.0';

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
  }, [fullData, numberOfCards]);

  return (
    <div className="main">
      {!fullData ? (
        <h2>Chargement en cours...</h2>
      ) : (
        <h2>Nombre d'élements : {fullData.length}</h2>
      )}
      {!randomData ? (
        <h2>Chargement en cours...</h2>
      ) : (
        <h2>Nombre d'élements : {randomData.length}</h2>
      )}
      <Scoreboard numberOfCards={numberOfCards} />
      {randomData && <Playboard randomData={randomData} />}
    </div>
  );
}

export default App;
