import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InputMessage from './InputMessage/InputMessage';
import Messages from './Messages/Messages';

export default function Chat() {
  const [ input, setInput ] = useState('');
  const [ lastIdMessage, setLastIdMessage ] = useState(0);
  const [ messages, setMessages ] = useState([]);
  const hostURL = 'http://localhost:7075';

  useEffect(() => {

    (() => {
      let userId = localStorage.getItem('userId');
      if (!userId) {
        userId = uuidv4();
        localStorage.setItem('userId', userId);
      }})();

    fetch(hostURL + `/messages?from=${lastIdMessage}`)
      .then(r => r.json())
      .then(r => {
        setMessages([ ...r ]);
        setLastIdMessage(r[r.length - 1].id);
      });

    setInterval(() => {
      fetch(hostURL + `/messages?from=${lastIdMessage}`)
        .then(r => r.json())
        .then(r => {
          setMessages([ ...r ]);
          setLastIdMessage(r[r.length - 1].id);
        });
    }, 3000);
  }, []);

  return (
    <>
      <Messages messages={messages} />
      <InputMessage
        input={input}
        setInput={setInput}
        lastId={lastIdMessage}
        setLastId={setLastIdMessage}
      />
    </>
  );
};
