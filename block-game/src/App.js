import React, { useState } from 'react';
import ConversationList from './components/ConversationList';
import Conversation from './components/Conversation';
import { conversations as initialConversations } from './data/conversations';
import './styles/App.css';

function App() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConversation, setActiveConversation] = useState(null);

  const handleBlockUser = (conversationId) => {
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === conversationId 
          ? { ...conv, blocked: true } 
          : conv
      )
    );
  };

  const handleReadMessage = (conversationId) => {
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === conversationId 
          ? { ...conv, hasUnread: false } 
          : conv
      )
    );
  };

  const handleSelectConversation = (conversationId) => {
    setActiveConversation(conversationId);
    handleReadMessage(conversationId);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Block Game</h1>
      </header>
      <main className="app-main">
        <ConversationList 
          conversations={conversations} 
          onSelectConversation={handleSelectConversation}
          activeConversation={activeConversation}
        />
        {activeConversation !== null && (
          <Conversation 
            conversation={conversations.find(c => c.id === activeConversation)} 
            onBlockUser={handleBlockUser}
          />
        )}
      </main>
    </div>
  );
}

export default App;