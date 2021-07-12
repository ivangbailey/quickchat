import React from 'react';

const formatTimestamp = (timestamp) => {
  var date = new Date(timestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();

  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

const Message = (props) => {
  const {message, user_id, date, position} = props.message;
  const classes = 'message ' + position;
  return (
    <div className={classes}>
      <div id={`msg-${date}`}className="bubble">
        {message}
      </div>
    </div>
  );
};

export default Message;