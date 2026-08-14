import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaGlobe } from 'react-icons/fa';
import { auth } from '../../firebase';
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
            <NavLink to="/loans" className={({ isActive }) => isActive ? "HeaderNavLink active" : "HeaderNavLink"}>
              Վարկեր
            </NavLink>
            <NavLink to="/cards" className={({ isActive }) => isActive ? "HeaderNavLink active" : "HeaderNavLink"}>
              Քարտեր
            </NavLink>
            <NavLink to="/deposits" className={({ isActive }) => isActive ? "HeaderNavLink active" : "HeaderNavLink"}>
              Ավանդներ
            </NavLink>
            <NavLink to="/accounts" className={({ isActive }) => isActive ? "HeaderNavLink active" : "HeaderNavLink"}>
              Հաշիվներ
            </NavLink>
            <NavLink to="/transfers" className={({ isActive }) => isActive ? "HeaderNavLink active" : "HeaderNavLink"}>
              Փոխանցումներ
            </NavLink>
            
            {/* 📌 ՈՒՂՂՎԱԾ Է․ /investment -> /securities */}
            <NavLink to="/securities" className={({ isActive }) => isActive ? "HeaderNavLink active" : "HeaderNavLink"}>
              Արժեթղթեր
            </NavLink>

            <NavLink to="/evoca-salary" className={({ isActive }) => isActive ? "HeaderNavLink active" : "HeaderNavLink"}>
              EvocaSALARY
            </NavLink>
            <NavLink to="/evoca-touch" className={({ isActive }) => isActive ? "HeaderNavLink active" : "HeaderNavLink"}>
              EvocaTOUCH
            </NavLink>
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