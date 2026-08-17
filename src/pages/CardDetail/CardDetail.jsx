import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../firebase';
import { ref, get, child } from 'firebase/database';
import cardsData from '../../data/cardsData';
import NodebukHer from '../../Components/AnhatMain/6NodbukHer';
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
  const [openAccordion, setOpenAccordion] = useState(0);

  const [card, setCard] = useState(null);
  const [otherNews, setOtherNews] = useState(defaultNewsList);
  const [accordionsData, setAccordionsData] = useState([]);
  const [socialData, setSocialData] = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultCard = {
    title: 'Evoca Travel Card',
    subtitle: 'Սիրո՞ւմ եմ ճամփորդել. ուրեմն ժամանակն է ձեռք բերելու Evoca Mastercard Travel Card, որը կդառնա քո ճամփորդական անբաժան ընկերը:',
    img: ''
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dbRef = ref(db);

      try {
        if (cardId) {
          const cardSnapshot = await get(child(dbRef, `cards/${cardId}`));
          if (cardSnapshot.exists()) {
            setCard(cardSnapshot.val());
          } else {
            const localCard = (cardsData && cardsData[cardId]) || (cardsData && cardsData['evoca-travel-card']) || defaultCard;
            setCard(localCard);
          }
        } else {
          setCard(defaultCard);
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

        const accordionSnapshot = await get(child(dbRef, 'cardDetailSections'));
        if (accordionSnapshot.exists()) {
          const accVal = accordionSnapshot.val();
          setAccordionsData(Array.isArray(accVal) ? accVal : Object.values(accVal));
        }

        const socialSnapshot = await get(child(dbRef, 'socialTab'));
        if (socialSnapshot.exists()) {
          setSocialData(socialSnapshot.val());
        }
      } catch (error) {
        console.error("Firebase Read Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cardId]);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  if (loading) {
    return <div className="loading" style={{ textAlign: 'center', padding: '50px' }}>Բեռնվում է...</div>;
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
        </div>
      </div>

      {activeTab === 'cards' && (
        <>
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
                  Հիշեցնենք նաև, որ <strong>Evocabank</strong>-ի հետ կարող եք նաև կապ հաստատել <span className="highlight-purple">+37410605555</span> հեռախոսահամարով: Իսկ արտասահմանից զանգահարելիս` գործում է միայն <span className="highlight-purple">+37410605555</span> հեռախոսահամարը:
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'service' && (
        <div className="card-content-section">
          <div className="card-content-container">
            <h1 className="service-page-title">Քարտերի տրամադրում և սպասարկում</h1>
            <h3 className="service-subtitle">ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ</h3>

            <div className="accordions-wrapper">
              {accordionsData.map((item, index) => (
                <div
                  key={item.id || index}
                  className={`accordion-card ${openAccordion === index ? 'active' : ''}`}
                >
                  <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className={`accordion-arrow ${openAccordion === index ? 'up' : 'down'}`}>❯</span>
                    <span className="accordion-title-text">{item.title}</span>
                  </button>
                  {openAccordion === index && (
                    <div className="accordion-body">
                      <div 
                        className="accordion-content"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'social' && (
        <div className="card-content-section">
          <div className="card-content-container">
            <div className="social-hero-banner" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', backgroundColor: '#f4effc', borderRadius: '16px', overflow: 'hidden', marginBottom: '30px' }}>
              <div style={{ flex: '1 1 400px', padding: '40px' }}>
                <h1 style={{ color: '#2b2b2b', fontSize: '28px', marginBottom: '20px', fontWeight: 'bold' }}>
                  {socialData?.title || 'Սոցիալական ապահովության վճարային քարտեր'}
                </h1>
                <p 
                  style={{ color: '#555', lineHeight: '1.6', fontSize: '15px' }}
                  dangerouslySetInnerHTML={{ __html: socialData?.description || '' }}
                />
              </div>
              <div style={{ flex: '1 1 350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {socialData?.image && (
                  <img 
                    src={socialData.image} 
                    alt={socialData.title || 'Սոցիալական ապահովության վճարային քարտեր'} 
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                )}
              </div>
            </div>

            <div style={{ lineHeight: '1.8', color: '#333', marginBottom: '30px', fontSize: '15px' }}>
              <p style={{ marginBottom: '15px' }}>
                Քարտերը տրամադրում և սպասարկում ենք մեր կողմից հաստատված Կենսաթոշակային քարտերի տրամադրման և սպասարկման սակագների համաձայն:
              </p>
              <p style={{ marginBottom: '15px' }}>
                Քարտերի ստացման դիմում կարող եք ներկայացնել մեր Գլխամասային գրասենյակ կամ ցանկացած մասնաճյուղ:
              </p>
              <p style={{ marginBottom: '20px' }}>
                Վճարային քարտերի տրամադրմանը, սպասարկմանը և օգտագործմանը վերաբերող մանրամասն տեղեկատվությանը կարող եք ծանոթանալ <a href="#service" onClick={(e) => { e.preventDefault(); setActiveTab('service'); }} style={{ color: '#eb008b', fontWeight: 'bold', textDecoration: 'underline' }}>այստեղ</a>:
              </p>
              {socialData?.note && (
                <div style={{ backgroundColor: '#fff', borderLeft: '4px solid #8e44ad', padding: '15px 20px', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <p 
                    style={{ margin: 0, fontSize: '14px', color: '#555' }}
                    dangerouslySetInnerHTML={{ __html: socialData.note }}
                  />
                </div>
              )}
            </div>

            {socialData?.operationsList && (
              <div style={{ marginBottom: '35px' }}>
                <h2 style={{ fontSize: '22px', color: '#2b2b2b', marginBottom: '15px', fontWeight: 'bold' }}>
                  {socialData.operationsTitle || 'Վճարային քարտերով կատարվող գործառնություններ'}
                </h2>
                <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Վճարային քարտերով կարող եք՝</p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#444' }}>
                  {socialData.operationsList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {socialData?.usefulList && (
              <div style={{ marginBottom: '35px' }}>
                <h2 style={{ fontSize: '22px', color: '#2b2b2b', marginBottom: '15px', fontWeight: 'bold' }}>
                  {socialData.usefulTitle || 'Օգտակար տեղեկատվություն'}
                </h2>
                <p style={{ fontWeight: 'bold', color: '#8e44ad', marginBottom: '10px' }}>
                  Քարտային վճարումներ կատարելիս անհրաժեշտ է հիշել՝
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#444' }}>
                  {socialData.usefulList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {socialData?.warningList && (
              <div style={{ marginBottom: '35px' }}>
                <h2 style={{ fontSize: '22px', color: '#d32f2f', marginBottom: '15px', fontWeight: 'bold' }}>
                  {socialData.warningTitle || 'Զգուշացում'}
                </h2>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#444' }}>
                  {socialData.warningList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="card-content-section" style={{ paddingTop: 0 }}>
        <div className="card-content-container">
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

      <div style={{ marginTop: '40px' }}>
        <NodebukHer />
      </div>
    </div>
  );
}

export default CardDetail;