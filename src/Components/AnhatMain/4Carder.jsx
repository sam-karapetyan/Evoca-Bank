import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';

// Import 10 card images from assets
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
      <style>{`
        @keyframes cardFadeIn {
          from {
            opacity: 0.5;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .carder-container-unique {
          width: 100%;
          background-color: #f2f5f9;
          padding: 50px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 540px;
          box-sizing: border-box;
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        .carder-left-sidebar {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          width: 180px;
          min-height: 420px;
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
          gap: 20px;
          width: 100%;
          align-items: center;
        }

        .carder-thumb-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0.6;
          transform: scale(0.9);
        }

        .carder-thumb-item.active {
          opacity: 1;
          transform: scale(1.05);
        }

        .carder-thumb-img-wrapper {
          width: 120px;
          height: 75px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          overflow: hidden;
        }

        .carder-thumb-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.15));
        }

        .carder-thumb-title {
          margin-top: 6px;
          font-size: 13px;
          font-weight: 600;
          color: #2b2b2b;
          text-align: center;
          white-space: nowrap;
        }

        /* Կենտրոնական Քարտ */
        .carder-center-display {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }

        .carder-big-card-box {
          position: relative;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform-style: preserve-3d;
          animation: cardFadeIn 0.3s ease-out forwards;
        }

        .carder-big-card-img {
          width: 420px;
          height: 260px;
          object-fit: contain;
          filter: drop-shadow(0 14px 22px rgba(0, 0, 0, 0.18));
          transition: filter 0.3s ease;
        }

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
        }

        /* Աջ կողմ */
        .carder-right-info {
          width: 280px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
        }

        .carder-main-title {
          font-size: 34px;
          font-weight: 700;
          color: #1e2025;
          margin: 0;
          line-height: 1.2;
        }

        .carder-action-btn {
          background-color: #6c11d9;
          color: #ffffff;
          border: none;
          padding: 14px 38px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 25px;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(108, 17, 217, 0.35);
          transition: all 0.25s ease;
        }

        .carder-action-btn:hover {
          background-color: #580fb4;
          transform: translateY(-2px);
        }
      `}</style>

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

      {/* Աջ կողմ */}
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