CREATE DATABASE quickchat;

USE quickchat;

CREATE TABLE messages (
  user_id INT NOT NULL,
  room_id VARCHAR(255) NOT NULL,
  date interval,
  message TEXT NOT NULL
);

CREATE TABLE users (
  user_id serial,
  user_name VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
