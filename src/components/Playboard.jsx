import '../styles/Gameboard.css';
import Card from './Card';

function Playboard({ clickCard, randomData }) {
  const listOfData = randomData.map((data) => (
    <Card
      title={data.title}
      image={data.image}
      key={data.id}
      id={data.id}
      clickCard={clickCard}
    />
  ));

  return <div className="playboard">{listOfData}</div>;
}

export default Playboard;
