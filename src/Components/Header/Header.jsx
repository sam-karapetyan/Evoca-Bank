import React, { useState, useEffect } from 'react';
import Headeriverev from './Headeriverev';
import Headernerqev from './Headernerqev';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .header-container {
          width: 100%;
          z-index: 1000;
        }

        .fixed-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background-color: #ffffff;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
        }
        .header-spacer {
          height: 90px; 
        }
      `}</style>

      <div className="header-container">
        {!isScrolled && <Headeriverev />}

        <div className={isScrolled ? 'fixed-header' : ''}>
          <Headernerqev />
        </div>

        {isScrolled && <div className="header-spacer" />}
      </div>
    </>
  );
}

export default Header;