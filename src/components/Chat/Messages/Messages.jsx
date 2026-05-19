import { useEffect } from 'react';
import './Messages.css';
import PropTypes from 'prop-types';

export default function Messages({ messages }) {
  useEffect(() => {
    document.querySelector('.messages-container').scroll(0, 99999);
  }, [ messages ]);

  const Message = ({ userId, content }) => {
    return (
      <div className={userId === localStorage.id ? 'message user' : 'message'}>
        {content}
      </div>
    );
  };

  return (
    <div className="messages">
      <h3 className="messages-header">Anonymous chat</h3>
      <div className="messages-container">
        {messages.map(message => (
          <Message
            key={message.id}
            userId={message.userId}
            content={message.content}
          />
        ))}
      </div>
    </div>
  );
};

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
};
