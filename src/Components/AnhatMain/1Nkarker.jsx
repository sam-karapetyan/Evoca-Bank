import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import main1 from '../../assets/main1.png';
import main2 from '../../assets/main2.png';
import main3 from '../../assets/main3.png';
import main4 from '../../assets/main4.png';
import main5 from '../../assets/main5.png';
import main6 from '../../assets/main6.png';
import main7 from '../../assets/main7.png';
import main8 from '../../assets/main8.png';

const slidesData = [
  {
    id: 1,
    title: 'Օնլայն ավանդ EvocaTOUCH հավելվածով',
    description: 'Դի\'ր ավանդ Evocabank-ում բարձր, շա\'տ բարձր տոկոսներով:',
    btnText: 'Ծանոթանալ պայմաններին',
    btnLink: '/deposits',
    bg: '#fde8f0',
    textColor: '#121216',
    btnBg: '#6c11d9',
    btnColor: '#ffffff',
    img: main1,
  },
  {
    id: 2,
    title: 'Evoca Travel Card',
    description: 'Այս քարտն իր բազմաթիվ առավելություններով կդառնա քո ճամփորդական անբաժան ընկերը:',
    btnText: 'Իմանալ ավելին',
    btnLink: '/travel-card',
    bg: '#e4e4e7',
    textColor: '#121216',
    btnBg: '#6c11d9',
    btnColor: '#ffffff',
    img: main2,
  },
  {
    id: 3,
    title: 'Evoca Աշխատավարձային նախագիծ',
    description: 'Բեր աշխատավարձդ Evoca: Տար շատ ավելին...',
    btnText: 'Իմանալ ավելին',
    btnLink: '/salary-project',
    bg: '#6400DC',
    textColor: '#ffffff',
    btnBg: '#ffffff',
    btnColor: '#6c11d9',
    img: main3,
  },
  {
    id: 4,
    title: 'Առցանց վարկեր ակնթարթորեն',
    description: 'Ստացիր վարկ առանց բանկ գնալու, ուղղակիորեն հավելվածից:',
    btnText: 'Ստանալ վարկ',
    btnLink: '/loans',
    bg: '#e0f2fe',
    textColor: '#0f172a',
    btnBg: '#0284c7',
    btnColor: '#ffffff',
    img: main4,
  },
  {
    id: 5,
    title: 'Evoca Cashback Քարտեր',
    description: 'Վճարիր քարտով և ստացիր գումարի մի մասը ետ՝ Cashback-ի տեսքով:',
    btnText: 'Պատվիրել քարտ',
    btnLink: '/cards',
    bg: '#fef3c7',
    textColor: '#1f2937',
    btnBg: '#d97706',
    btnColor: '#ffffff',
    img: main5,
  },
  {
    id: 6,
    title: 'Բիզնես վարկեր ձեր հաջողության համար',
    description: 'Զարգացրեք ձեր բիզնեսը մեր նոր և շահավետ վարկային պայմաններով:',
    btnText: 'Բիզնեսի համար',
    btnLink: '/business',
    bg: '#ede9fe',
    textColor: '#2e1065',
    btnBg: '#7c3aed',
    btnColor: '#ffffff',
    img: main6,
  },
  {
    id: 7,
    title: 'Անվտանգ և արագ փոխանցումներ',
    description: 'Կատարեք աշխարհի ցանկացած կետ արագ և ապահով դրամական փոխանցումներ:',
    btnText: 'Փոխանցել',
    btnLink: '/transfers',
    bg: '#ccfbf1',
    textColor: '#042f2e',
    btnBg: '#0d9488',
    btnColor: '#ffffff',
    img: main7,
  },
  {
    id: 8,
    title: 'Արժեթղթեր և Ներդրումներ',
    description: 'Կատարեք շահավետ ներդրումներ և աճեցրեք ձեր կապիտալը մեզ հետ:',
    btnText: 'Ներդրումներ',
    btnLink: '/investments',
    bg: '#ffedd5',
    textColor: '#431407',
    btnBg: '#c2410c',
    btnColor: '#ffffff',
    img: main8,
  },
];

function Nkarker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Ավտոմատ փոխարկում (Slide rotation) յուրաքանչյուր 5 վայրկյանը մեկ
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 400);
  };

  const currentSlide = slidesData[currentIndex];

  return (
    <>
      <style>{`
        .HeroSliderContainer {
          width: 100%;
          height: 480px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 80px;
          box-sizing: border-box;
          background-color: ${currentSlide.bg};
          transition: background-color 0.6s ease-in-out;
          font-family: 'Nunito Sans', sans-serif;
          overflow: hidden;
          border-bottom-left-radius: 40px;
        }

        .HeroContent {
          max-width: 550px;
          z-index: 2;
          opacity: ${isAnimating ? 0 : 1};
          transform: translateY(${isAnimating ? '15px' : '0px'});
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .HeroTitle {
          font-size: 42px;
          font-weight: 800;
          color: ${currentSlide.textColor};
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .HeroDesc {
          font-size: 16px;
          color: ${currentSlide.textColor};
          opacity: 0.85;
          margin-bottom: 30px;
          line-height: 1.5;
        }

        .HeroBtn {
          background-color: ${currentSlide.btnBg};
          color: ${currentSlide.btnColor};
          padding: 12px 28px;
          border-radius: 30px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 700;
          display: inline-block;
          box-shadow: 0px 4px 15px rgba(0,0,0,0.1);
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .HeroBtn:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }

        .HeroImageWrapper {
          max-width: 500px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          opacity: ${isAnimating ? 0 : 1};
          transform: scale(${isAnimating ? '0.95' : '1'});
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .HeroImage {
          max-width: 100%;
          max-height: 380px;
          object-fit: contain;
        }

        /* Controls & Dots at bottom */
        .SliderControlsBar {
          position: absolute;
          bottom: 25px;
          left: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          z-index: 10;
        }

        .ArrowControlBtn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 18px;
          color: ${currentSlide.textColor};
          opacity: 0.7;
          display: flex;
          align-items: center;
          transition: opacity 0.2s ease;
        }

        .ArrowControlBtn:hover {
          opacity: 1;
        }

        .DotsContainer {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .Dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: ${currentSlide.textColor};
          opacity: 0.3;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .Dot.activeDot {
          opacity: 1;
          transform: scale(1.3);
        }
      `}</style>

      <div className="HeroSliderContainer">
        <div className="HeroContent">
          <h1 className="HeroTitle">{currentSlide.title}</h1>
          <p className="HeroDesc">{currentSlide.description}</p>
          <a href={currentSlide.btnLink} className="HeroBtn">
            {currentSlide.btnText}
          </a>
        </div>

        <div className="HeroImageWrapper">
          <img src={currentSlide.img} alt="Slide Visual" className="HeroImage" />
        </div>

        <div className="SliderControlsBar">
          <button className="ArrowControlBtn" onClick={handlePrev}>
            <FaChevronLeft />
          </button>

          <div className="DotsContainer">
            {slidesData.map((slide, index) => (
              <button
                key={slide.id}
                className={`Dot ${currentIndex === index ? 'activeDot' : ''}`}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 400);
                  }
                }}
              />
            ))}
          </div>

          <button className="ArrowControlBtn" onClick={handleNext}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </>
  );
}

export default Nkarker;