import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import './1Nkarner.css';

import main1 from '../../assets/main1.png';
import main2 from '../../assets/main2.png';
import main3 from '../../assets/main3.png';
import main4 from '../../assets/main4.png';
import main5 from '../../assets/main5.png';
import main6 from '../../assets/main6.png';
import main7 from '../../assets/main7.png';

const imagesMap = [main1, main2, main3, main4, main5, main6, main7];

const initialSlides = [
  {
    id: 1,
    title: "Օնլայն ավանդ EvocaTOUCH հավելվածով",
    description: "Դի'ր ավանդ Evocabank-ում` բարձր, չա'տ բարձր տոկոսներով:",
    btnText: "Ծանոթանալ պայմաններին",
    btnLink: "/deposits",
    bg: "#fde8f0",
    textColor: "#121216",
    btnBg: "#6c11d9",
    btnColor: "#ffffff",
    img: main6
  },
  {
    id: 2,
    title: "UnionPay Gold",
    description: "Ամբողջ աշխարհում քո արագ և հարմար վճարումների ուղեկիցը",
    btnText: "Իմանալ ավելին",
    btnLink: "/unionpay",
    bg: "#bca84f",
    textColor: "#ffffff",
    btnBg: "#5925a2",
    btnColor: "#ffffff",
    img: main7
  },
  {
    id: 3,
    title: "Հիփոթեքային վարկեր Evocabank-ում` ամենահարմար պայմաններով",
    description: "Ձեռք բեր քո երազանքի բնակարանը` ցածր տոկոսադրույքով:",
    btnText: "Իմանալ ավելին",
    btnLink: "/mortgage",
    bg: "#e6dfff",
    textColor: "#121216",
    btnBg: "#6c11d9",
    btnColor: "#ffffff",
    img: main6
  },
  {
    id: 4,
    title: "Visa Infinite",
    description: "Ձեռք բեր Visa վճարային համակարգի ամենաբարձր դասի քարտը հենց հիմա",
    btnText: "Իմանալ ավելին",
    btnLink: "/visa-infinite",
    bg: "#000000",
    textColor: "#ffffff",
    btnBg: "#ffffff",
    btnColor: "#5925a2",
    img: main5
  },
  {
    id: 5,
    title: "Visa Vision",
    description: "Ձեռք բեր Visa Vision քարտ քո նախընտրած գույնով, դիզայնով ու ոճով և օգտվիր բազմաթիվ առավելություններից",
    btnText: "Իմանալ ավելին",
    btnLink: "/visa-vision",
    bg: "#26272b",
    textColor: "#ffffff",
    btnBg: "#ffffff",
    btnColor: "#5925a2",
    img: main4
  },
  {
    id: 6,
    title: "Evoca Աշխատավարձային Նախագիծ",
    description: "Բեր աշխատավարձդ Evoca: Տար շատ ավելին...",
    btnText: "Իմանալ ավելին",
    btnLink: "/payroll",
    bg: "#5925a2",
    textColor: "#ffffff",
    btnBg: "#ffffff",
    btnColor: "#5925a2",
    img: main2
  },
  {
    id: 7,
    title: "Կարճ հեռախոսահամար` 8444",
    description: "Բարի գալուստ, Evocabank: Մենք սպասում ենք Ձեր զանգին...",
    btnText: "Իմանալ ավելին",
    btnLink: "/contact",
    bg: "#000000",
    textColor: "#ffffff",
    btnBg: "#ffffff",
    btnColor: "#5925a2",
    img: main3
  }
];

function Nkarker() {
  const [slides, setSlides] = useState(initialSlides);
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * initialSlides.length));
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const dbRef = ref(db, '/slides');

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataArray = Array.isArray(data) ? data.filter(Boolean) : Object.values(data);

        const formattedSlides = dataArray.map((item, index) => {
          const fallback = initialSlides[index % initialSlides.length];
          return {
            ...fallback,
            ...item,
            bg: item.bg || fallback.bg,
            textColor: item.textColor || fallback.textColor,
            btnBg: item.btnBg || fallback.btnBg,
            btnColor: item.btnColor || fallback.btnColor,
            img: imagesMap[index % imagesMap.length]
          };
        });

        setSlides(formattedSlides);
      }
    });

    return () => unsubscribe();
  }, []);

  const changeSlide = (newIndex) => {
    setFade(false); 
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFade(true); 
    }, 250);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % slides.length;
    changeSlide(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + slides.length) % slides.length;
    changeSlide(prevIdx);
  };

  const current = slides[currentIndex] || slides[0];

  return (
    <div 
      className="nkarker-slider-container"
      style={{ 
        backgroundColor: current.bg || '#000000', 
        color: current.textColor || '#ffffff'
      }}
    >
      <div 
        className="nkarker-content-wrapper animate-content"
        style={{ 
          opacity: fade ? 1 : 0,
          transform: fade ? 'translateY(0px)' : 'translateY(12px)'
        }}
      >
        <div className="nkarker-text-section">
          <h1 className="nkarker-title">
            {current.title}
          </h1>
          <p className="nkarker-description">
            {current.description}
          </p>
          {current.btnText && (
            <button 
              className="nkarker-btn"
              onClick={() => navigate(`/slide/${current.id}`, { state: { slide: current } })}
              style={{ 
                backgroundColor: current.btnBg || '#ffffff', 
                color: current.btnColor || '#5925a2'
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.96)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {current.btnText}
            </button>
          )}
        </div>

        <div className="nkarker-img-section">
          {current.img && (
            <img 
              src={current.img} 
              alt={current.title} 
              className="nkarker-image"
            />
          )}
        </div>
      </div>

      <div className="nkarker-dots-wrapper">
        <FaArrowLeft 
          onClick={handlePrev} 
          style={{ cursor: 'pointer', fontSize: '16px', opacity: 0.8, color: current.textColor || '#fff' }} 
        />
        
        {slides.map((_, idx) => (
          <span 
            key={idx}
            onClick={() => changeSlide(idx)}
            style={{
              width: idx === currentIndex ? '8px' : '5px',
              height: idx === currentIndex ? '8px' : '5px',
              borderRadius: '50%',
              backgroundColor: current.textColor || '#ffffff',
              opacity: idx === currentIndex ? 1 : 0.35,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}

        <FaArrowRight 
          onClick={handleNext} 
          style={{ cursor: 'pointer', fontSize: '16px', opacity: 0.8, color: current.textColor || '#fff' }} 
        />
      </div>
    </div>
  );
}

export default Nkarker;