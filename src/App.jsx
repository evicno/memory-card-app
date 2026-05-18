import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import './styles/App.css';

import Scoreboard from './components/Scoreboard';
import Playboard from './components/Playboard';

function App() {
  const [numberOfCards, setNumberOfCards] = useState(4);
  const [fullData, setFullData] = useState(null);

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

  const randomData = useMemo(() => {
    if (!fullData || fullData <= 1) return null;

    let randomIndex = new Set();
    let randomArray = [];
    while (randomIndex.size < numberOfCards) {
      let newIndex = Math.floor(Math.random() * fullData.length);
      randomIndex.add(newIndex);
    }
    for (let index of randomIndex) {
      let newEntry = {
        title: fullData[index].primaryTitle,
        image: fullData[index].primaryImage,
      };
      randomArray.push(newEntry);
    }
    return randomArray;
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
      <Playboard numberOfCards={numberOfCards} />
    </div>
  );
}

export default App;
