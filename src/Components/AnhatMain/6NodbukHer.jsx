import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';

import HeraxosImg from '../../assets/Heraxos.png';
import YerankyuniImg from '../../assets/Yerankyuni.png';
import ZigzagImg from '../../assets/Zigzag.png';
import MacbookImg from '../../assets/Macbook.png';
import MacbookmejinkarImg from '../../assets/Macbookmejinkar.png';

function NodebukHer() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "Օնլայն և մոբայլ բանկինգ",
    description: "Evocabank-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է, որն առանձնանում է տեղեկատվական նորագույն տեխնոլոգիաների ակտիվ կիրառմամբ:",
    buttonText: "Դառնալ հաճախորդ",
    qrText: "Ներբեռնել հավելվածները"
  });

  useEffect(() => {
    const nodebukRef = ref(db, '/notebookHerSection');
    const unsubscribe = onValue(nodebukRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        setData({
          title: val.title || "Օնլայն և մոբայլ բանկինգ",
          description: val.description || "Evocabank-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է, որն առանձնանում է տեղեկատվական նորագույն տեխնոլոգիաների ակտիվ կիրառմամբ:",
          buttonText: val.buttonText || "Դառնալ հաճախորդ",
          qrText: val.qrText || "Ներբեռնել հավելվածները"
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="nodebuk-her-wrapper">
      <style>{`
        @keyframes floatSlow {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(12deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        @keyframes floatReverse {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(18px) rotate(-14deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        .nodebuk-her-wrapper {
          position: relative;
          width: 100%;
          background: linear-gradient(135deg, #6100e0 0%, #6c11d9 100%);
          border-top-left-radius: 80px;
          padding: 60px 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          overflow: hidden;
          color: #ffffff;
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          min-height: 420px;
        }

        .decor-yernkyuni-1 {
          position: absolute;
          top: 10%;
          left: 2%;
          width: 65px;
          animation: floatSlow 4s ease-in-out infinite;
          user-select: none;
          pointer-events: none;
        }

        .decor-yernkyuni-2 {
          position: absolute;
          top: 15%;
          right: 4%;
          width: 60px;
          animation: floatReverse 5s ease-in-out infinite;
          user-select: none;
          pointer-events: none;
        }

        .decor-zigzag-1 {
          position: absolute;
          bottom: 10%;
          right: 3%;
          width: 75px;
          animation: floatSlow 4.5s ease-in-out infinite;
          user-select: none;
          pointer-events: none;
        }

        .decor-zigzag-2 {
          position: absolute;
          bottom: 12%;
          left: 5%;
          width: 60px;
          opacity: 0.8;
          animation: floatReverse 6s ease-in-out infinite;
          user-select: none;
          pointer-events: none;
        }

        .nodebuk-devices-container {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          width: 52%;
        }

        .macbook-wrapper {
          position: relative;
          width: 380px;
          max-width: 100%;
          filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.3));
          transition: transform 0.4s ease;
        }

        .macbook-wrapper:hover {
          transform: translateY(-6px) scale(1.02);
        }

        .macbook-img {
          width: 100%;
          height: auto;
          display: block;
        }

        .macbook-screen-img {
          position: absolute;
          top: 8.5%;
          left: 12.5%;
          width: 75%;
          height: 78%;
          object-fit: cover;
          border-radius: 4px;
        }

        .phone-img {
          width: 115px;
          height: auto;
          margin-left: -25px;
          z-index: 2;
          filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.35));
          transition: transform 0.4s ease;
        }

        .phone-img:hover {
          transform: translateY(-8px) rotate(-2deg);
        }

        .nodebuk-info-container {
          width: 44%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
          z-index: 2;
        }

        .nodebuk-title {
          font-size: 34px;
          font-weight: 800;
          margin: 0;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }

        .nodebuk-description {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          max-width: 460px;
        }

        .nodebuk-btn {
          background-color: #ffffff;
          color: #6100e0;
          border: none;
          padding: 12px 30px;
          font-size: 14px;
          font-weight: 700;
          border-radius: 25px;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .nodebuk-btn:hover {
          background-color: #f0e6ff;
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.25);
        }

        .nodebuk-app-download {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 10px;
        }

        .qr-placeholder {
          width: 60px;
          height: 60px;
          background: #ffffff;
          padding: 5px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .store-buttons {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .store-btn {
          height: 30px;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .store-btn:hover {
          opacity: 0.85;
        }

        @media (max-width: 900px) {
          .nodebuk-her-wrapper {
            flex-direction: column;
            padding: 40px 20px;
            border-top-left-radius: 40px;
            text-align: center;
          }
          .nodebuk-devices-container, .nodebuk-info-container {
            width: 100%;
            align-items: center;
          }
          .nodebuk-description {
            max-width: 100%;
          }
        }
      `}</style>

      <img src={YerankyuniImg} alt="Triangle Decor" className="decor-yernkyuni-1" />
      <img src={YerankyuniImg} alt="Triangle Decor" className="decor-yernkyuni-2" />
      <img src={ZigzagImg} alt="Zigzag Decor" className="decor-zigzag-1" />
      <img src={ZigzagImg} alt="Zigzag Decor" className="decor-zigzag-2" />

      <div className="nodebuk-devices-container">
        <div className="macbook-wrapper">
          <img src={MacbookImg} alt="Macbook" className="macbook-img" />
          <img src={MacbookmejinkarImg} alt="Macbook Screen" className="macbook-screen-img" />
        </div>
        <img src={HeraxosImg} alt="Phone" className="phone-img" />
      </div>

      <div className="nodebuk-info-container">
        <h2 className="nodebuk-title">{data.title}</h2>
        <p className="nodebuk-description">{data.description}</p>
        
        <button className="nodebuk-btn" onClick={() => navigate('/login')}>
          {data.buttonText}
        </button>

        <div className="nodebuk-app-download">
          <div className="qr-placeholder">
            <svg viewBox="0 0 24 24" fill="#6100e0" width="100%" height="100%">
              <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm8-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h3v3h-3v-3zm0 5h3v3h-3v-3zm-5-5h3v8h-3v-8z"/>
            </svg>
          </div>
          <div className="store-buttons">
            <span style={{ fontSize: '12px', opacity: 0.9 }}>{data.qrText}</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                alt="App Store" 
                className="store-btn" 
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Google Play" 
                className="store-btn" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NodebukHer;