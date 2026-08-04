import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DzerqImg from '../../assets/Dzerq.png';

const logos = [
  { id: 1, img: 'https://www.evoca.am/images-cache/partners/1/17104032198171/348x150_grayscale.png', name: "Chip Store" },
  { id: 2, img: 'https://www.evoca.am/images-cache/partners/1/17077436606929/348x150_grayscale.png', name: "Fab Lab" },
  { id: 3, img: 'https://www.evoca.am/images-cache/partners/1/17107493820339/348x150_grayscale.png', name: "IMR" },
  { id: 4, img: 'https://www.evoca.am/images-cache/partners/1/17072192942611/348x150_grayscale.png', name: "Dignisi" },
  { id: 5, img: 'https://www.evoca.am/images-cache/partners/1/17072192635138/348x150_grayscale.png', name: "Wizzy" },
  { id: 6, img: 'https://www.evoca.am/images-cache/partners/1/17072192435541/348x150_grayscale.png', name: "Kamo Blog" },
  { id: 7, img: 'https://www.evoca.am/images-cache/partners/1/16104577054001/348x150_grayscale.png', name: "Dalma" },
  { id: 8, img: 'https://www.evoca.am/images-cache/partners/1/16104583322099/348x150_grayscale.png', name: "Nor Tun" }
];

function Gortsynkerner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setVisibleCount(1);
      } else if (window.innerWidth < 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + logos.length) % logos.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const getVisibleLogos = () => {
    const items = [];
    for (let i = 0; i < visibleCount; i++) {
      items.push(logos[(currentIndex + i) % logos.length]);
    }
    return items;
  };

  return (
    <div className="gortsynkerner-container">
      <style>{`
        @keyframes rotateDots {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .gortsynkerner-container {
          width: 100%;
          padding: 80px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #ffffff;
          box-sizing: border-box;
          font-family: 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
        }

        .gortsynkerner-left {
          width: 32%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
        }

        .gortsynkerner-title {
          font-size: 38px;
          font-weight: 800;
          color: #1a1a1a;
          margin: 0;
        }

        .gortsynkerner-text {
          font-size: 14px;
          line-height: 1.7;
          color: #555555;
          margin: 0;
        }

        .gortsynkerner-btn {
          background-color: #f1e9ff;
          color: #6100e0;
          border: none;
          padding: 12px 24px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .gortsynkerner-btn:hover {
          background-color: #6100e0;
          color: #ffffff;
          transform: translateY(-2px);
        }

        .gortsynkerner-center {
          position: relative;
          width: 25%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dots-bg {
          position: absolute;
          width: 260px;
          height: 260px;
          animation: rotateDots 20s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .hand-img {
          width: 160px;
          height: auto;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));
        }

        .gortsynkerner-right {
          width: 40%;
          position: relative;
          display: flex;
          align-items: center;
          background: #f8f9fa;
          padding: 20px 10px;
          border-radius: 20px;
        }

        .arrow-btn {
          background: none;
          border: none;
          font-size: 24px;
          color: #6100e0;
          cursor: pointer;
          padding: 10px;
          z-index: 3;
          transition: transform 0.2s ease;
        }

        .arrow-btn:hover {
          transform: scale(1.2);
        }

        .slider-viewport {
          width: 100%;
          overflow: hidden;
        }

        .slider-track {
          display: flex;
          gap: 15px;
          justify-content: space-around;
        }

        .logo-card {
          flex: 1;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border-radius: 12px;
          padding: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }

        .logo-card img {
          max-width: 85%;
          max-height: 65%;
          object-fit: contain;
        }

        @media (max-width: 992px) {
          .gortsynkerner-container {
            flex-direction: column;
            gap: 40px;
            padding: 40px 20px;
          }
          .gortsynkerner-left, .gortsynkerner-center, .gortsynkerner-right {
            width: 100%;
            text-align: center;
          }
          .gortsynkerner-left {
            align-items: center;
          }
        }

        @media (max-width: 440px) {
          .gortsynkerner-title {
            font-size: 28px;
          }
          .dots-bg {
            width: 200px;
            height: 200px;
          }
          .hand-img {
            width: 120px;
          }
          .gortsynkerner-right {
            padding: 10px 5px;
          }
        }
      `}</style>

      <div className="gortsynkerner-left">
        <h2 className="gortsynkerner-title">Գործընկերներ</h2>
        <p className="gortsynkerner-text">
          Դարձեք Evocabank-ի Գործընկեր և եկեք միասին գնանք դեպի գունեղ նոր իրականություն: 
          Դառնալով Evoca ընտանիքի անդամ՝ Դուք մուտք կգործեք ժամանակակից և յուրահատուկ աշխարհ: 
          Մենք միշտ բաց ենք հետաքրքիր առաջարկների ու համագործակցությունների համար:
        </p>
        
        {/* React Router Link navigation-ի համար */}
        <Link to="/partners" style={{ textDecoration: 'none' }}>
          <button className="gortsynkerner-btn">
            Բոլոր գործընկերները &gt;
          </button>
        </Link>
      </div>

      <div className="gortsynkerner-center">
        <svg className="dots-bg" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" stroke="#fbc02d" strokeWidth="2" strokeDasharray="3 8" fill="none" />
          <circle cx="100" cy="100" r="75" stroke="#fbc02d" strokeWidth="2" strokeDasharray="3 8" fill="none" />
          <circle cx="100" cy="100" r="60" stroke="#fbc02d" strokeWidth="2" strokeDasharray="3 8" fill="none" />
        </svg>

        <img src={DzerqImg} alt="Hand" className="hand-img" />
      </div>

      <div className="gortsynkerner-right">
        <button className="arrow-btn" onClick={prevSlide}>
          &lt;
        </button>

        <div className="slider-viewport">
          <div className="slider-track">
            {getVisibleLogos().map((logo, idx) => (
              <div className="logo-card" key={`${logo.id}-${idx}`}>
                <img src={logo.img} alt={logo.name} />
              </div>
            ))}
          </div>
        </div>

        <button className="arrow-btn" onClick={nextSlide}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Gortsynkerner;