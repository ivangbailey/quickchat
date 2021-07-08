import React from 'react';
import Messages from './Messages.jsx';
import MessageInput from './MessageInput.jsx';

const MessageContainer = (props) => {
  const {uid, messages} = props;
  return (
    <section id="message-container" >
      <Messages uid={uid}/>
      <MessageInput uid={uid}/>
    </section>
  );
};

export default MessageContainer;