import '../styles/Playboard.css';

function Card({ title, image, shuffleCards, randomData }) {
  return (
    <div className="card">
      <p>{title}</p>
      <img src={image.url} onClick={() => shuffleCards(randomData)} />
    </div>
  );
}

export default Card;
