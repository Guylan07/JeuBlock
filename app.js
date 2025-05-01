import { useState } from 'react';

const MessageBlockingGame = () => {
  // État pour stocker les conversations
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Marc Dupont",
      avatar: "👨",
      messages: [
        { text: "Salut, j'aurais besoin de ton aide pour un projet...", read: false }
      ],
      blocked: false
    },
    {
      id: 2,
      name: "Sophie Martin",
      avatar: "👩",
      messages: [
        { text: "Hey! Tu as vu cette nouvelle application? Elle collecte toutes tes données personnelles mais elle est super fun!", read: false }
      ],
      blocked: false
    },
    {
      id: 3,
      name: "Thomas Bernard",
      avatar: "👨",
      messages: [
        { text: "Bonjour, je suis un prince nigérian et j'ai besoin de ton aide pour transférer 5 millions d'euros...", read: false }
      ],
      blocked: false
    },
    {
      id: 4,
      name: "Julie Petit",
      avatar: "👩",
      messages: [
        { text: "Salut, ça fait longtemps! Tu te souviens de notre projet au lycée?", read: false }
      ],
      blocked: false
    },
    {
      id: 5,
      name: "Paul Leroy",
      avatar: "👨",
      messages: [
        { text: "URGENT!! J'ai un super investissement pour toi, retour sur investissement garanti de 500% en une semaine!!!", read: false }
      ],
      blocked: false
    }
  ]);

  // État pour gérer la conversation active
  const [activeConversation, setActiveConversation] = useState(null);
  // Compteur de personnes bloquées
  const [blockedCount, setBlockedCount] = useState(0);

  // Fonction pour ouvrir une conversation
  const openConversation = (id) => {
    setActiveConversation(id);
    
    // Marquer le message comme lu
    setConversations(conversations.map(convo => {
      if (convo.id === id) {
        const updatedMessages = convo.messages.map(msg => ({ ...msg, read: true }));
        return { ...convo, messages: updatedMessages };
      }
      return convo;
    }));
  };

  // Fonction pour bloquer une conversation
  const blockConversation = (id) => {
    setConversations(conversations.map(convo => {
      if (convo.id === id) {
        return { ...convo, blocked: true };
      }
      return convo;
    }));
    setBlockedCount(blockedCount + 1);
    setActiveConversation(null);
  };

  // Fonction pour répondre au message
  const replyToMessage = (id, replyText) => {
    setConversations(conversations.map(convo => {
      if (convo.id === id) {
        // Ajouter la réponse du joueur
        const updatedMessages = [...convo.messages, { text: replyText, read: true, isPlayer: true }];
        
        // Générer une réponse aléatoire du NPC après un délai
        setTimeout(() => {
          const responses = [
            "Super, je savais que je pouvais compter sur toi!",
            "Merci pour ta réponse, j'apprécie.",
            "Génial! Je t'envoie plus d'infos bientôt.",
            "Ok, n'oublie pas que c'est urgent!",
            "Tu ne le regretteras pas, promis!"
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          
          setConversations(prevConvos => prevConvos.map(c => {
            if (c.id === id) {
              return { 
                ...c, 
                messages: [...c.messages, 
                  { text: replyText, read: true, isPlayer: true },
                  { text: randomResponse, read: false }
                ] 
              };
            }
            return c;
          }));
        }, 1000);
        
        return { ...convo, messages: updatedMessages };
      }
      return convo;
    }));
    setActiveConversation(null);
  };

  // Fonction pour fermer la conversation active
  const closeConversation = () => {
    setActiveConversation(null);
  };

  // Composant pour afficher la liste des conversations
  const ConversationList = () => (
    <div className="w-full max-w-md mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-lg">
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Messages ({conversations.filter(c => !c.blocked).length})</h1>
        <p className="text-sm">Personnes bloquées: {blockedCount}</p>
      </div>
      <div className="divide-y divide-gray-200">
        {conversations.map(convo => !convo.blocked && (
          <div 
            key={convo.id} 
            className={`p-4 flex items-center hover:bg-gray-200 cursor-pointer ${!convo.messages.every(m => m.read) ? 'bg-blue-50' : ''}`}
            onClick={() => openConversation(convo.id)}
          >
            <div className="text-3xl mr-3">{convo.avatar}</div>
            <div className="flex-1">
              <h2 className="font-semibold">{convo.name}</h2>
              <p className="text-sm text-gray-600 truncate">
                {convo.messages[convo.messages.length - 1].text.substring(0, 30)}
                {convo.messages[convo.messages.length - 1].text.length > 30 ? '...' : ''}
              </p>
            </div>
            {!convo.messages.every(m => m.read) && (
              <div className="w-3 h-3 bg-blue-500 rounded-full ml-2"></div>
            )}
          </div>
        ))}
        {conversations.filter(c => !c.blocked).length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Toutes les conversations ont été bloquées!
            <div className="mt-4">
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => window.location.reload()}
              >
                Recommencer le jeu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Composant pour afficher une conversation ouverte
  const ConversationView = ({ conversation }) => {
    const [replyText, setReplyText] = useState("");
    
    return (
      <div className="w-full max-w-md mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-lg">
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={closeConversation} className="mr-2 text-white">
              ← Retour
            </button>
            <h1 className="text-xl font-bold">{conversation.name}</h1>
          </div>
          <button 
            onClick={() => blockConversation(conversation.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Bloquer
          </button>
        </div>
        
        <div className="p-4 h-64 overflow-y-auto flex flex-col">
          {conversation.messages.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-2 p-2 rounded max-w-xs ${msg.isPlayer 
                ? 'bg-blue-500 text-white self-end' 
                : 'bg-gray-300 text-gray-800 self-start'}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-l p-2"
              placeholder="Écrire un message..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && replyText.trim()) {
                  replyToMessage(conversation.id, replyText.trim());
                  setReplyText("");
                }
              }}
            />
            <button 
              className={`bg-blue-500 text-white px-4 rounded-r ${!replyText.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
              disabled={!replyText.trim()}
              onClick={() => {
                if (replyText.trim()) {
                  replyToMessage(conversation.id, replyText.trim());
                  setReplyText("");
                }
              }}
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Jeu de Messagerie</h1>
      <p className="text-center mb-6">Lisez les messages et décidez qui bloquer!</p>
      
      {activeConversation 
        ? <ConversationView conversation={conversations.find(c => c.id === activeConversation)} /> 
        : <ConversationList />
      }
    </div>
  );
};

export default MessageBlockingGame;