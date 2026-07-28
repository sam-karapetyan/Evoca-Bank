import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/evocabank.png';

function Headernerqev() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');

        .HeaderNerqevContainer {
          width: 100%;
          height: 100px;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          box-sizing: border-box;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
          font-family: 'Nunito Sans', sans-serif;
        }

        .HeaderLeftSection {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .HeaderLogo {
          width: 195px;
          height: auto;
          max-height: 80px;
          object-fit: contain;
          mix-blend-mode: multiply;
        }

        .HeaderNavLinks {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .HeaderNavLink {
          font-size: 15px;
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

        .EvocaOnlineBtn {
          background-color: #6c11d9;
          color: #ffffff;
          padding: 12px 28px;
          border-radius: 30px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 800;
          white-space: nowrap;
          transition: background-color 0.2s ease, transform 0.1s ease;
        }

        .EvocaOnlineBtn:hover {
          background-color: #580cb8;
          transform: translateY(-1px);
        }
      `}</style>

      <div className="HeaderNerqevContainer">
        <div className="HeaderLeftSection">
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logoImg} alt="Evoca Logo" className="HeaderLogo" />
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

        <Link to="/online" className="EvocaOnlineBtn">
          EvocaONLINE
        </Link>
      </div>
    </>
  );
}

export default Headernerqev;