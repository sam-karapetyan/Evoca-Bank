import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaGlobe } from 'react-icons/fa';
import { auth } from '../../firebase'; // Ճշտիր ֆայլիդ ճանապարհը
import { onAuthStateChanged, signOut } from 'firebase/auth';
import logo2Img from '../../assets/Logo2.png';
import UserMapModal from '../Header/UserMapModal';
import './Headernerqev.css';

function Headernerqev({ onOpenBurger }) {
  const [user, setUser] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        setIsMapOpen(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
    setIsMapOpen(false); 
  };

  return (
    <>
      <div className="HeaderNerqevContainer">
        <div className="HeaderLeftSection">
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo2Img} alt="Logo2" className="HeaderLogo" />
          </Link>

          <nav className="HeaderNavLinks">
            <Link to="/loans" className="HeaderNavLink">Վարկեր</Link>
            <Link to="/cards" className="HeaderNavLink">Քարտեր</Link>
            <Link to="/deposits" className="HeaderNavLink">Ավանդներ</Link>
            <Link to="/accounts" className="HeaderNavLink">Հաշիվներ</Link>
            <Link to="/transfers" className="HeaderNavLink">Փոխանցումներ</Link>
            <Link to="/investment" className="HeaderNavLink">Արժեթղթեր</Link>
            <Link to="/evoca-salary" className="HeaderNavLink">EvocaSALARY</Link>
            <Link to="/evoca-touch" className="HeaderNavLink">EvocaTOUCH</Link>
          </nav>
        </div>

        <div className="HeaderRightSection">
          {user ? (
            <div className="HeaderUserSection">
              <img 
                src={user.photoURL || 'https://via.placeholder.com/35'} 
                alt="User Avatar" 
                className="HeaderUserAvatar"
              />
              <span className="HeaderUserName">{user.displayName?.split(' ')[0]}</span>
              <button onClick={handleLogout} className="LogoutBtn">
                Դուրս գալ
              </button>
            </div>
          ) : (
            <Link to="/login" className="EvocaOnlineBtn">
              EvocaONLINE
            </Link>
          )}

          <button 
            type="button" 
            className="GlobeBtn" 
            onClick={() => setIsMapOpen(true)}
            title="Օնլայն քարտեզ"
          >
            <FaGlobe />
          </button>

          <button type="button" className="BurgerBtn" onClick={onOpenBurger}>
            <FaBars />
          </button>
        </div>
      </div>

      {isMapOpen && <UserMapModal onClose={() => setIsMapOpen(false)} />}
    </>
  );
}

export default Headernerqev;