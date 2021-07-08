import React, {useRef, useContext} from 'react';
import {SocketContext} from '../../context/SocketContext.jsx';

const MessageInput = (props) => {
  const input = useRef('');

  const socket = useContext(SocketContext);
  const {uid} = props;

  const value = () => {
    return input.current.value;
  };

  const reset = () => {
    input.current.value = '';
  }

  const submit = () => {
    const message = {
      uid: uid,
      message: value()
    };
    socket.emit('message', message)
  }

  const nudge = () => {
    const inputElement = document.getElementById('message-input');
    inputElement.classList.add('error');
    setTimeout(() => inputElement.classList.remove('error'), 450)
  }

  const keyListener = (event) => {
    if (event.key === 'Enter') {
      if (value() === '') {
        nudge();
      } else {
        submit();
        reset();
      }
    }
  }

  return (
    <>
      <input id="message-input" type="text" ref={input} placeholder="type a message here..." onKeyDown={keyListener}/>
      {/* <button id="send"><i class="fas fa-paper-plane" /></button> */}
    </>
  );
};

export default MessageInput;