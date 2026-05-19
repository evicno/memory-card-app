import '../styles/Playboard.css';
import Card from './Card';

function Playboard({ randomData }) {
  const listOfData = randomData.map((data) => (
    <Card title={data.title} image={data.image} key={data.id} />
  ));

  return <div className="playboard">{listOfData}</div>;
}

export default Playboard;
