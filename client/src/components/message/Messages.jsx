import React, {useState, useContext, useEffect} from 'react';
import Message from './Message.jsx';
import MessageInput from './MessageInput.jsx';
import {SocketContext} from '../../context/SocketContext.jsx';
import axios from 'axios';
const Messages = (props) => {

  const [messages, setMessages] = useState([]);

  const socket = useContext(SocketContext);
  const {uid} = props;

  const renderMessage = (message) => {
    const found = messages.find(m => m.date == message.date);
    if (!found) {
      console.log('not found')
      setMessages((prev) => {
        const m = JSON.parse(message);
        return [...prev, m];
      });
    }
  }

  // This effect should only be invoked once, when the
  // page needs to grab the initial array of messages.
  // Further messages will be pulled on demand from socket.io (effect below)
  useEffect(() => {
    axios.get('/messages')
      .then(function (response) {
        setMessages([...messages, ...response.data]);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    socket.on('message', message => {
      renderMessage(message);
      var scroll = document.getElementById('messages');
      scroll.scrollTop = scroll.scrollHeight;
      scroll.animate(
        {scrollTop: scroll.scrollHeight}, {duration: 200});
    });
   // return socket.disconnect();
  }, []);

  return (
    <div id="messages">
      {messages.map(message => {
        message.position = uid == message.uid ? 'right' : 'left';
        return <Message key={JSON.stringify(message.date)} message={message}/>;
      })}

    </div>

  );
};

export default Messages;