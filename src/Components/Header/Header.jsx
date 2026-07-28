import React, { useState, useEffect } from 'react';
import Headeriverev from './Headeriverev';
import Headernerqev from './Headernerqev';
import BurgerMenu from './BurgerMenu';

function Header() {
  const [showTopHeader, setShowTopHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 30) {
        setShowTopHeader(false);
      } else if (currentScrollY < lastScrollY) {
        setShowTopHeader(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <style>{`
        .StickyHeaderWrapper {
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          background-color: #ffffff;
        }

        .AnimatedTopHeader {
          max-height: ${showTopHeader ? '40px' : '0px'};
          opacity: ${showTopHeader ? '1' : '0'};
          transform: translateY(${showTopHeader ? '0px' : '-10px'});
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.3s ease-in-out,
                      transform 0.3s ease-in-out;
          overflow: hidden;
        }
      `}</style>

      <div className="StickyHeaderWrapper">
        <div className="AnimatedTopHeader">
          <Headeriverev />
        </div>
        <Headernerqev onOpenBurger={() => setIsMenuOpen(true)} />
      </div>

      <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

export default Header;