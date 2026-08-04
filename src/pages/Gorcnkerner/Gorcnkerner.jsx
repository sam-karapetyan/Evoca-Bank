import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Gorcnkerner.css';
import DzerqImg from '../../assets/Dzerq.png';

const partnersList = [
  { id: 1, name: 'Chip Store', img: 'https://www.evoca.am/images-cache/partners/1/17104032198171/348x150_grayscale.png' },
  { id: 2, name: 'Fab Lab Armenia', img: 'https://www.evoca.am/images-cache/partners/1/17077436606929/348x150_grayscale.png' },
  { id: 3, name: 'IMR International', img: 'https://www.evoca.am/images-cache/partners/1/17107493820339/348x150_grayscale.png' },
  { id: 4, name: 'Dignisi', img: 'https://www.evoca.am/images-cache/partners/1/17072192942611/348x150_grayscale.png' },
  { id: 5, isCenterHand: true }, // Մեջտեղի ձեռքի նկարը
  { id: 6, name: 'Wizzy Kids Club', img: 'https://www.evoca.am/images-cache/partners/1/17072192635138/348x150_grayscale.png' },
  { id: 7, name: 'Kamo Blog', img: 'https://www.evoca.am/images-cache/partners/1/17072192435541/348x150_grayscale.png' },
  { id: 8, name: 'Dalma Garden Mall', img: 'https://www.evoca.am/images-cache/partners/1/16104577054001/348x150_grayscale.png' },
  { id: 9, name: 'Nor Tun', img: 'https://www.evoca.am/images-cache/partners/1/16104583322099/348x150_grayscale.png' },
];

function GorcnkernerPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="partners-page-container">
      
      {/* Վերևի Sub-Header Նավիգացիան (React Router Link-երով) */}
      <div className="partners-sub-header">
        <div className="partners-sub-header-inner">
          <Link to="/about-general" className="sub-nav-item">Ընդհանուր</Link>
          <Link to="/structure" className="sub-nav-item">Կառուցվածք</Link>
          <Link to="/shareholders" className="sub-nav-item">Բաժնետերեր</Link>
          <Link to="/management" className="sub-nav-item">Ղեկավարություն</Link>
          <Link to="/partners" className="sub-nav-item active">Գործընկերներ</Link>
          <Link to="/awards" className="sub-nav-item">Մրցանակներ</Link>
          <Link to="/reviews" className="sub-nav-item">Կարծիքներ</Link>
          <Link to="/csr" className="sub-nav-item">CSR</Link>
        </div>
      </div>

      <div className="partners-content">
        {/* Breadcrumb path */}
        <div className="partners-breadcrumb">
          <span><Link to="/">🏠</Link> &gt; Մեր մասին &gt; Evoca-ի մասին &gt; </span>
          <strong>Գործընկերներ</strong>
        </div>

        <h1 className="partners-main-title">Գործընկերներ</h1>

        {/* 3x3 Grid (9 բլոկ) */}
        <div className="partners-grid">
          {partnersList.map((item) => {
            if (item.isCenterHand) {
              return (
                <div key={item.id} className="partner-card center-hand-card">
                  <div className="center-hand-wrapper">
                    <svg className="dots-circle-svg" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="90" stroke="#fbc02d" strokeWidth="2" strokeDasharray="4 8" fill="none" />
                      <circle cx="100" cy="100" r="75" stroke="#fbc02d" strokeWidth="2" strokeDasharray="4 8" fill="none" />
                      <circle cx="100" cy="100" r="60" stroke="#fbc02d" strokeWidth="2" strokeDasharray="4 8" fill="none" />
                    </svg>
                    <img src={DzerqImg} alt="Evoca Hand" className="center-hand-img" />
                    <span className="purple-triangle-icon">▲</span>
                    <span className="blue-zigzag-icon">〰</span>
                  </div>
                </div>
              );
            }

            return (
              <div key={item.id} className="partner-card">
                <img src={item.img} alt={item.name} className="partner-logo-img" />
              </div>
            );
          })}
        </div>

        {/* Էջադրում (Pagination) */}
        <div className="partners-pagination">
          <button className="pagination-arrow prev-arrow">&larr;</button>
          <span className="pagination-page active-page">1</span>
          <span className="pagination-page">2</span>
          <button className="pagination-arrow next-arrow">&rarr;</button>
        </div>
      </div>

    </div>
  );
}

export default GorcnkernerPage;