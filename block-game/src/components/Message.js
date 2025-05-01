import React from 'react';
import '../styles/Message.css';

const Message = ({ message }) => {
  const { text, sender, timestamp } = message;
  
  return (
    <div className={`message ${sender === 'me' ? 'message-sent' : 'message-received'}`}>
      <div className="message-content">
        <p>{text}</p>
        <div className="message-timestamp">{timestamp}</div>
      </div>
    </div>
  );
};

export default Message;