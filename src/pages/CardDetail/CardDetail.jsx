import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../firebase';
import { ref, get, child } from 'firebase/database';
import cardsData from '../../data/cardsData';
import NodebukHer from '../../Components/AnhatMain/6NodbukHer';
import './CardDetail.css';

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

const serviceAccordionsData = [
  {
    id: 1,
    title: "Քարտի տրամադրում և ակտիվացում",
    content: `
      <ol>
        <li>Բանկը հաճախորդներին տրամադրում է Հաշվարկային կամ Վարկային՝ «ArCa» լոկալ, «Visa», «Mastercard» և «UnionPay» միջազգային վճարային համակարգերի քարտեր:</li>
        <li>Քարտային հաշիվները բացվում և վարվում են ՀՀ դրամով, ԱՄՆ դոլարով, ԵՎՐՈ-ով և ՌԴ ռուբլիով:</li>
        <li>Արագ փոխանցման համակարգերով ստացված գումարները հաճախորդի կարգադրությամբ կարող են հաշվեգրվել նաև հաճախորդի Բանկում ունեցած այլ Քարտային հաշվին:</li>
        <li>Բանկը դիմումի համաձայն Քարտապանի կողմից լիազորված անձանց կարող է տրամադրել Լրացուցիչ քարտեր:</li>
        <li>Բանկը Քարտապանի Քարտային հաշվի դրական մնացորդի նկատմամբ հաշվեգրում է տոկոսագումարներ՝ Բանկի սակագներով:</li>
        <li>Վճարային Քարտը Քարտապանին է տրամադրվում Բանկի գլխամասային գրասենյակում, մասնաճյուղերում, ինչպես նաև առաքման միջոցով՝ 7 (յոթ) աշխատանքային օրվա ընթացքում:</li>
        <li>Քարտապանը Քարտը ստանալիս պետք է ներկայացնի անձը հաստատող փաստաթուղթ (անձնագիր կամ նույնականացման քարտ):</li>
        <li>Բանկը Քարտապանին Քարտը կարող է տրամադրել PIN ծածկագրով կամ առանց PIN ծածկագրի:</li>
        <li>Վճարային Քարտը ստանալուն պես Քարտապանը պարտավոր է անմիջապես ստորագրել Քարտի հակառակ կողմում:</li>
        <li>Բանկի կողմից Վճարային Քարտերը տրամադրվում են մինչև 5 (հինգ) տարի ժամկետով:</li>
      </ol>
    `
  },
  {
    id: 2,
    title: "Վճարային քարտի վճարներ և գանձումներ",
    content: "<p>Քարտային հաշվի սպասարկման, քարտի տրամադրման և այլ ծառայությունների վճարները գանձվում են համաձայն Բանկի գործող սակագների:</p>"
  },
  {
    id: 3,
    title: "Վճարային քարտի օգտագործման, պահպանման և անվտանգության կանոնները",
    content: "<p>Պահպանեք Ձեր քարտը մեխանիկական վնասվածքներից, ջերմային ազդեցությունից և էլեկտրամագնիսական ճառագայթումից:</p>"
  },
  {
    id: 4,
    title: "Վճարային Քարտի օգտագործումը",
    content: `
      <p><strong>1. Վճարային Քարտով իրականացվում են հետևյալ տեսակի գործարքները\`</strong></p>
      <ul>
        <li>Քարտային հաշվի համալրում,</li>
        <li>Քարտային հաշվից կանխիկացում,</li>
        <li>Անկանխիկ վճարումների իրականացում,</li>
        <li>Քարտից քարտ փոխանցումներ:</li>
      </ul>
      <p><strong>2. Քարտային հաշվի համալրում</strong></p>
      <ul>
        <li>Քարտապանը Քարտային հաշվի համալրում կարող է իրականացնել կանխիկ և անկանխիկ եղանակներով:</li>
        <li>Քարտապանը մոտենում է Բանկի Գլխամասային գրասենյակ կամ Մասնաճյուղ, կամ վճարային տերմինալներով:</li>
      </ul>
      <p><strong>3. Քարտային հաշվից կանխիկացում</strong></p>
      <table border="1" style="width:100%; text-align:center; border-collapse:collapse; margin-top:10px;">
        <thead>
          <tr style="background-color:#f4effc;">
            <th>Արժույթ</th>
            <th>Arca</th>
            <th>Mastercard Standard / Visa Classic</th>
            <th>Mastercard Gold / Visa Gold</th>
            <th>Visa Business</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ՀՀ դրամ</td>
            <td>300,000 (10 անգամ)</td>
            <td>1,000,000 (10 անգամ)</td>
            <td>2,000,000 (10 անգամ)</td>
            <td>1,000,000 (10 անգամ)</td>
          </tr>
          <tr>
            <td>ԱՄՆ դոլար</td>
            <td>-</td>
            <td>2,000 (10 անգամ)</td>
            <td>3,000 (10 անգամ)</td>
            <td>2,000 (10 անգամ)</td>
          </tr>
          <tr>
            <td>Եվրո</td>
            <td>-</td>
            <td>2,000 (10 անգամ)</td>
            <td>3,000 (10 անգամ)</td>
            <td>2,000 (10 անգամ)</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    id: 5,
    title: "Արտարժույթով արտահայտված գործառնությունների կատարում",
    content: "<p>Արտարժույթով գործարքներ կատարելիս փոխարկումն իրականացվում է գործարքի մշակման օրվա փոխարժեքով։</p>"
  },
  {
    id: 6,
    title: "Վճարային Քարտի առգրավում/բռնագանձում",
    content: "<p>Բանկոմատի կողմից քարտի առգրավման դեպքում անհրաժեշտ է անմիջապես կապ հաստատել Բանկի հետ:</p>"
  },
  {
    id: 7,
    title: "Վճարային Քարտի բլոկավորում/ապաբլոկավորում",
    content: "<p>Քարտի կորստի կամ գողության դեպքում քարտապանը պետք է անմիջապես արգելափակի քարտը EvocaTouch հավելվածով:</p>"
  },
  {
    id: 8,
    title: "Վճարային Քարտի վերաթողարկում",
    content: "<p>Քարտի ժամկետի ավարտից հետո կամ վնասման դեպքում իրականացվում է քարտի վերաթողարկում:</p>"
  },
  {
    id: 9,
    title: "Քարտային գործառնությունների բողոքարկում",
    content: "<p>Սխալ կամ չգրանցված գործարքների դեպքում քարտապանը կարող է ներկայացնել բողոքարկման դիմում:</p>"
  },
  {
    id: 10,
    title: "Քարտային հաշվի վերաբերյալ տեղեկատվության և Քաղվածքի տրամադրում",
    content: "<p>Քաղվածքները տրամադրվում են ամսական կտրվածքով էլեկտրոնային փոստի կամ EvocaTouch հավելվածի միջոցով:</p>"
  },
  {
    id: 11,
    title: "Վճարային Քարտի փակում",
    content: "<p>Քարտային հաշիվը փակվում է հաճախորդի դիմումի համաձայն՝ բոլոր պարտավորությունները մարելուց հետո:</p>"
  },
  {
    id: 12,
    title: "Օտարերկրյա Հաշիվների Հարկման Համապատասխանության ակտի (FATCA) ծանուցում",
    content: "<p>FATCA պահանջներին համապատասխան տեղեկատվության ներկայացում ԱՄՆ հարկային մարմիններին:</p>"
  },
  {
    id: 13,
    title: "Քարտային գործառնությունների մոնիտորինգ և անվտանգություն",
    content: "<p>Բանկը իրականացնում է շուրջօրյա ավտոմատացված մոնիտորինգ՝ կասկածելի գործարքները կանխելու համար:</p>"
  },
  {
    id: 14,
    title: "Քարտի թոքենացում և մոբայլ (NFC) վճարումներ",
    content: "<p>Կցեք Ձեր քարտը Apple Pay կամ Google Pay համակարգերին՝ անհպում վճարումներ կատարելու համար:</p>"
  },
  {
    id: 15,
    title: "Հնարավոր զեղծարարություններից խուսափելու համար.",
    content: "<p>Երբեք մի փոխանցեք Ձեր PIN կոդը, CVC/CVV կոդը կամ SMS-ով ստացված մեկանգամյա ծածկագիրը երրորդ անձանց:</p>"
  }
];

function CardDetail() {
  const { cardId } = useParams();
  const [activeTab, setActiveTab] = useState('cards');
  const [openAccordion, setOpenAccordion] = useState(0);

  const [card, setCard] = useState(null);
  const [otherNews, setOtherNews] = useState(defaultNewsList);
  const [accordionsData, setAccordionsData] = useState(serviceAccordionsData);
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
      {/* Subnav Navigation Bar */}
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

      {/* ՏԱՐԲԵՐԱԿ 1: ՔԱՐՏԵՐ TAB */}
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

      {/* ՏԱՐԲԵՐԱԿ 2: ՔԱՐՏԵՐԻ ՏՐԱՄԱԴՐՈՒՄ ԵՎ ՍՊԱՍԱՐԿՈՒՄ TAB (ԱԿՈՐԴԵՈՆՆԵՐ) */}
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

      {/* ՏԱՐԲԵՐԱԿ 3: ՍՈՑԻԱԼԱԿԱՆ ԱՊԱՀՈՎՈՒԹՅԱՆ ՎՃԱՐԱՅԻՆ ՔԱՐՏԵՐ TAB */}
      {activeTab === 'social' && (
        <div className="card-content-section">
          <div className="card-content-container">
            {/* 1. Hero / Banner բաժին */}
            <div className="social-hero-banner" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', backgroundColor: '#f4effc', borderRadius: '16px', overflow: 'hidden', marginBottom: '30px' }}>
              <div style={{ flex: '1 1 400px', padding: '40px' }}>
                <h1 style={{ color: '#2b2b2b', fontSize: '28px', marginBottom: '20px', fontWeight: 'bold' }}>
                  Սոցիալական ապահովության վճարային քարտեր
                </h1>
                <p style={{ color: '#555', lineHeight: '1.6', fontSize: '15px' }}>
                  Կենսաթոշակառուներին առաջարկում ենք <strong>ARCA</strong> կենսաթոշակային վճարային քարտեր՝ միայն կենսաթոշակների գումարների սպասարկման նպատակով: Քարտերը տրամադրում ենք Սոցիալական ապահովության պետական ծառայության հետ 2011թ. հունվարի 21-ին կնքած պայմանագրի համաձայն:
                </p>
              </div>
              <div style={{ flex: '1 1 350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img 
                  src="https://www.evoca.am/images-cache/menu/1/17218011250749/780x585.jpg" 
                  alt="Սոցիալական ապահովության վճարային քարտեր" 
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* 2. Հիմնական տեքստային տեղեկատվություն */}
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
              <div style={{ backgroundColor: '#fff', borderLeft: '4px solid #8e44ad', padding: '15px 20px', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
                  <strong>Ծանոթագրություն</strong> - Կենսաթոշակառու՝ անձ, ում կենսաթոշակը վճարվում է անկանխիկ եղանակով, Բանկում բացված բանկային հաշվին փոխանցելու միջոցով։ Կենսաթոշակ՝ կենսաթոշակի, պատվովճարի, դրամական օգնության և սոցիալական ապահովության այլ ծրագրերով նախատեսված դրամական վճարների գումարը։
                </p>
              </div>
            </div>

            {/* 3. Վճարային քարտերով կատարվող գործառնություններ */}
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '22px', color: '#2b2b2b', marginBottom: '15px', fontWeight: 'bold' }}>
                Վճարային քարտերով կատարվող գործառնություններ
              </h2>
              <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Վճարային քարտերով կարող եք՝</p>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#444' }}>
                <li>Կանխիկացնել Ձեր քարտային հաշվին առկա միջոցները բանկոմատներից (ATM) և կանխիկացման կետերից (POS տերմինալներից):</li>
                <li>Կատարել անկանխիկ վճարումներ առևտրի և սպասարկման կետերում (ապրանքների կամ ծառայությունների դիմաց՝ խանութներում, ռեստորաններում, հյուրանոցներում և սպասարկման այլ կետերում):</li>
                <li>Կատարել կոմունալ վճարումներ՝ բանկոմատների միջոցով կամ օնլայն (www.arca.am-ում գրանցվելով վիրտուալ քարտ):</li>
                <li>Օնլայն գործարքներ կատարել (վճարումներ, գնումներ):</li>
                <li>Քարտից քարտ գումար փոխանցել՝ բանկոմատների միջոցով կամ օնլայն:</li>
                <li>Մեր online բանկինգ ծառայությունից օգտվելու պարագայում դուք հնարավորություն կունենաք առանց մեզ այցելելու կատարել դրամական միջոցների համալրում (ընթացիկ հաշվից՝ քարտային հաշիվ) և անմիջապես տնօրինել այդ գումարները՝ ձեր քարտի միջոցով:</li>
              </ul>
              <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                <strong>Նշում.</strong> Քարտային հաշվով կատարվող դրամական շարժը վերահսկելու նպատակով ակտիվացնում ենք SMS-տեղեկացում ծառայությունը (դուք կարող եք դիմում գրել և հրաժարվել SMS տեղեկացումների ծառայությունից): Օնլայն վճարումներ իրականացնելիս կարող եք օգտվել 3D Secure ծառայությունից:
              </p>
            </div>

            {/* 4. Օգտակար տեղեկատվություն */}
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '22px', color: '#2b2b2b', marginBottom: '15px', fontWeight: 'bold' }}>
                Օգտակար տեղեկատվություն
              </h2>
              <p style={{ fontWeight: 'bold', color: '#8e44ad', marginBottom: '10px' }}>
                Քարտային վճարումներ կատարելիս անհրաժեշտ է հիշել՝
              </p>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#444' }}>
                <li>Քարտերով կարող եք վճարումներ կատարել այն առևտրի ու սպասարկման կետերում, որտեղ փակցված է տվյալ քարտային համակարգի լոգոտիպը:</li>
                <li>Քարտով վճարում կատարելիս՝ մինչև անդորրագիրը ստորագրելը, հավաստիացեք, որ անդորրագրում նշված գումարը համապատասխանում է ձեր գործարքի գումարին:</li>
                <li>Քարտով վճարելիս միշտ պահեք քարտը ձեր տեսադաշտում:</li>
                <li>Եթե հրաժարվում եք գնումից,ապա պահանջեք չեղյալ համարել (VOID) ձեր վճարումը և պահեք համապատասխան անդորրագիրը մինչև հերթական քաղվածքի ստացումը՝ համոզվելու, որ հաշվից գանձում չի կատարվել:</li>
              </ul>
            </div>

            {/* 5. Զգուշացում */}
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '22px', color: '#d32f2f', marginBottom: '15px', fontWeight: 'bold' }}>
                Զգուշացում
              </h2>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#444' }}>
                <li>Ապահովեք ձեր PIN ծածկագրի գաղտնիությունը (այն պետք է պահպանել գաղտնի և հասանելի չդարձնել այլ անձանց): PIN ծածկագրով կատարված բոլոր գործառնությունների պատասխանատվությունը կրում եք դուք: Մենք պատասխանատվություն չենք կրում ձեր PIN ծածկագիրը երրորդ անձանց հասանելի դառնալու հետևանքով վճարային քարտի ոչ օրինական և ձեր կողմից չարտոնված օգտագործման համար:</li>
                <li>Քարտի կորստի կամ գողության դեպքում անմիջապես զանգահարեք մեզ (+374 10) 605555 հեռախոսահամարով կամ «Արմենիան Քարդ» վճարահաշվարկային համակարգի (+374 10) 592222 հեռախոսահամարով՝ հայտնելով քարտի ստացման դիմումի մեջ ձեր կողմից նշված գաղտնաբառը: Զանգից անմիջապես հետո քարտի գործողությունը կդադարեցվի:</li>
                <li>Քարտի կորստի կամ գողության մասին ՄԵԶ տեղեկացնելու հետաձգումը կարող է հանգեցնել ձեր քարտով այլ անձանց կողմից գործարքների կատարմանը:</li>
                <li>Մենք պատասխանատվություն չենք կրում ձեզ հասցրած այն վնասի համար, որը կատարվել է քարտը կորցնելու և մեզ հայտնելու միջև ընկած ժամանակահատվածում:</li>
                <li>Դուք պատասխանատվություն եք կրում քարտով կատարված բոլոր գործառնությունների համար մինչև այն պահը, երբ տեղեկացնում եք մեզ կորստի կամ գողության պատճառով քարտի գործողությունը դադարեցնելու անհրաժեշտության մասին:</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Այլ Նորություններ */}
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

      {/* Բաններ */}
      <div style={{ marginTop: '40px' }}>
        <NodebukHer />
      </div>
    </div>
  );
}

export default CardDetail;