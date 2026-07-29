import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mrcanak.css'; // Import ենք անում CSS-ը

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
      <div className="mrcanak-header">
        <h2 className="mrcanak-title">Վերջին Նորությունները</h2>
        
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
            style={{ transitionDelay: `${index * 0.15}s` }}
            onClick={() => navigate(`/news/${item.id}`)}
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