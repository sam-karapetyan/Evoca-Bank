import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Assets նկարների ներմուծում
import FootballImg from '../../assets/Football.png';
import EarthImg from '../../assets/Earth.png';
import XImg from '../../assets/X.png';

function Mrcanak() {
  const navigate = useNavigate();

  // Քարտերի տվյալները
  const newsData = [
    {
      id: 1,
      img: XImg,
      category: 'Բանկային',
      title: 'Գործարքների արգելափակում 1 կոճակով',
      date: '01.06.2026'
    },
    {
      id: 2,
      img: EarthImg,
      category: 'Մրցանակներ',
      title: 'Evocabank` Լավագույն Բանկը Հայաստանում 2026',
      date: '30.06.2026'
    },
    {
      id: 3,
      img: FootballImg,
      category: 'Կենսակերպ',
      title: 'Evoca-ն` EuroBasket U16 մրցաշարի պաշտոնական հովանավոր',
      date: '09.07.2026'
    }
  ];

  // Scroll անելիս քարտերի ներքևից վերև բարձրանալու (Animation) էֆեկտը
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show-card');
          }
        });
      },
      { threshold: 0.15 }
    );

    const cards = document.querySelectorAll('.mrcanak-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mrcanak-section">
      <style>{`
        .mrcanak-section {
          width: 100%;
          padding: 80px 60px;
          background-color: #f2f5f9;
          box-sizing: border-box;
          font-family: 'Segoe UI', Roboto, sans-serif;
        }

        .mrcanak-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .mrcanak-title {
          font-size: 36px;
          font-weight: 800;
          color: #1a1a1a;
          margin: 0;
        }

        .mrcanak-all-btn {
          background-color: #e8e3f9;
          color: #6100e0;
          border: none;
          padding: 12px 24px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mrcanak-all-btn:hover {
          background-color: #6100e0;
          color: #ffffff;
          transform: translateY(-2px);
        }

        .mrcanak-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        /* Անիմացիայի սկզբնական վիճակ (անտեսանելի և ներքևում) */
        .mrcanak-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.04);
          opacity: 0;
          transform: translateY(80px);
          transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        /* Scroll անելիս ակտիվացող դասը */
        .mrcanak-card.show-card {
          opacity: 1;
          transform: translateY(0);
        }

        .mrcanak-card:hover {
          transform: translateY(-10px) !important;
          box-shadow: 0 15px 35px rgba(97, 0, 224, 0.12);
        }

        .mrcanak-img-container {
          width: 100%;
          height: 220px;
          overflow: hidden;
        }

        .mrcanak-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .mrcanak-card:hover .mrcanak-img {
          transform: scale(1.05);
        }

        .mrcanak-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mrcanak-category {
          font-size: 13px;
          font-weight: 700;
          color: #6100e0;
          border-left: 3px solid #6100e0;
          padding-left: 8px;
        }

        .mrcanak-card-title {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.4;
          margin: 0;
          min-height: 50px;
        }

        .mrcanak-date {
          font-size: 13px;
          color: #999999;
          margin-top: 10px;
        }

        @media (max-width: 992px) {
          .mrcanak-grid {
            grid-template-columns: 1fr;
          }
          .mrcanak-section {
            padding: 40px 20px;
          }
        }
      `}</style>

      <div className="mrcanak-header">
        <h2 className="mrcanak-title">Վերջին Նորությունները</h2>
        
        {/* Կոճակը սեղմելիս տեղափոխվում է նոր էջ (օրինակ՝ /all-news) */}
        <button 
          className="mrcanak-all-btn"
          onClick={() => navigate('/all-news')}
        >
          Բոլոր Նորությունները &gt;
        </button>
      </div>

      <div className="mrcanak-grid">
        {newsData.map((item, index) => (
          <div 
            className="mrcanak-card" 
            key={item.id}
            style={{ transitionDelay: `${index * 0.15}s` }} // Քարտերը հերթով են բարձրանում
            onClick={() => navigate(`/news/${item.id}`)} // Քարտին սեղմելիս նոր էջ բացելու համար
          >
            <div className="mrcanak-img-container">
              <img src={item.img} alt={item.title} className="mrcanak-img" />
            </div>
            <div className="mrcanak-body">
              <span className="mrcanak-category">{item.category}</span>
              <h3 className="mrcanak-card-title">{item.title}</h3>
              <span className="mrcanak-date">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mrcanak; 