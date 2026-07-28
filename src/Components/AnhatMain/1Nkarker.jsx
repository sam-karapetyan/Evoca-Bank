import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Ճշգրտիր ուղին ըստ քո ֆայլերի դասավորության

import main1 from '../../../assets/main1.png';
import main2 from '../../../assets/main2.png';
import main3 from '../../../assets/main3.png';
import main4 from '../../../assets/main4.png';
import main5 from '../../../assets/main5.png';
import main6 from '../../../assets/main6.png';
import main7 from '../../../assets/main7.png';
import main8 from '../../../assets/main8.png';

const imagesMap = [main1, main2, main3, main4, main5, main6, main7, main8];

function Nkarker() {
  const [slidesData, setSlidesData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);

  // Հարցում Firebase-ին տվյալները ստանալու համար
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "slides"));
        const data = querySnapshot.docs.map((doc, index) => ({
          firebaseId: doc.id,
          ...doc.data(),
          img: imagesMap[index % imagesMap.length]
        }));
        
        if (data.length > 0) {
          setSlidesData(data);
        }
      } catch (error) {
        console.error("Սխալ Firebase-ից տվյալներ ստանալիս:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Ավտոմատ սլայդերի փոխարկում
  useEffect(() => {
    if (slidesData.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, slidesData]);

  const handleNext = () => {
    if (isAnimating || slidesData.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handlePrev = () => {
    if (isAnimating || slidesData.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 400);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px', color: '#6c11d9', fontWeight: 'bold' }}>Բեռնվում է Firebase-ից...</div>;
  }

  if (slidesData.length === 0) {
    return <div style={{ textAlign: 'center', padding: '50px', color: '#ff0000' }}>Տվյալներ չեն գտնվել Firestore-ում: Ստուգիր `slides` collection-ը:</div>;
  }

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
          background-color: ${currentSlide.bg || '#fde8f0'};
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
          color: ${currentSlide.textColor || '#121216'};
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .HeroDesc {
          font-size: 16px;
          color: ${currentSlide.textColor || '#121216'};
          opacity: 0.85;
          margin-bottom: 30px;
          line-height: 1.5;
        }

        .HeroBtn {
          background-color: ${currentSlide.btnBg || '#6c11d9'};
          color: ${currentSlide.btnColor || '#ffffff'};
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
          color: ${currentSlide.textColor || '#121216'};
          opacity: 0.7;
          display: flex;
          align-items: center;
          transition: opacity 0.2s ease;
        }

        .ArrowControlBtn:hover {
          opacity: 1;
        }

        .DotsContainer {
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

          <div className="DotsContainer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {slidesData.map((slide, index) => (
              <button
                key={slide.firebaseId || index}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: currentSlide.textColor || '#121216',
                  opacity: currentIndex === index ? '1' : '0.3',
                  transform: currentIndex === index ? 'scale(1.3)' : 'scale(1)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0',
                  transition: 'all 0.3s ease'
                }}
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