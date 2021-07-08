import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {SocketContext} from '../context/SocketContext.jsx';
import MessageContainer from './message/MessageContainer.jsx';

const QuickChat = (props) => {

  const uid = 0;

  return (
    <>
      <h1>quickchat</h1>
      <MessageContainer uid={uid}/>
    </>
  );
};

export default QuickChat;