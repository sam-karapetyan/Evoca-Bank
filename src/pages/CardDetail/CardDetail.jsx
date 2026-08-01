import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import cardsData from '../../data/cardsData';
import './CardDetail.css';

function CardDetail() {
  const { cardId } = useParams();
  const [activeTab, setActiveTab] = useState('cards');

  const defaultCard = {
    title: 'Evoca Travel Card',
    subtitle: 'Սիրո՞ւմ եմ ճամփորդել. ուրեմն ժամանակն է ձեռք բերելու Evoca Mastercard Travel Card, որը կդառնա քո ճամփորդական անբաժան ընկերը:',
    img: ''
  };

  const card = (cardsData && cardId && cardsData[cardId]) 
    || (cardsData && cardsData['evoca-travel-card']) 
    || defaultCard;

  return (
    <div className="card-detail-page">
      <div className="card-detail-subnav">
        <div className="card-subnav-inner">
          <button 
            className={`subnav-tab ${activeTab === 'cards' ? 'active' : ''}`}
            onClick={() => setActiveTab('cards')}
          >
            Քարտեր
          </button>
          <button 
            className={`subnav-tab ${activeTab === 'service' ? 'active' : ''}`}
            onClick={() => setActiveTab('service')}
          >
            Քարտերի տրամադրում և սպասարկում
          </button>
          <button 
            className={`subnav-tab ${activeTab === 'social' ? 'active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            Սոցիալական ապահովության վճարային քարտեր
          </button>
          <button 
            className={`subnav-tab ${activeTab === 'benefits' ? 'active' : ''}`}
            onClick={() => setActiveTab('benefits')}
          >
            Evoca Benefits
          </button>
        </div>
      </div>

      <div className="card-hero-container">
        <div className="card-hero-wrapper">
          <div className="card-hero-text">
            <h1 className="card-hero-title">{card?.title}</h1>
            <p className="card-hero-description">{card?.subtitle}</p>
          </div>

          <div className="card-hero-media">
            {card?.img && (
              <img src={card.img} alt={card.title} className="card-hero-img" />
            )}
          </div>
        </div>

        <div className="hero-bottom-curve">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,0 C320,100 600,120 1440,0 L1440,120 L0,120 Z" fill="#ffffff"></path>
          </svg>
        </div>
      </div>

      <div className="card-content-section">
        <div className="card-content-container">
          <div className="card-content-header-purple">
            <p className="purple-italic-title">Բարի գալուստ, Evocabank</p>
            <p className="purple-italic-subtitle">Մենք սպասում էինք Ձեր զանգին...</p>
          </div>

          <div className="card-content-body">
            <p>
              Այսուհետ <strong>Evocabank</strong>-ի հաճախորդներն ավելի հեշտ ու արագ կարող են կապ հաստատել Բանկի հետ` պարզապես հավաքելով <strong>8444</strong> քաղաքային կամ բջջային հեռախոսներից:
            </p>
            <p>
              Հիշեցնենք նաև, որ <strong>Evocabank</strong>-ի հետ կարող եք նաև կապ հաստատել <span className="highlight-purple">+37410605555</span> հեռախոսահամարով: Իսկ արտասահմանից զանգահարելիս` գործում է միայն <span className="highlight-purple">+37410605555</span> հեռախոսահամարը:
            </p>
          </div>

          <div className="card-content-footer-title">
            <h2>Այլ Նորություններ</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;