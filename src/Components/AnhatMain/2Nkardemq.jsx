import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';

import QR from '../../assets/QR.png';
import Demq1 from '../../assets/Demq1.png';
import Demq2 from '../../assets/Demq2.png';

function NkarDemq() {
  const [data, setData] = useState({
    title: "Դարձիր Evocabank-ի հաճախորդ բիոմետրիկ նույնականացմամբ",
    description: "Սկանավորիր QR կոդը, ներբեռնիր EvocaTOUCH հարմարավետ հավելվածը, ստեղծիր քո հաշիվը և ստացիր քարտ",
    btnText: "Իմանալ ավելին",
    btnLink: "/"
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
          btnLink: val.btnLink || prev.btnLink
        }));
      }
    });

    return () => unsubBio();
  }, []);

  return (
    <>
      <style>{`
        .bio-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 60px;
          padding: 60px 20px;
          max-width: 1200px;
          margin: 0 auto;
          background: #ffffff;
        }

        .bio-visual-box {
          position: relative;
          width: 420px;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .evoca-bg-dots {
          position: absolute;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
          background-image: radial-gradient(#6c11d9 1.5px, transparent 1.5px);
          background-size: 16px 16px;
          opacity: 0.25;
          mask-image: radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%);
          -webkit-mask-image: radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%);
        }

        .purple-triangle-bg {
          position: absolute;
          width: 0;
          height: 0;
          border-left: 170px solid transparent;
          border-right: 170px solid transparent;
          border-top: 300px solid #6c11d9;
          border-radius: 28px;
          top: 60px;
          z-index: 1;
        }

        .face-img-container {
          position: relative;
          z-index: 2;
          width: 300px;
          height: 340px;
          display: flex;
          justify-content: center;
        }

        .face-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .face-img.fade-in {
          opacity: 1;
          transform: scale(1);
        }

        .face-img.fade-out {
          opacity: 0;
          transform: scale(0.96);
        }

        .scan-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 3;
          pointer-events: none;
        }

        .scan-line {
          position: absolute;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, transparent, #ffffff, transparent);
          box-shadow: 0 0 12px #ffffff, 0 0 20px #ffffff;
          animation: scanAnimation 3s infinite ease-in-out;
        }

        @keyframes scanAnimation {
          0% { top: 15%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 85%; opacity: 0; }
        }

        .dots-glow {
          animation: pulseDots 2s infinite alternate ease-in-out;
        }

        @keyframes pulseDots {
          0% { opacity: 0.3; transform: scale(0.98); }
          100% { opacity: 0.9; transform: scale(1.02); }
        }

        .bio-info-box {
          max-width: 500px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .bio-info-title {
          font-size: 30px;
          font-weight: 700;
          color: #121216;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        .bio-info-desc {
          font-size: 15px;
          color: #555566;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .qr-and-action {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
        }

        .qr-code-image {
          width: 216px;
          height: 201px;
          object-fit: contain;
        }

        .action-btn {
          background-color: #6c11d9;
          color: #ffffff;
          border: none;
          padding: 12px 30px;
          border-radius: 25px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          box-shadow: 0 4px 15px rgba(108, 17, 217, 0.25);
        }

        .action-btn:hover {
          background-color: #580cb6;
          transform: translateY(-2px);
        }
      `}</style>

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
                onClick={() => navigate(data.btnLink || '/')}
              >
                {data.btnText}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NkarDemq;