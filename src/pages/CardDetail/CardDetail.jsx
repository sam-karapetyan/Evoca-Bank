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

  const otherNews = [
    {
      id: 1,
      title: 'Evocabank-ը և Green Rock-ը մեկնարկեցին Բանկի նոր գլխամասի նախագիծը',
      date: '30.07.2026',
      img: 'https://www.evoca.am/images-cache/news/1/17854167235525/428x321.png'
    },
    {
      id: 2,
      title: 'Evoca-ի ղեկավարները հաջողությամբ ավարտեցին Generative AI դասընթացը',
      date: '17.07.2026',
      img: 'https://www.evoca.am/images-cache/news/1/17842875742396/428x321.png'
    },
    {
      id: 3,
      title: 'ՊԱՐԶԱԲԱՆՈՒՄ',
      date: '05.06.2026',
      img: 'https://www.evoca.am/images-cache/news/1/17806626445767/428x321.jpg'
    }
  ];

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

          <div className="other-news-section">
            <h2 className="other-news-main-title">Այլ Նորություններ</h2>
            <div className="other-news-grid">
              {otherNews.map((news) => (
                <div key={news.id} className="news-card">
                  <div className="news-card-img-wrapper">
                    <img src={news.img} alt={news.title} className="news-card-img" />
                  </div>
                  <h3 className="news-card-title">{news.title}</h3>
                  <span className="news-card-date">{news.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;