import '../styles/Buttons.css';
import Button from './Button';

function ButtonsOptionsNumberOfCards({ options, selectNumberOfCards }) {
  const listOfOptions = options.map((option) => (
    <Button
      option={option}
      selectNumberOfCards={selectNumberOfCards}
      key={option}
    />
  ));

  return <div className="buttons">{listOfOptions}</div>;
}

export default ButtonsOptionsNumberOfCards;
