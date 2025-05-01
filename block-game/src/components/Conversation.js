import React from 'react';
import Message from './Message';
import BlockButton from './BlockButton';
import '../styles/Conversation.css';

const Conversation = ({ conversation, onBlockUser }) => {
  if (!conversation) return null;
  
  const { id, name, avatar, messages, blocked } = conversation;

  return (
    <div className="conversation">
      <div className="conversation-header">
        <div className="conversation-header-info">
          <div className="conversation-header-avatar">{avatar}</div>
          <div className="conversation-header-name">{name}</div>
        </div>
        
        {!blocked && (
          <BlockButton onBlock={() => onBlockUser(id)} />
        )}
      </div>
      
      <div className="conversation-messages">
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      
      {blocked && (
        <div className="blocked-message">
          <p>Vous avez bloqué cette personne</p>
        </div>
      )}
      
      {!blocked && (
        <div className="conversation-input">
          <input 
            type="text" 
            placeholder="Écrire un message..." 
            disabled={blocked}
          />
          <button>Envoyer</button>
        </div>
      )}
    </div>
  );
};

export default Conversation;