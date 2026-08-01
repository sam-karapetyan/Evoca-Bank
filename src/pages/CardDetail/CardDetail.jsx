import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../firebase';
import { ref, get, child } from 'firebase/database';
import './CardDetail.css';

const defaultNewsList = [
  {
    id: '1',
    title: 'Evocabank-ը և Green Rock-ը մեկնարկեցին Բանկի նոր գլխամասի նախագիծը',
    date: '30.07.2026',
    img: 'https://www.evoca.am/images-cache/news/1/17854167235525/428x321.png'
  },
  {
    id: '2',
    title: 'Evoca-ի ղեկավարները հաջողությամբ ավարտեցին Generative AI դասընթացը',
    date: '17.07.2026',
    img: 'https://www.evoca.am/images-cache/news/1/17842875742396/428x321.png'
  },
  {
    id: '3',
    title: 'ՊԱՐԶԱԲԱՆՈՒՄ',
    date: '05.06.2026',
    img: 'https://www.evoca.am/images-cache/news/1/17806626445767/428x321.jpg'
  }
];

function CardDetail() {
  const { cardId } = useParams(); 
  const [activeTab, setActiveTab] = useState('cards');
  
  const [card, setCard] = useState(null);
  const [otherNews, setOtherNews] = useState(defaultNewsList);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dbRef = ref(db);

      try {
        const cardSnapshot = await get(child(dbRef, `cards/${cardId}`));
        if (cardSnapshot.exists()) {
          setCard(cardSnapshot.val());
        } else {
          setCard({
            title: 'Evoca Travel Card',
            subtitle: 'Սիրո՞ւմ եմ ճամփորդել. ուրեմն ժամանակն է ձեռք բերելու Evoca Mastercard Travel Card...',
            img: ''
          });
        }

        const newsSnapshot = await get(child(dbRef, 'news'));
        if (newsSnapshot.exists()) {
          const newsData = newsSnapshot.val();
          const newsArray = Object.keys(newsData).map(key => ({
            id: key,
            ...newsData[key]
          }));
          if (newsArray.length > 0) {
            setOtherNews(newsArray);
          }
        }
      } catch (error) {
        console.error("Firebase-ից տվյալներ բեռնելու սխալ:", error);
      } finally {
        setLoading(false);
      }
    };

    if (cardId) {
      fetchData();
    }
  }, [cardId]); 

  if (loading) {
    return <div className="loading">Բեռնվում է...</div>;
  }

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
            <p className="card-hero-description">{card?.subtitle || card?.description}</p>
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
              Հիշեցնենք նաև, որ <strong>Evocabank</strong>-ի հետ կարող եք նաև կապ հաստատել <span className="highlight-purple">+37410605555</span> հեռախոսահամարով:
            </p>
          </div>

          <div className="other-news-section">
            <h2 className="other-news-main-title">Այլ Նորություններ</h2>
            <div className="other-news-grid">
              {otherNews.map((news) => (
                <Link key={news.id} to={`/news/${news.id}`} className="news-card">
                  <div className="news-card-img-wrapper">
                    <img src={news.img} alt={news.title} className="news-card-img" />
                  </div>
                  <h3 className="news-card-title">{news.title}</h3>
                  <span className="news-card-date">{news.date}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;