import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import MessageContainer from './message/MessageContainer.jsx';
import Cookies from 'js-cookie';

const QuickChat = (props) => {
  const uid = Cookies.get('uuid');

  console.log(uid);

  return (
    <>
      <h1>quickchat</h1>
      <MessageContainer uid={uid}/>
    </>
  );
};

export default QuickChat;