import '../styles/Playboard.css';

function Card({ title, image }) {
  return (
    <div className="card">
      <p>{title}</p>
      <img src={image.url} />
    </div>
  );
}

export default Card;
