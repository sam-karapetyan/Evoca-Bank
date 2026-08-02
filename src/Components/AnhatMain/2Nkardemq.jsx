import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import './2Nkardemq.css'; 

import QR from '../../assets/QR.png';
import Demq1 from '../../assets/Demq1.png';
import Demq2 from '../../assets/Demq2.png';

function NkarDemq() {
  const [data, setData] = useState({
    title: "Դարձիր Evocabank-ի հաճախորդ բիոմետրիկ նույնականացմամբ",
    description: "Սկանավորիր QR կոդը, ներբեռնիր EvocaTOUCH հարմարավետ հավելվածը, ստեղծիր քո հաշիվը և ստացիր քարտ",
    btnText: "Իմանալ ավելին",
    btnLink: "/biometric"
  });

  const [currentFace, setCurrentFace] = useState(0);
  const [fade, setFade] = useState(true);
  const faces = [Demq1, Demq2];

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentFace((prev) => (prev === 0 ? 1 : 0));
        setFade(true);
      }, 800);

    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const bioRef = ref(db, '/biometric');
    const unsubBio = onValue(bioRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        setData((prev) => ({
          ...prev,
          title: val.title || prev.title,
          description: val.description || prev.description,
          btnText: val.btnText !== undefined ? val.btnText : prev.btnText,
          btnLink: (val.btnLink && val.btnLink !== '/') ? val.btnLink : '/biometric'
        }));
      }
    });

    return () => unsubBio();
  }, []);

  const handleNavigate = () => {
    navigate(data.btnLink || '/biometric');
  };

  return (
    <div className="bio-wrapper">
      <div className="bio-visual-box">
        <div className="evoca-bg-dots"></div>
        <div className="purple-triangle-bg"></div>

        <div className="face-img-container">
          <img 
            src={faces[currentFace]} 
            alt="Biometric Face" 
            className={`face-img ${fade ? 'fade-in' : 'fade-out'}`}
          />

          <div className="scan-overlay">
            <div className="scan-line"></div>

            <svg className="dots-glow" width="100%" height="100%" viewBox="0 0 200 240" fill="none">
              <circle cx="100" cy="50" r="2.5" fill="#ffffff" />
              <circle cx="70" cy="90" r="2.5" fill="#ffffff" />
              <circle cx="130" cy="90" r="2.5" fill="#ffffff" />
              <circle cx="85" cy="115" r="2" fill="#ffffff" />
              <circle cx="115" cy="115" r="2" fill="#ffffff" />
              <circle cx="100" cy="135" r="2.5" fill="#ffffff" />
              <circle cx="85" cy="165" r="2" fill="#ffffff" />
              <circle cx="115" cy="165" r="2" fill="#ffffff" />
              <circle cx="100" cy="180" r="2.5" fill="#ffffff" />

              <path d="M 70 90 L 100 50 L 130 90 L 115 115 L 100 135 L 85 115 Z" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.6" strokeDasharray="2 2" />
              <path d="M 85 165 L 100 180 L 115 165 L 100 135 Z" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.6" strokeDasharray="2 2" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bio-info-box">
        <h2 className="bio-info-title">{data.title}</h2>
        <p className="bio-info-desc">{data.description}</p>

        <div className="qr-and-action">
          <img src={QR} alt="Evoca QR Code" className="qr-code-image" />
          
          {data.btnText && (
            <button 
              className="action-btn"
              onClick={handleNavigate}
            >
              {data.btnText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NkarDemq;