import './InputMessage.css';
import PropTypes from 'prop-types';

export default function InputMessage({ input, setInput, lastId, setLastId }) {
  const inputHandler = ({ target }) => {
    const { value } = target;
    setInput(value);
  };

  const clickHandler = () => {
    fetch('http://localhost:7075/messages', {
      method: 'POST',
      body: JSON.stringify({
        id: lastId + 1,
        userId: localStorage.id,
        content: input,
      }),
    });

    setLastId(prev => prev + 1);
    setInput('');
  };
  return (
    <div className="input-message">
      <input
        type="text"
        className="input-message-input"
        onChange={inputHandler}
        value={input}
      />
      <button
        type="button"
        className="input-message-send"
        onClick={clickHandler}
      >
				&#11166;
      </button>
    </div>
  );
}

InputMessage.propTypes = {
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
  lastId: PropTypes.number.isRequired,
  setLastId: PropTypes.func.isRequired,
};
