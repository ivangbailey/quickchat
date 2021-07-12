CREATE DATABASE quickchat;

USE quickchat;

CREATE TABLE messages (
  user_id text NOT NULL,
  room_id VARCHAR(255) NOT NULL,
  date interval,
  message TEXT NOT NULL
);

CREATE TABLE users (
  user_id text,
  username VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
