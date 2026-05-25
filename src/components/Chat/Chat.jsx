import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InputMessage from './InputMessage/InputMessage';
import Messages from './Messages/Messages';

export default function Chat() {
  const [ input, setInput ] = useState('');
  const [ lastIdMessage, setLastIdMessage ] = useState(0);
  const [ messages, setMessages ] = useState([]);
  const hostURL = 'http://localhost:7075';

  const messageRcv = async() => {
    try {
      const responseMessageRcv = await fetch(hostURL + `/messages?from=${lastIdMessage}`);
      if (!responseMessageRcv.ok) {
        throw new Error('Ошибка HTTP: ' + responseMessageRcv.status);
      };
      const dataMessageRcv = await responseMessageRcv.json();
      setMessages([ ...dataMessageRcv ]);
      if (dataMessageRcv.length === 0) {
        return setLastIdMessage(0);
      };
      setLastIdMessage(dataMessageRcv[dataMessageRcv.length - 1].id);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    };
  };

  useEffect(() => {

    (() => {
      let userId = localStorage.getItem('userId');
      if (!userId) {
        userId = uuidv4();
        localStorage.setItem('userId', userId);
      }})();

    // fetch(hostURL + `/messages?from=${lastIdMessage}`)
    //   .then(r => r.json())
    //   .then(r => {
    //     setMessages([ ...r ]);
    //     setLastIdMessage(r[r.length - 1].id);
    //   });

    setInterval(() => {
      // fetch(hostURL + `/messages?from=${lastIdMessage}`)
      //   .then(r => r.json())
      //   .then(r => {
      //     setMessages([ ...r ]);
      //     setLastIdMessage(r[r.length - 1].id);
      //   });
      messageRcv();
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
