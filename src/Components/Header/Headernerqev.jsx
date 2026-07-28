import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import logo2Img from '../../assets/Logo2.png';

function Headernerqev({ onOpenBurger }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');

        .HeaderNerqevContainer {
          width: 100%;
          height: 90px;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          box-sizing: border-box;
          font-family: 'Nunito Sans', sans-serif;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.06);
          transition: box-shadow 0.3s ease;
        }

        .HeaderLeftSection {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .HeaderLogo {
          width: 55px;
          height: auto;
          max-height: 50px;
          object-fit: contain;
        }

        .HeaderNavLinks {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .HeaderNavLink {
          font-size: 14px;
          font-weight: 800;
          color: #121216;
          text-decoration: none;
          letter-spacing: -0.2px;
          transition: color 0.2s ease;
          white-space: nowrap;
        }

        .HeaderNavLink:hover {
          color: #a855f7;
        }

        .HeaderRightSection {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .EvocaOnlineBtn {
          background-color: #6c11d9;
          color: #ffffff;
          padding: 10px 24px;
          border-radius: 30px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 800;
          white-space: nowrap;
          transition: background-color 0.2s ease, transform 0.1s ease;
        }

        .EvocaOnlineBtn:hover {
          background-color: #580cb8;
          transform: translateY(-1px);
        }

        .BurgerBtn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 20px;
          color: #121216;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          transition: color 0.2s ease;
        }

        .BurgerBtn:hover {
          color: #6c11d9;
        }
      `}</style>

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
          <Link to="/online" className="EvocaOnlineBtn">
            EvocaONLINE
          </Link>
          <button className="BurgerBtn" onClick={onOpenBurger}>
            <FaBars />
          </button>
        </div>
      </div>
    </>
  );
}

export default Headernerqev;