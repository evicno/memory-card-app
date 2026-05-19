import '../styles/Buttons.css';

function Button({ option, selectNumberOfCards }) {
  return (
    <button
      name={option}
      value={option}
      onClick={() => selectNumberOfCards(option)}
    >
      {option}
    </button>
  );
}

export default Button;
