import React, { useState, useEffect } from 'react';

import Dzerq2Img from '../../assets/Dzerq2.png';
import Dzerq3Img from '../../assets/Dzerq3.png';

function Footerverev() {
  const [data, setData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/footerVerev')
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch(() => {
        setData({
          updatedAt: '27/07/2026 15:52',
          reviews: [
            {
              id: 1,
              rating: 5,
              text: 'Բանկ, որ իր ռեբրենդինգի շքեղ միջոցառմամբ ու աշխատանքային ձևաչափով բանկային ոլորտում ամրապնդեց որակ և ճաշակ թելադրեց: Evocabank-ն առաջին իսկ վայրկյանից ստիպեց նորովի և ժամանակակից...',
              author: 'Կամո Թովմասյան',
              role: 'KAMOBLOG մեդիա-հարթակի հիմնադիր, influencer'
            },
            {
              id: 2,
              rating: 5,
              text: 'Evocabank-ի հետ աշխատելը իսկական հաճույք է: Ժամանակակից ծառայությունները և արագ սպասարկումը անփոխարինելի են:',
              author: 'Աննա Գրիգորյան',
              role: 'Մարկետոլոգ'
            },
            {
              id: 3,
              rating: 5,
              text: 'Լավագույն թվային բանկինգը Հայաստանում: Հավելվածն անհավանական հարմար է ու ոճային:',
              author: 'Արմեն Սարգսյան',
              role: 'IT մասնագետ'
            },
            {
              id: 4,
              rating: 5,
              text: 'Արագ փոխանցումներ, բարձրակարգ սպասարկում և միշտ հասանելի աջակցություն:',
              author: 'Սոնա Մարտիրոսյան',
              role: 'Դիզայներ'
            },
            {
              id: 5,
              rating: 5,
              text: 'Ինովացիոն բանկային լուծումներ, որոնք խնայում են ժամանակը:',
              author: 'Դավիթ Հովհաննիսյան',
              role: 'Գործարար'
            }
          ]
        });
      });
  }, []);

  // Ավտոմատ slider փոխվելը (ամեն 5 վայրկյանը մեկ)
  useEffect(() => {
    if (!data || !data.reviews || data.reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);

  if (!data) return null;

  const currentReview = data.reviews[currentIndex] || data.reviews[0];

  return (
    <div className="footer-verev-container">
      <style>{`
        .footer-verev-container {
          position: relative;
          width: 100%;
          background-color: #f7f5fc;
          padding: 70px 20px 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          overflow: hidden;
          font-family: 'Segoe UI', Roboto, sans-serif;
        }

        @keyframes floatContinuous {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(10deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        @keyframes floatReverseContinuous {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(25px) rotate(-10deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        @keyframes pulseTriangle {
          0% { transform: translateY(0px) scale(1) rotate(0deg); }
          50% { transform: translateY(-35px) scale(1.2) rotate(25deg); }
          100% { transform: translateY(0px) scale(1) rotate(0deg); }
        }

        .big-triangle-left {
          position: absolute;
          left: 6%;
          top: 15%;
          width: 0;
          height: 0;
          border-left: 35px solid transparent;
          border-right: 35px solid transparent;
          border-bottom: 65px solid #6100e0;
          opacity: 0.15;
          animation: pulseTriangle 7s ease-in-out infinite;
          z-index: 1;
        }

        .big-triangle-right {
          position: absolute;
          right: 7%;
          bottom: 20%;
          width: 0;
          height: 0;
          border-left: 40px solid transparent;
          border-right: 40px solid transparent;
          border-bottom: 75px solid #ff007a;
          opacity: 0.18;
          animation: pulseTriangle 9s ease-in-out infinite reverse;
          z-index: 1;
        }

        .zigzag-left-img {
          position: absolute;
          left: 23%;
          bottom: 22%;
          width: 50px;
          height: 50px;
          animation: floatContinuous 5s ease-in-out infinite;
          z-index: 2;
        }

        .zigzag-right-img {
          position: absolute;
          right: 21%;
          bottom: 28%;
          width: 60px;
          height: 60px;
          animation: floatReverseContinuous 6s ease-in-out infinite;
          z-index: 2;
        }

        .hand-left-img {
          position: absolute;
          left: 20%;
          top: 10%;
          width: 125px;
          height: auto;
          z-index: 3;
          animation: floatContinuous 6s ease-in-out infinite;
        }

        .hand-right-img {
          position: absolute;
          right: 20%;
          top: 12%;
          width: 115px;
          height: auto;
          z-index: 3;
          animation: floatReverseContinuous 5.5s ease-in-out infinite;
        }

        /* 4. Կենտրոնական կարծիքի բլոկ */
        .review-card-center {
          max-width: 680px;
          text-align: center;
          position: relative;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stars-container {
          display: flex;
          gap: 8px;
          margin-bottom: 25px;
        }

        .star-item {
          color: #ffc107;
          font-size: 28px;
        }

        /* Չակերտներ և Տեքստ */
        .quote-box {
          position: relative;
          padding: 0 45px;
        }

        .quote-left-mark {
          position: absolute;
          left: -15px;
          top: -15px;
          font-size: 44px;
          color: #6100e0;
          font-weight: 900;
          line-height: 1;
        }

        .quote-right-mark {
          position: absolute;
          right: -15px;
          bottom: -25px;
          font-size: 44px;
          color: #6100e0;
          font-weight: 900;
          line-height: 1;
        }

        .review-main-text {
          font-size: 16px;
          line-height: 1.6;
          color: #1a1a1a;
          font-weight: 600;
          margin: 0;
        }

        .review-main-text span.brand-highlight {
          color: #6100e0;
          font-weight: 700;
        }

        .author-name {
          font-size: 15px;
          font-weight: 800;
          color: #1a1a1a;
          margin-top: 30px;
          margin-bottom: 4px;
        }

        .author-role {
          font-size: 13px;
          color: #888888;
          margin: 0;
        }

        .dots-container {
          display: flex;
          gap: 12px;
          margin-top: 25px;
        }

        .slider-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background-color: #cccccc;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .slider-dot.active {
          background-color: #6100e0;
          transform: scale(1.3);
        }

        /* Թարմացման ամսաթիվ */
        .update-timestamp {
          width: 100%;
          text-align: right;
          font-size: 11px;
          color: #aaaaaa;
          margin-top: 40px;
          padding-right: 15px;
        }

        @media (max-width: 992px) {
          .hand-left-img { left: 5%; width: 85px; }
          .hand-right-img { right: 5%; width: 80px; }
          .zigzag-left-img { left: 10%; }
          .zigzag-right-img { right: 10%; }
          .review-main-text { font-size: 14px; }
        }
      `}</style>

      <div className="big-triangle-left" />
      <div className="big-triangle-right" />

      <img src={Dzerq2Img} alt="OK Hand" className="hand-left-img" />
      <img src={Dzerq3Img} alt="Thumbs Up" className="hand-right-img" />

      <svg className="zigzag-left-img" viewBox="0 0 50 80">
        <path d="M10 10 L35 30 L10 50 L35 70" stroke="#8c32ff" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg className="zigzag-right-img" viewBox="0 0 80 50">
        <path d="M10 25 L30 10 L50 40 L70 25" stroke="#ff007a" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="review-card-center">
        <div className="stars-container">
          {[...Array(currentReview.rating || 5)].map((_, i) => (
            <span key={i} className="star-item">★</span>
          ))}
        </div>

        <div className="quote-box">
          <span className="quote-left-mark">“</span>
          <p className="review-main-text">
            {currentReview.text.includes('Evocabank') ? (
              <>
                {currentReview.text.split('Evocabank')[0]}
                <span className="brand-highlight">Evocabank</span>
                {currentReview.text.split('Evocabank')[1]}
              </>
            ) : (
              currentReview.text
            )}
          </p>
          <span className="quote-right-mark">”</span>
        </div>

        <h4 className="author-name">{currentReview.author}</h4>
        <p className="author-role">{currentReview.role}</p>

        <div className="dots-container">
          {data.reviews.map((_, idx) => (
            <button
              key={idx}
              className={`slider-dot ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>

      <div className="update-timestamp">
        Թարմացվել է` {data.updatedAt}
      </div>
    </div>
  );
}

export default Footerverev;