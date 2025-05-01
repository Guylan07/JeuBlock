import React from 'react';
import '../styles/ConversationList.css';

const ConversationList = ({ conversations, onSelectConversation, activeConversation }) => {
  return (
    <div className="conversation-list">
      <h2>Discussions</h2>
      <div className="conversation-items">
        {conversations.map(conversation => (
          <div 
            key={conversation.id}
            className={`conversation-item ${conversation.blocked ? 'blocked' : ''} ${activeConversation === conversation.id ? 'active' : ''}`}
            onClick={() => !conversation.blocked && onSelectConversation(conversation.id)}
          >
            <div className="conversation-avatar">{conversation.avatar}</div>
            <div className="conversation-info">
              <div className="conversation-name">
                {conversation.name}
                {conversation.blocked && <span className="blocked-badge">Bloqué</span>}
              </div>
              {conversation.hasUnread && !conversation.blocked && (
                <div className="unread-indicator">Nouveau message</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;