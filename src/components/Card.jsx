import '../styles/Playboard.css';

function Card({ title, image, clickCard, id }) {
  return (
    <div className="card">
      <p>{title}</p>
      <img src={image.url} onClick={() => clickCard(id)} />
    </div>
  );
}

export default Card;
