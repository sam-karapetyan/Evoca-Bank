import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import NodebukHer from '../../Components/AnhatMain/6NodbukHer';
import './BiometricDetail.css';

import QR from '../../assets/QR.png';

const defaultNewsList = [
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

function BiometricDetail() {
  const [title, setTitle] = useState("Դարձիր Evocabank-ի հաճախորդ բիոմետրիկ նույնականացմամբ");

  // Էջը բացվելիս ավտոմատ բարձրանում է վերև
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Firebase-ից միայն վերնագիրն ենք թարմացնում, եթե առկա է
  useEffect(() => {
    const bioRef = ref(db, '/biometric/title');
    const unsub = onValue(bioRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        setTitle(val);
      }
    });

    return () => unsub();
  }, []);

  return (
    <div className="evoca-biometric-page">
      <div className="evoca-bio-main-container">
        
        {/* Ամսաթիվ և Վերնագիր */}
        <div className="evoca-bio-header">
          <span className="evoca-bio-date">10.04.2024</span>
          <h1 className="evoca-bio-title">{title}</h1>
        </div>

        {/* Բաց Մանուշակագույն Տեքստային Բլոկ (2-րդ նկարի պես) */}
        <div className="evoca-purple-callout">
          <p>
            Այժմ դու կարող ես դառնալ <strong>Evocabank</strong>-ի հաճախորդ 
            առանց Բանկ այցելելու՝ <strong>EvocaTOUCH</strong> հավելվածի միջոցով անցնելով 
            արագ բիոմետրիկ նույնականացում:
          </p>
        </div>

        {/* Ամբողջական Տեքստը (2-րդ և 3-րդ նկարների ճշգրիտ կրկնօրինակը) */}
        <div className="evoca-bio-body-text">
          <p>
            Գործընթացը շատ պարզ է. անհրաժեշտ է միայն ներբեռնել <strong>EvocaTOUCH</strong> հավելվածը, 
            սկանավորել անձը հաստատող փաստաթուղթն ու անցնել բիոմետրիկ նույնականացում:
          </p>

          <h3 className="evoca-bio-section-heading">Դրա համար անհրաժեշտ է՝</h3>

          <ol className="evoca-numbered-list">
            <li>Ներբեռնել <strong>EvocaTOUCH</strong> հավելվածը,</li>
            <li>Սեղմել <strong>«Դառնալ հաճախորդ»</strong> կոճակը,</li>
            <li>Լրացնել հեռախոսահամարն ու անցնել նույնականացում (Selfie),</li>
            <li>Մուտքագրել անձնագրի/ID քարտի տվյալները,</li>
            <li>Ստեղծել մուտքանուն և գաղտնաբառ:</li>
          </ol>

          <p className="evoca-text-paragraph">
            Վերջ, դու արդեն Evocabank-ի հաճախորդ ես! Կարող ես բացել բանկային հաշիվներ, 
            պատվիրել քարտեր, ձևակերպել ավանդներ և օգտվել EvocaTOUCH-ի բոլոր հնարավորություններից:
          </p>
        </div>

        {/* QR Կոդի Բլոկ (3-րդ նկարի պես) */}
        <div className="evoca-qr-box">
          <div className="evoca-qr-content">
            <img src={QR} alt="EvocaTOUCH QR Code" className="evoca-qr-img" />
            <p className="evoca-qr-desc">
              Սկանավորիր QR կոդը EvocaTOUCH հավելվածը ներբեռնելու համար
            </p>
          </div>
        </div>

        {/* Այլ Նորություններ Բաժին */}
        <div className="evoca-other-news-wrapper">
          <h2 className="evoca-other-news-title">Այլ Նորություններ</h2>
          <div className="evoca-news-cards-grid">
            {defaultNewsList.map((news) => (
              <Link key={news.id} to={`/news/${news.id}`} className="evoca-news-item">
                <div className="evoca-news-img-box">
                  <img src={news.img} alt={news.title} />
                </div>
                <div className="evoca-news-info">
                  <h4 className="evoca-news-item-title">{news.title}</h4>
                  <span className="evoca-news-item-date">{news.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Ներքևի Նոութբուքի Բաններ */}
      <div className="evoca-bottom-banner-container">
        <NodebukHer />
      </div>
    </div>
  );
}

export default BiometricDetail;