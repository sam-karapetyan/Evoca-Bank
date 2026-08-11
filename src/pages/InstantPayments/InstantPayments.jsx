import React from 'react';
import { FaGlobe, FaPhoneAlt, FaHistory } from 'react-icons/fa';
import './InstantPayments.css';

const paymentCategories = [
  {
    id: 1,
    title: "EVOCABANK",
    isPurpleTitle: true,
    image: "https://resource.evoca.am/images/WebPayment/evoca.png"
  },
  {
    id: 2,
    title: "Միջազգային բջջային օպերատորներ",
    image: "https://resource.evoca.am/images/WebPayment/international.png"
  },
  {
    id: 3,
    title: "Կոմունալ վճարումներ",
    image: "https://resource.evoca.am/images/WebPayment/utility.png"
  },
  {
    id: 4,
    title: "Ինտերնետ և TV",
    image: "https://resource.evoca.am/images/WebPayment/internettv.png"
  },
  {
    id: 5,
    title: "ՃՈ վճարներ",
    image: "https://resource.evoca.am/images/WebPayment/roadpolice.png"
  },
  {
    id: 6,
    title: "Վարկային կազմակերպություններ",
    image: "https://resource.evoca.am/images/WebPayment/loan.png"
  },
  {
    id: 7,
    title: "Միջոցառումներ",
    image: "https://resource.evoca.am/images/WebPayment/event.png"
  }
];

function InstantPayments() {
  return (
    <div className="instant-payments-wrapper">
      {/* 1. Top WebPayment Bar */}
      <div className="webpayment-sub-header">
        <div className="webpayment-header-container">
          <div className="webpayment-logo-section">
            <span className="webpayment-logo-text">evoca</span>
            <span className="webpayment-tagline">Online payment</span>
          </div>

          <div className="webpayment-header-right">
            <a href="tel:+37410605555" className="webpayment-phone">
              <FaPhoneAlt className="phone-icon" /> +374 10 605555
            </a>
            <button className="webpayment-lang-btn" title="Լեզու">
              <FaGlobe />
            </button>
            <button className="webpayment-history-btn">
              <FaHistory className="history-icon" /> Պատմություն
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Payment Grid Content */}
      <div className="webpayment-main-content">
        <h1 className="webpayment-main-title">Գլխավոր</h1>

        <div className="webpayment-cards-grid">
          {paymentCategories.map((item) => (
            <div key={item.id} className="webpayment-card">
              <div className="webpayment-card-img-wrapper">
                <img src={item.image} alt={item.title} />
              </div>
              <h3 className={`webpayment-card-title ${item.isPurpleTitle ? 'purple-title' : ''}`}>
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InstantPayments;