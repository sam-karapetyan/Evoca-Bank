import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';

import card1Img from '../../assets/card1.png';
import card2Img from '../../assets/card2.png';
import card3Img from '../../assets/card3.png';

const LOCAL_IMAGES = {
  card1: card1Img,
  card2: card2Img,
  card3: card3Img,
};

const DEFAULT_LOCAL_IMAGES = [card1Img, card2Img, card3Img];

function Carder() {
  const navigate = useNavigate();

  const [sectionData, setSectionData] = useState({
    title: "Evoca Travel Card",
    buttonText: "Մանրամասն",
    cards: []
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, isHovered: false });

  useEffect(() => {
    const cardsRef = ref(db, '/cardsSection');
    const unsubscribe = onValue(cardsRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        const firebaseCards = val.items ? Object.values(val.items) : [];
        setSectionData({
          title: val.title || "Evoca Travel Card",
          buttonText: val.buttonText || "Մանրամասն",
          cards: firebaseCards
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const cardsList = sectionData.cards;

  const getCardImage = (card, index) => {
    if (card?.imageKey && LOCAL_IMAGES[card.imageKey]) {
      return LOCAL_IMAGES[card.imageKey];
    }
    if (card?.image && LOCAL_IMAGES[card.image]) {
      return LOCAL_IMAGES[card.image];
    }
    return DEFAULT_LOCAL_IMAGES[index % DEFAULT_LOCAL_IMAGES.length];
  };

  const handlePrev = () => {
    if (cardsList.length === 0) return;
    setActiveIndex((prev) => (prev === 0 ? cardsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (cardsList.length === 0) return;
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

    const rotateX = (y / (card.height / 2)) * 22; 
    const rotateY = (-x / (card.width / 2)) * 22; 

    setTilt({ rotateX, rotateY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, isHovered: false });
  };

  const getVisibleCards = () => {
    if (cardsList.length === 0) return [];
    if (cardsList.length <= 3) {
      return cardsList.map((card, idx) => ({ card, originalIndex: idx }));
    }

    let visible = [];
    let startIdx = activeIndex - 1;
    if (startIdx < 0) startIdx = cardsList.length - 1;

    for (let i = 0; i < 3; i++) {
      const index = (startIdx + i) % cardsList.length;
      visible.push({ card: cardsList[index], originalIndex: index });
    }
    return visible;
  };

  const activeCard = cardsList[activeIndex] || {};
  const visibleCards = getVisibleCards();

  return (
    <div className="carder-container-unique">
      <style>{`
        @keyframes cardFadeIn {
          from {
            opacity: 0.3;
            transform: scale(0.9) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes titleSlide {
          from {
            opacity: 0;
            transform: translateX(15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .carder-container-unique {
          width: 100%;
          background-color: #f2f5f9;
          padding: 50px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 520px;
          box-sizing: border-box;
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          overflow: hidden !important;
        }

        .carder-left-sidebar {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 220px;
          user-select: none;
        }

        .carder-arrow-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .carder-arrow-btn:hover {
          transform: scale(1.25);
        }

        .carder-items-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin: 12px 0;
          width: 100%;
          align-items: center;
        }

        .carder-thumb-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.55;
          transform: scale(0.95);
        }

        .carder-thumb-item.active {
          opacity: 1;
          transform: scale(1.1);
        }

        .carder-thumb-img-wrapper {
          width: 130px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          overflow: hidden;
          background: transparent;
          padding: 4px;
          transition: transform 0.3s ease;
        }

        .carder-thumb-item:hover .carder-thumb-img-wrapper {
          transform: translateY(-4px) rotate(-3deg);
        }

        .carder-thumb-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 6px 12px rgba(0,0,0,0.15));
        }

        .carder-thumb-title {
          margin-top: 6px;
          font-size: 13px;
          font-weight: 700;
          color: #2c2e35;
          text-align: center;
        }

        /* 3D Dynamic Container */
        .carder-center-display {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          perspective: 1000px; /* 3D խորություն */
        }

        /* 💥 DYNAMIC TILT BOX */
        .carder-big-card-box {
          position: relative;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform-style: preserve-3d;
          animation: cardFadeIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          will-change: transform;
        }

        .carder-big-card-img {
          width: 380px;
          height: 240px;
          object-fit: contain;
          filter: drop-shadow(0 14px 22px rgba(0, 0, 0, 0.18));
          transition: filter 0.3s ease;
        }

        /* Hover ժամանակ ստվերի փոփոխություն */
        .carder-big-card-box.hovered .carder-big-card-img {
          filter: drop-shadow(-10px 25px 30px rgba(108, 17, 217, 0.4));
        }

        .carder-card-shadow {
          width: 80%;
          height: 14px;
          background: rgba(0, 0, 0, 0.14);
          border-radius: 50%;
          filter: blur(10px);
          margin-top: 18px;
          transition: all 0.3s ease;
        }

        .carder-big-card-box.hovered .carder-card-shadow {
          width: 88%;
          transform: translateY(10px) scale(0.9);
          background: rgba(108, 17, 217, 0.3);
          filter: blur(14px);
        }

        .carder-right-info {
          width: 280px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
        }

        .carder-main-title {
          font-size: 32px;
          font-weight: 700;
          color: #1e2025;
          margin: 0;
          line-height: 1.25;
          animation: titleSlide 0.35s ease forwards;
        }

        .carder-action-btn {
          background-color: #6c11d9;
          color: #ffffff;
          border: none;
          padding: 13px 36px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 25px;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(108, 17, 217, 0.35);
          transition: all 0.25s ease;
        }

        .carder-action-btn:hover {
          background-color: #580fb4;
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 10px 25px rgba(108, 17, 217, 0.5);
        }
      `}</style>

      {/* Ձախ sidebar */}
      <div className="carder-left-sidebar">
        <button className="carder-arrow-btn" onClick={handlePrev} aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6c11d9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
                  src={getCardImage(item.card, item.originalIndex)} 
                  alt={item.card.title || 'Card'} 
                />
              </div>
              <span className="carder-thumb-title">{item.card.title}</span>
            </div>
          ))}
        </div>

        <button className="carder-arrow-btn" onClick={handleNext} aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6c11d9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      {/* Կենտրոնական քարտ՝ Real-time Dynamic 3D Tilt Effect-ով */}
      <div className="carder-center-display">
        <div 
          key={activeIndex} 
          className={`carder-big-card-box ${tilt.isHovered ? 'hovered' : ''}`} 
          onClick={handleDetailNavigation}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: tilt.isHovered
              ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.06)`
              : 'rotateX(0deg) rotateY(0deg) scale(1)',
            transition: tilt.isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
          }}
        >
          <img 
            src={getCardImage(activeCard, activeIndex)} 
            alt={activeCard.title || 'Featured Card'} 
            className="carder-big-card-img" 
          />
          <div className="carder-card-shadow"></div>
        </div>
      </div>

      {/* Աջ կողմ */}
      <div className="carder-right-info">
        <h2 key={activeIndex} className="carder-main-title">
          {activeCard.title || sectionData.title}
        </h2>
        <button className="carder-action-btn" onClick={handleDetailNavigation}>
          {sectionData.buttonText}
        </button>
      </div>
    </div>
  );
}

export default Carder;