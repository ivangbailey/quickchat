import React from 'react';
import socketio from "socket.io-client";

const server = "http://localhost:3000";

export const socket = socketio.connect(server);
export const SocketContext = React.createContext();