import React from 'react';
import ReactDOM from 'react-dom';
import QuickChat from './components/QuickChat.jsx';
import {SocketContext, socket} from './context/SocketContext.jsx';

ReactDOM.render(
  <SocketContext.Provider value={socket}>
    <QuickChat />
  </SocketContext.Provider>, document.getElementById('quickchat'));