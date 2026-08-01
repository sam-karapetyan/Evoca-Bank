import React, { useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import Chat from './Chat';
import './FloatingChat.css';

function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="floating-chat-wrapper">
      {isOpen && (
        <div className="chat-popup">
          <div className="chat-popup-header">
            <span>Օնլայն Չաթ</span>
            <button onClick={() => setIsOpen(false)} className="close-btn">
              <FaTimes />
            </button>
          </div>
          <div className="chat-popup-body">
            <Chat />
          </div>
        </div>
      )}

      <button 
        className="floating-chat-btn" 
        onClick={() => setIsOpen(!isOpen)}
        title="Չաթ"
      >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
      </button>
    </div>
  );
}

export default FloatingChat;