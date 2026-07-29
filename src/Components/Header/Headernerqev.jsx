import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { auth } from '../../firebase'; // Ճշտիր ֆայլիդ ճանապարհը (src/firebase.js)
import { onAuthStateChanged, signOut } from 'firebase/auth';
import logo2Img from '../../assets/Logo2.png';
import './Headernerqev.css';

function Headernerqev({ onOpenBurger }) {
  const [user, setUser] = useState(null);

  // Ստուգում ենք՝ արդյոք օգտատերը մուտք է գործել
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Դուրս գալու ֆունկցիա
  const handleLogout = () => {
    signOut(auth);
  };

  return (
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
          /* Եթե մուտք է գործել */
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
          /* Եթե մուտք չի գործել */
          <Link to="/login" className="EvocaOnlineBtn">
            EvocaONLINE
          </Link>
        )}

        <button type="button" className="BurgerBtn" onClick={onOpenBurger}>
          <FaBars />
        </button>
      </div>
    </div>
  );
}

export default Headernerqev;