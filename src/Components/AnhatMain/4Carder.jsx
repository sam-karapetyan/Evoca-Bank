import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import './Carder.css'; 

import card1 from '../../assets/card1.png';
import card2 from '../../assets/card2.png';
import card3 from '../../assets/card3.png';
import card4 from '../../assets/card4.png';
import card5 from '../../assets/card5.png';
import card6 from '../../assets/card6.png';
import card7 from '../../assets/card7.png';
import card8 from '../../assets/card8.png';
import card9 from '../../assets/card9.png';
import card10 from '../../assets/card10.png';

const ALL_CARDS = [
  { id: '1', title: 'Arca Classic', image: card1 },
  { id: '2', title: 'Visa Business', image: card2 },
  { id: '3', title: 'Dalma Gift Card', image: card3 },
  { id: '4', title: 'Evoca Travel Card', image: card4 },
  { id: '5', title: 'Evoca Touch Card', image: card5 },
  { id: '6', title: 'Evoca Digital Card', image: card6 },
  { id: '7', title: 'Evoca Gold Card', image: card7 },
  { id: '8', title: 'Evoca Platinum Card', image: card8 },
  { id: '9', title: 'Evoca Infinite Card', image: card9 },
  { id: '10', title: 'Evoca Premium Card', image: card10 }
];

function Carder() {
  const navigate = useNavigate();

  const [cardsList, setCardsList] = useState(ALL_CARDS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [buttonText, setButtonText] = useState("Մանրամասն");
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, isHovered: false });

  useEffect(() => {
    const cardsRef = ref(db, '/cardsSection');
    const unsubscribe = onValue(cardsRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        if (val.buttonText) setButtonText(val.buttonText);
        if (val.items) {
          const itemsArr = Array.isArray(val.items) ? val.items : Object.values(val.items);
          if (itemsArr.length > 0) {
            const merged = itemsArr.map((item, idx) => ({
              ...item,
              image: ALL_CARDS[idx % ALL_CARDS.length].image
            }));
            setCardsList(merged);
          }
        }
      }
    }, () => {
      setCardsList(ALL_CARDS);
    });

    return () => unsubscribe();
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? cardsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === cardsList.length - 1 ? 0 : prev + 1));
  };

  const handleDetailNavigation = () => {
    const currentCard = cardsList[activeIndex];
    const cardId = currentCard?.id || activeIndex;
    navigate(`/card-detail/${cardId}`);
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left - card.width / 2;
    const y = e.clientY - card.top - card.height / 2;

    const rotateX = (y / (card.height / 2)) * 18;
    const rotateY = (-x / (card.width / 2)) * 18;

    setTilt({ rotateX, rotateY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, isHovered: false });
  };

  const getVisibleCards = () => {
    if (cardsList.length === 0) return [];
    
    let visible = [];
    let startIdx = activeIndex - 1;
    if (startIdx < 0) startIdx = cardsList.length - 1;

    for (let i = 0; i < 3; i++) {
      const idx = (startIdx + i) % cardsList.length;
      visible.push({ card: cardsList[idx], originalIndex: idx });
    }
    return visible;
  };

  const activeCard = cardsList[activeIndex] || ALL_CARDS[0];
  const visibleCards = getVisibleCards();

  return (
    <div className="carder-container-unique">
      <div className="carder-left-sidebar">
        <button className="carder-arrow-btn" onClick={handlePrev} aria-label="Previous">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6c11d9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>

        <div className="carder-items-list">
          {visibleCards.map((item, idx) => (
            <div 
              key={idx} 
              className={`carder-thumb-item ${activeIndex === item.originalIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(item.originalIndex)}
            >
              <div className="carder-thumb-img-wrapper">
                <img 
                  src={item.card.image} 
                  alt={item.card.title} 
                />
              </div>
              <span className="carder-thumb-title">{item.card.title}</span>
            </div>
          ))}
        </div>

        <button className="carder-arrow-btn" onClick={handleNext} aria-label="Next">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6c11d9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      <div className="carder-center-display">
        <div 
          key={activeIndex} 
          className={`carder-big-card-box ${tilt.isHovered ? 'hovered' : ''}`} 
          onClick={handleDetailNavigation}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: tilt.isHovered
              ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.05)`
              : 'rotateX(0deg) rotateY(0deg) scale(1)',
            transition: tilt.isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out'
          }}
        >
          <img 
            src={activeCard.image} 
            alt={activeCard.title} 
            className="carder-big-card-img" 
          />
          <div className="carder-card-shadow"></div>
        </div>
      </div>

      <div className="carder-right-info">
        <h2 className="carder-main-title">
          {activeCard.title}
        </h2>
        <button className="carder-action-btn" onClick={handleDetailNavigation}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default Carder;