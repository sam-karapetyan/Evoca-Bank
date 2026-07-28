import React, { useState, useEffect, useRef } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';

// Import Assets
import Ardzan from '../../assets/Ardzan.png';
import ShapeBg from '../../assets/round__bg.png';

function Ardzancarder() {
  const [sectionData, setSectionData] = useState({
    title: "Լավագույնը Evocabank-ից",
    cards: []
  });

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // 1. Տվյալների ստացում Firebase-ից
  useEffect(() => {
    const ardzanRef = ref(db, '/ardzanCards');
    const unsubscribe = onValue(ardzanRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        const cardsArray = val.cards ? Object.values(val.cards) : [];
        setSectionData({
          title: val.title || "Լավագույնը Evocabank-ից",
          cards: cardsArray
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Intersection Observer՝ սքրոլ անելիս անիմացիան ակտիվացնելու համար
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        /* Պտտվող անիմացիան */
        @keyframes spin360 {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Գլխավոր կոնտեյներ */
        .ardzan-wrapper {
          background-color: #6c11d9; 
          position: relative;
          padding: 80px 134px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 650px;
          overflow: hidden; 
        }

        /* ՖՈՆԱՅԻՆ ՆԿԱՐԸ */
        .ardzan-shape-bg {
          position: absolute;
          z-index: 0; 
          right: 0px; 
          top: 0px;
          height: 100%; 
          object-fit: cover;
        }

        .ardzan-right-decor {
          position: absolute;
          right: 60px;
          top: 50%;
          transform: translateY(-50%);
          width: 220px;
          height: 220px;
          border-radius: 50%;
          pointer-events: none;
          background-image: radial-gradient(rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px);
          background-size: 16px 16px;
          opacity: 0.5;
          z-index: 1;
        }

        /* Ձախ մաս՝ Արձան */
        .ardzan-left-box {
          position: relative;
          width: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          z-index: 2; 
          margin-right: -20px;
        }

        /* Արձանի պտտվող SVG-ն (մի քանի օղակներով) */
        .ardzan-spinning-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 380px; 
          height: 380px;
          z-index: 1; 
          animation: spin360 25s linear infinite; /* Արագությունը դրեցի 25 վրկ, որ ավելի հանգիստ լինի */
          pointer-events: none;
        }

        .ardzan-img {
          width: 340px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0px 10px 20px rgba(0,0,0,0.25));
          z-index: 2; 
        }

        /* Աջ մաս՝ Վերնագիր և Քարտեր */
        .ardzan-right-box {
          position: relative;
          flex: 1;
          max-width: 880px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          z-index: 2; 
        }

        .ardzan-main-title {
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        /* Քարտեր */
        .ardzan-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 30px 32px;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-height: 190px;
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                      box-shadow 0.3s ease;
        }

        .ardzan-card.animate-up {
          opacity: 1;
          transform: translateY(0);
        }

        .ardzan-card:nth-child(1) { transition-delay: 0.1s; }
        .ardzan-card:nth-child(2) { transition-delay: 0.25s; }
        .ardzan-card:nth-child(3) { transition-delay: 0.4s; }
        .ardzan-card:nth-child(4) { transition-delay: 0.55s; }

        .ardzan-card:hover {
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
        }

        .card-tag {
          font-size: 11px;
          font-weight: 700;
          background-color: #f3e8ff;
          color: #6c11d9;
          padding: 5px 12px;
          border-radius: 6px;
          width: max-content;
          text-transform: uppercase;
        }

        .card-title {
          font-size: 20px;
          font-weight: 700;
          color: #121216;
        }

        .card-desc {
          font-size: 14px;
          color: #555566;
          line-height: 1.6;
        }
      `}</style>

      <div ref={sectionRef} className="ardzan-wrapper">
        
        <img src={ShapeBg} alt="Background Shape" className="ardzan-shape-bg" />

        <div className="ardzan-right-decor"></div>

        {/* Ձախ մաս՝ Արձան */}
        <div className="ardzan-left-box">
          
          {/* Պտտվող SVG՝ 3 իրար մոտ օղակներով */}
          <svg className="ardzan-spinning-circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Ամենամեծ օղակը */}
            <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" strokeDasharray="4, 4" />
            
            {/* Միջին օղակը (շառավիղը 45) */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.6" strokeDasharray="6, 6" />
            
            {/* Ամենափոքր օղակը (շառավիղը 42) */}
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" strokeDasharray="2, 5" />
            
            {/* Դեկորատիվ կետեր արտաքին (48) օղակի վրա */}
            <circle cx="50" cy="2" r="1.5" fill="#ffffff" />
            <circle cx="50" cy="98" r="1.5" fill="#ffffff" />
            <circle cx="2" cy="50" r="1.5" fill="#ffffff" />
            <circle cx="98" cy="50" r="1.5" fill="#ffffff" />
          </svg>

          <img src={Ardzan} alt="Evoca Statue" className="ardzan-img" />
        </div>

        {/* Աջ մաս՝ Վերնագիր և 4 քարտեր */}
        <div className="ardzan-right-box">
          <h2 className="ardzan-main-title">{sectionData.title}</h2>

          <div className="cards-grid">
            {sectionData.cards.map((card, index) => (
              <div 
                className={`ardzan-card ${isVisible ? 'animate-up' : ''}`} 
                key={index}
              >
                <span className="card-tag">{card.tag}</span>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Ardzancarder;