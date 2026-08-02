import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { db } from '../../firebase';
import { ref, get, child } from 'firebase/database';
import './CardDetail.css';

const newsDatabase = {
  '1': {
    tag: 'Բանկային',
    title: 'Evocabank-ը և Green Rock-ը մեկնարկեցին Բանկի նոր գլխամասի նախագիծը',
    subtitle: 'Evocabank-ը և Green Rock Management Group-ը ստորագրեցին համագործակցության հուշագիր՝ պաշտոնապես մեկնարկելով Բանկի նոր գլխամասի նախագիծը։',
    date: '30.07.2026',
    img: 'https://www.evoca.am/images-cache/news/1/17854167235525/428x321.png',
    paragraphs: [
      { text: <><strong>Evocabank</strong>-ի Վարչության Նախագահ <strong>Կարեն Եղիազարյանը</strong> և <strong>Green Rock Management Group</strong>-ի գործադիր տնօրեն <strong>Կատերինա Դանիելյանն</strong> ստորագրեցին համագործակցության հուշագիր...</> },
      { text: <><strong>Evocabank</strong>-ի նոր գլխամասը կկառուցվի Երևանի Դեմիրճյան 14 հասցեում...</> },
      { text: <><strong>Evocabank</strong>-ի Վարչության Նախագահ <strong>Կարեն Եղիազարյանը</strong> նշեց. <em>«Այսօր խորհրդանշական օր է Բանկի համար...»</em></> }
    ]
  },
  '2': {
    tag: 'Կրթություն',
    title: 'Evoca-ի ղեկավարները հաջողությամբ ավարտեցին Generative AI դասընթացը',
    subtitle: 'Evocabank-ի ղեկավար թիմը MIT-ի ծրագրով անցել է Generative AI-ի հատուկ վերապատրաստում։',
    date: '17.07.2026',
    img: 'https://www.evoca.am/images-cache/news/1/17842875742396/428x321.png',
    paragraphs: [
      { text: <><strong>Evocabank</strong>-ի ղեկավարները հաջողությամբ ավարտեցին արհեստական բանականության առաջատար ծրագիրը՝ ստանալով MIT-ի համապատասխան վկայականներ:</> }
    ]
  },
  '3': {
    tag: 'Տեղեկատվություն',
    title: 'ՊԱՐԶԱԲԱՆՈՒՄ',
    subtitle: 'Evocabank-ի պաշտոնական հայտարարությունը կապի միջոցների վերաբերյալ։',
    date: '05.06.2026',
    img: 'https://www.evoca.am/images-cache/news/1/17806626445767/428x321.jpg',
    paragraphs: [
      { text: <>Այսուհետ <strong>Evocabank</strong>-ի հաճախորդներն ավելի հեշտ ու արագ կարող են կապ հաստատել Բանկի հետ` պարզապես հավաքելով <strong>8444</strong> քաղաքային կամ բջջային հեռախոսներից:</> }
    ]
  }
};

const defaultNewsList = [
  { id: '1', title: 'Evocabank-ը և Green Rock-ը մեկնարկեցին Բանկի նոր գլխամասի նախագիծը', date: '30.07.2026', img: 'https://www.evoca.am/images-cache/news/1/17854167235525/428x321.png' },
  { id: '2', title: 'Evoca-ի ղեկավարները հաջողությամբ ավարտեցին Generative AI դասընթացը', date: '17.07.2026', img: 'https://www.evoca.am/images-cache/news/1/17842875742396/428x321.png' },
  { id: '3', title: 'ՊԱՐԶԱԲԱՆՈՒՄ', date: '05.06.2026', img: 'https://www.evoca.am/images-cache/news/1/17806626445767/428x321.jpg' }
];

function CardDetail() {
  const { cardId } = useParams(); 
  const location = useLocation();
  
  const [card, setCard] = useState(null);
  const [otherNews, setOtherNews] = useState(defaultNewsList);
  const [loading, setLoading] = useState(true);

  // Accordion-ի վիճակը
  const [openAccordion, setOpenAccordion] = useState(3);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dbRef = ref(db);

      if (location.pathname === '/card-issuance') {
        setCard({ type: 'issuance_page' });
      } else {
        try {
          const cardSnapshot = await get(child(dbRef, `cards/${cardId}`));
          if (cardSnapshot.exists()) {
            setCard(cardSnapshot.val());
          } else {
            const singleNewsSnapshot = await get(child(dbRef, `news/${cardId}`));
            if (singleNewsSnapshot.exists()) {
              setCard(singleNewsSnapshot.val());
            } else if (newsDatabase[cardId]) {
              setCard(newsDatabase[cardId]);
            } else {
              setCard(newsDatabase['1']);
            }
          }
        } catch (error) {
          console.error("Տվյալներ բեռնելու սխալ:", error);
        }
      }

      try {
        const newsSnapshot = await get(child(dbRef, 'news'));
        if (newsSnapshot.exists()) {
          const newsData = newsSnapshot.val();
          setOtherNews(Object.keys(newsData).map(key => ({ id: key, ...newsData[key] })));
        }
      } catch (e) {}
      setLoading(false);
    };

    fetchData();
  }, [cardId, location.pathname]); 

  if (loading) return <div className="loading">Բեռնվում է...</div>;

  if (location.pathname === '/card-issuance') {
    return (
      <div className="card-detail-page">
        <div className="card-detail-subnav">
          <div className="card-subnav-inner">
            <Link to="/cards" className="subnav-tab">Քարտեր</Link>
            <Link to="/card-issuance" className="subnav-tab active">Քարտերի տրամադրում և սպասարկում</Link>
            <Link to="/social-cards" className="subnav-tab">Սոցիալական ապահովության վճարային քարտեր</Link>
            <Link to="/evoca-benefits" className="subnav-tab">Evoca Benefits</Link>
          </div>
        </div>

        <div className="card-issuance-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          <div style={{ fontSize: '14px', color: '#8c8c96', marginBottom: '30px', display: 'flex', gap: '8px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#8c8c96' }}>Անհատ</Link> › 
            <Link to="/cards" style={{ textDecoration: 'none', color: '#8c8c96' }}>Քարտեր</Link> › 
            <span style={{ color: '#1d1d1f', fontWeight: '500' }}>Քարտերի տրամադրում և սպասարկում</span>
          </div>

          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#1d1d1f', marginBottom: '32px' }}>
            Քարտերի տրամադրում և սպասարկում
          </h1>

          <h2 style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: '#1d1d1f', marginBottom: '24px' }}>
            ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* --- ACCORDION 1 --- */}
            <div className={`accordion-card ${openAccordion === 1 ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => toggleAccordion(1)}>
                <span>Քարտի տրամադրում և ակտիվացում</span>
                <span className="accordion-icon">❯</span>
              </button>
              <div className="accordion-body">
                <div className="accordion-content">
                  <ol style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li>Բանկը հաճախորդներին տրամադրում է Հաշվարկային կամ Վարկային` «ArCa» լոկալ, «Visa», «Mastercard» և «UnionPay» միջազգային վճարային համակարգերի քարտեր:</li>
                    <li>Քարտային հաշիվները բացվում և վարվում են ՀՀ դրամով, ԱՄՆ դոլարով, ԵՎՐՈ-ով և ՌԴ ռուբլիով:</li>
                    <li>Արագ փոխանցման համակարգերով ստացված գումարները հաճախորդի կարգադրությամբ կարող են հաշվեգրվել նաև հաճախորդի Բանկում ունեցած այլ Քարտային հաշվին:</li>
                    <li>Բանկը դիմումի համաձայն Քարտապանի կողմից լիազորված անձանց կարող է տրամադրել Լրացուցիչ քարտեր:</li>
                    <li>Բանկը Քարտապանի Քարտային հաշվի դրական մնացորդի նկատմամբ հաշվեգրում է տոկոսագումարներ:</li>
                    <li>Վճարային Քարտը տրամադրվում է դիմումը ներկայացնելուն հաջորդող 7 աշխատանքային օրվա ընթացքում:</li>
                    <li>Քարտապանը քարտը ստանալիս պետք է ներկայացնի անձը հաստատող փաստաթուղթ:</li>
                    <li>Բանկը Քարտապանին քարտը կարող է տրամադրել PIN ծածկագրով կամ առանց դրա (OTP միջոցով):</li>
                    <li>Քարտը և PIN-ը ստանալիս Քարտապանը պետք է ստուգի ծրարի փակ և անվնաս լինելը:</li>
                    <li>Վճարային Քարտը ստանալուն պես Քարտապանը պարտավոր է անմիջապես ստորագրել քարտի հակառակ կողմում:</li>
                    <li>Բանկի կողմից Վճարային Քարտերը տրամադրվում են մինչև 5 (հինգ) տարի ժամկետով:</li>
                    <li>Հաճախորդի դիմումի հիման վրա Բանկը կարող է վարկավորել Քարտային հաշիվը:</li>
                    <li>Եթե հաճախորդը 30 օրվա ընթացքում չի ներկայանում քարտը ստանալու, Բանկը կարող է ոչնչացնել այն:</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* --- ACCORDION 2 --- */}
            <div className={`accordion-card ${openAccordion === 2 ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => toggleAccordion(2)}>
                <span>Վճարային քարտի վճարներ և գանձումներ</span>
                <span className="accordion-icon">❯</span>
              </button>
              <div className="accordion-body">
                <div className="accordion-content">
                  <ol style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li>Քարտապանը վճարում է Բանկին Վճարային Քարտի սպասարկման հետ կապված Բանկի սակագներով սահմանված միջնորդավճարներ:</li>
                    <li>Վճարային Քարտի սպասարկման միջնորդավճարի առաջին վճարումը Քարտապանը կատարում է քարտը պատվիրելիս:</li>
                    <li>Վճարային Քարտի սպասարկման միջնորդավճարի գծով չմարված պարտավորության դեպքում քարտը բլոկավորվում է:</li>
                    <li>Գերածախսի ձևավորման դեպքում Քարտապանը պարտավոր է մարել այն անմիջապես:</li>
                    <li>Միջնորդավճարները Բանկի կողմից գանձվում են անակցեպտ եղանակով:</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* --- ACCORDION 3: Վճարային Քարտի օգտագործումը --- */}
            <div className={`accordion-card ${openAccordion === 3 ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => toggleAccordion(3)}>
                <span>Վճարային Քարտի օգտագործումը</span>
                <span className="accordion-icon">❯</span>
              </button>
              <div className="accordion-body">
                <div className="accordion-content">
                  
                  {/* Մաս 1 */}
                  <h4 style={{ color: '#1d1d1f', fontSize: '16px', fontWeight: '700', marginTop: '10px' }}>
                    1. Վճարային Քարտով իրականացվում են հետևյալ տեսակի գործարքները`
                  </h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Քարտային հաշվի համալրում,</li>
                    <li>Քարտային հաշվից կանխիկացում</li>
                    <li>Անկանխիկ վճարումների իրականացում</li>
                    <li>Քարտից քարտ փոխանցումներ</li>
                  </ul>

                  {/* Մաս 2 */}
                  <h4 style={{ color: '#1d1d1f', fontSize: '16px', fontWeight: '700', marginTop: '24px' }}>
                    2. Քարտային հաշվի համալրում
                  </h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li>Քարտապանը Քարտային հաշվի համալրում կարող է իրականացնել կանխիկ և անկանխիկ եղանակներով:</li>
                    <li>Քարտային հաշվին կանխիկ եղանակով համալրում իրականացնելու համար Քարտապանը մոտենում է Բանկի Գլխամասային գրասենյակ կամ Մասնաճյուղ և կատարում է համալրումը: Քարտային հաշվին կանխիկ եղանակով համալրումներ կարող են իրականացվել նաև Բանկի կանխիկի մուտքի հնարավորությամբ բանկոմատների, վճարային տերմինալների, ինչպես նաև այլ բանկերի և վճարահաշվարկային կազմակերպությունների վճարային տերմինալների միջոցով:</li>
                    <li>Քարտային հաշվին անկանխիկ եղանակով համալրում իրականացվում է Բանկի կամ այլ Բանկերի, Քարտապանի կամ այլ անձանց բանկային հաշիվներից` Քարտապանի Քարտային հաշվին փոխանցում կատարելու միջոցով:</li>
                    <li>Բանկի Գլխամասային գրասենյակում կամ մասնաճյուղերում Բանկի վճարային տերմինալներով կանխիկ մուտքագրված գումարները քարտի վրա հասանելի են լինում անմիջապես, իսկ հաշվին` հաջորդ աշխատանքային օրը: Բանկի այլ հաշիվներից Քարտային հաշվին փոխանցումը քարտի վրա հասանելի է դառնում, որպես կանոն, մինչև 30 (երեսուն) րոպեի ընթացքում (ArCa պրոցեսինգային կենտրոնում տեխնիկական կամ ծրագրային խնդիրների բացակայության դեպքում):</li>
                    <li>Այլ բանկերի և կազմակերպությունների կանխիկի մուտքագրման սարքավորման հնարավորություններն ու սահմանափակումները` կապված մուտքագրվող գումարի արժույթի, թղթադրամի արժողության/տեսակի հետ և այլն, սահմանվում են տվյալ սարքավորման սպասարկող կազմակերպության և (կամ) վճարահաշվարկային համակարգի կողմից, և նման տեղեկատվությունը, որպես կանոն, ներկայացված է տվյալ կազմակերպության և (կամ) վճարահաշվարկային համակարգի պաշտոնական ինտերնետային կայքում կամ այդ սարքավորման վրա:</li>
                  </ul>

                  {/* Մաս 3 */}
                  <h4 style={{ color: '#1d1d1f', fontSize: '16px', fontWeight: '700', marginTop: '24px' }}>
                    3. Քարտային հաշվից կանխիկացում
                  </h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li>Քարտապանը կանխիկացման գործառնությունները կարող է իրականացնել բանկոմատների (ATM) կամ POS-տերմինալների միջոցով, տվյալ կետի կողմից տվյալ վճարահաշվարկային համակարգի քարտերի ընդունման պարագայում:</li>
                    <li>Կանխիկացման գործառնություններ իրականացնելիս կանխիկացման միջնորդավճարը կարող է հաշվարկվել և գումարվել պահանջվող գումարին հավաստագրման հարցում իրականացնելիս, ընդ որում, տվյալ դեպքում գործարքի իրականացումը կարող է մերժվել, եթե պահանջվող գումարի և դրա միջնորդավճարի հանրագումարը գերազանցում է հավաստագրման կամ վճարային սահմանաչափերը:</li>
                    <li>Այլ բանկերի բանկոմատներում կամ կանխիկացման կետերում կանխիկացման գործարքներ իրականացնելիս այն սպասարկող բանկը կարող է սահմանել կանխիկացման լրացուցիչ միջնորդավճարներ (բացի Բանկի միջնորդավճարից) կամ արտարժույթի առուվաճառքի փոխարժեքներ (Բանկը խորհուրդ է տալիս Քարտապանին, այլ բանկերի բանկոմատներում կամ կանխիկացման կետերում կանխիկացման գործարքներ իրականացնելիս տեղեկանալ տվյալ բանկի սակագներին):</li>
                    <li>Բանկը պատասխանատվություն չի կրում այլ բանկերի բանկոմատների միջոցով կանխիկացման գործառնությունների համար գանձված այլ կազմակերպությունների սահմանած լրացուցիչ միջնորդավճարների համար:</li>
                    <li>Գործարքի գումարը Վճարային քարտից ելքագրվում կամ մուտքագրվում է (C2C) անմիջապես, իսկ Քարտային հաշվում հաշվառվում է, որպես կանոն, հետևյալ ժամկետներում.
                      <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '8px' }}>
                        <li>ArCa համակարգում կատարված գործարքների դեպքում հաջորդ աշխատանքային օրը,</li>
                        <li>ArCa համակարգից դուրս կատարված գործարքների դեպքում 2-5 աշխատանքային օր հետո:</li>
                      </ul>
                    </li>
                    <li>Բանկոմատներից և կանխիկացման կետերից կանխիկացման գործարքներ իրականացնելու նկատմամբ սահմանվում է մեկ օրվա ընթացքում կատարվող կանխիկացման գործարքի/ների առավելագույն Վճարային սահմանաչափը և քանակը.</li>
                  </ul>

                  {/* ԱՂՅՈՒՍԱԿ */}
                  <div style={{ overflowX: 'auto', margin: '20px 0' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f9f9fb', borderBottom: '1px solid #e2e2e8' }}>
                          <th rowSpan="2" style={{ padding: '10px', border: '1px solid #e2e2e8' }}></th>
                          <th colSpan="2" style={{ padding: '10px', border: '1px solid #e2e2e8' }}>Arca</th>
                          <th colSpan="2" style={{ padding: '10px', border: '1px solid #e2e2e8' }}>Mastercard Standard / Visa Classic / Arca Mobile,Transfer</th>
                          <th colSpan="2" style={{ padding: '10px', border: '1px solid #e2e2e8' }}>Mastercard Gold / Visa Gold</th>
                          <th colSpan="2" style={{ padding: '10px', border: '1px solid #e2e2e8' }}>Visa Business</th>
                        </tr>
                        <tr style={{ backgroundColor: '#f9f9fb', borderBottom: '1px solid #e2e2e8' }}>
                          <th style={{ padding: '8px', border: '1px solid #e2e2e8' }}>Գումարային</th>
                          <th style={{ padding: '8px', border: '1px solid #e2e2e8' }}>Քանակային</th>
                          <th style={{ padding: '8px', border: '1px solid #e2e2e8' }}>Գումարային</th>
                          <th style={{ padding: '8px', border: '1px solid #e2e2e8' }}>Քանակային</th>
                          <th style={{ padding: '8px', border: '1px solid #e2e2e8' }}>Գումարային</th>
                          <th style={{ padding: '8px', border: '1px solid #e2e2e8' }}>Քանակային</th>
                          <th style={{ padding: '8px', border: '1px solid #e2e2e8' }}>Գումարային</th>
                          <th style={{ padding: '8px', border: '1px solid #e2e2e8' }}>Քանակային</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8', fontWeight: 'bold' }}>ՀՀ դրամ</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>300,000</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>10</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>1,000,000</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>10</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>2,000,000</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>10</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>1,000,000</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>10</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8', fontWeight: 'bold' }}>ԱՄՆ դոլար</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>-</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>-</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>2,000</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>10</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>3,000</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>10</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>2,000</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>10</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8', fontWeight: 'bold' }}>Եվրո</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>-</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>-</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>2,000</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>10</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>3,000</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>10</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>2,000</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>10</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8', fontWeight: 'bold' }}>ՌԴ ռուբլի</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>-</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>-</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>150,000</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>10</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>200,000</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>10</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>150,000</td>
                          <td style={{ padding: '8px', border: '1px solid #e2e2e8' }}>10</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <ul style={{ listStyleType: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li>Սահմանված սահմանաչափերը գերազանցող չափով գումարի կանխիկացման համար անհրաժեշտ է Բանկ ներկայացնել համապատասխան դիմում:</li>
                    <li>ՀՀ տարածքում բանկոմատների միջոցով կանխիկացման և կանխիկի մուտքագրման գործառնություններն իրականացվում են ՀՀ դրամով:</li>
                    <li>ՀՀ տարածքից դուրս գտնվող այլ բանկերի կանխիկացման կետերում կանխիկացման գործառնություններն իրականացվում են տվյալ բանկի կողմից առաջարկվող արժույթներով:</li>
                  </ul>

                  {/* Անկանխիկ վճարումներ */}
                  <h4 style={{ color: '#1d1d1f', fontSize: '16px', fontWeight: '700', marginTop: '24px' }}>
                    Անկանխիկ վճարումների իրականացում
                  </h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li>Քարտապանը Վճարային Քարտերով անկանխիկ վճարումներ կարող է իրականացնել տերմինալների, բանկոմատների և բանկային ինքնասպասարկման այլ սարքերի, EvocaTouch հավելվածի, էլեկտրոնային դրամապանակների, այլ մոբայլ հավելվածների միջոցով և ինտերնետ միջավայրում (վիրտուալ տերմինալների միջոցով` տվյալ կետի կողմից տվյալ վճարահաշվարկային համակարգի քարտերի ընդունման պարագայում):</li>
                    <li>Անկանխիկ վճարումների իրականացման դեպքում գործարքի թույլտվությունը Քարտապանի կողմից կարող է տրվել PIN ծածկագրի մուտքագրման, առևտրային անդորրագրի ստորագրման միջոցով կամ ոչ երես առ երես գործառնությունների դեպքում, ինչպես նաև ստացված OTP գաղտնաբառի մուտքագրմամբ:</li>
                    <li>Երես առ երես անկանխիկ գործառնությունների իրականացման ժամանակ կարող է պահանջվել անձը հաստատող փաստաթուղթ (անձնագիր կամ նույնականացման քարտ):</li>
                    <li>Վճարային Քարտով կատարված գործարքները հաստատող փաստաթղթերի` Բանկում առկա պատճենները Քարտապանը կարող է ստանալ Բանկից` համաձայն Բանկի սակագների:</li>
                  </ul>

                </div>
              </div>
            </div>

            {/* --- ACCORDION 4 --- */}
            <div className={`accordion-card ${openAccordion === 4 ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => toggleAccordion(4)}>
                <span>Արտարժույթով արտահայտված գործառնությունների կատարում</span>
                <span className="accordion-icon">❯</span>
              </button>
              <div className="accordion-body">
                <div className="accordion-content">
                  <p>Արտարժույթով գործարքների իրականացման դեպքում փոխարկումները կատարվում են Բանկի կողմից սահմանված փոխարժեքներով:</p>
                </div>
              </div>
            </div>

            {/* --- ACCORDION 5 --- */}
            <div className={`accordion-card ${openAccordion === 5 ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => toggleAccordion(5)}>
                <span>Վճարային Քարտի առգրավում/բռնագանձում</span>
                <span className="accordion-icon">❯</span>
              </button>
              <div className="accordion-body">
                <div className="accordion-content">
                  <p>Քարտի առգրավումը կամ բռնագանձումը իրականացվում է ՀՀ օրենսդրությամբ և Բանկի կանոնակարգերով սահմանված կարգով:</p>
                </div>
              </div>
            </div>

            {/* --- ACCORDION 6 --- */}
            <div className={`accordion-card ${openAccordion === 6 ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => toggleAccordion(6)}>
                <span>Վճարային Քարտի բլոկավորում/ապաբլոկավորում</span>
                <span className="accordion-icon">❯</span>
              </button>
              <div className="accordion-body">
                <div className="accordion-content">
                  <p>Քարտապանը կարող է անմիջապես բլոկավորել քարտը կորստի կամ գողության դեպքում՝ զանգահարելով Բանկ կամ EvocaTouch հավելվածի միջոցով:</p>
                </div>
              </div>
            </div>

            {/* --- ACCORDION 7 --- */}
            <div className={`accordion-card ${openAccordion === 7 ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => toggleAccordion(7)}>
                <span>Վճարային Քարտի վերաթողարկում</span>
                <span className="accordion-icon">❯</span>
              </button>
              <div className="accordion-body">
                <div className="accordion-content">
                  <p>Քարտի գործողության ժամկետը լրանալուց հետո այն կարող է վերաթողարկվել Հաճախորդի դիմումի համաձայն:</p>
                </div>
              </div>
            </div>

            {/* --- ACCORDION 8 --- */}
            <div className={`accordion-card ${openAccordion === 8 ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => toggleAccordion(8)}>
                <span>Քարտային գործառնությունների բողոքարկում</span>
                <span className="accordion-icon">❯</span>
              </button>
              <div className="accordion-body">
                <div className="accordion-content">
                  <p>Գործարքների հետ անհամաձայնության դեպքում Քարտապանը կարող է ներկայացնել բողոքարկման դիմում սահմանված ժամկետներում:</p>
                </div>
              </div>
            </div>

            {/* --- ACCORDION 9 --- */}
            <div className={`accordion-card ${openAccordion === 9 ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => toggleAccordion(9)}>
                <span>Քարտային հաշվի վերաբերյալ տեղեկատվության և Քաղվածքի տրամադրում</span>
                <span className="accordion-icon">❯</span>
              </button>
              <div className="accordion-body">
                <div className="accordion-content">
                  <p>Քաղվածքները տրամադրվում են ամսական կտրվածքով էլեկտրոնային փոստի կամ EvocaTouch հավելվածի միջոցով:</p>
                </div>
              </div>
            </div>

            {/* --- ACCORDION 10 --- */}
            <div className={`accordion-card ${openAccordion === 10 ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => toggleAccordion(10)}>
                <span>Վճարային Քարտի փակում</span>
                <span className="accordion-icon">❯</span>
              </button>
              <div className="accordion-body">
                <div className="accordion-content">
                  <p>Քարտային հաշիվը փակվում է Քարտապանի դիմումի հիման վրա՝ բոլոր պարտավորությունները լրիվ մարելուց հետո:</p>
                </div>
              </div>
            </div>

            {/* --- ACCORDION 11 --- */}
            <div className={`accordion-card ${openAccordion === 11 ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => toggleAccordion(11)}>
                <span>Օտարերկրյա Հաշիվների Հարկման Համապատասխանության Ակտի (FATCA) ծանուցում</span>
                <span className="accordion-icon">❯</span>
              </button>
              <div className="accordion-body">
                <div className="accordion-content">
                  <p>FATCA պահանջներին համապատասխան ԱՄՆ հարկատու հանդիսացող անձինք պարտավոր են տրամադրել համապատասխան տեղեկատվություն:</p>
                </div>
              </div>
            </div>

            {/* --- ACCORDION 12 --- */}
            <div className={`accordion-card ${openAccordion === 12 ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => toggleAccordion(12)}>
                <span>Քարտային գործառնությունների մոնիտորինգ և անվտանգություն</span>
                <span className="accordion-icon">❯</span>
              </button>
              <div className="accordion-body">
                <div className="accordion-content">
                  <p>Բանկն իրականացնում է շուրջօրյա մոնիտորինգ կասկածելի գործարքները հայտնաբերելու և կանխելու նպատակով:</p>
                </div>
              </div>
            </div>

            {/* --- ACCORDION 13 --- */}
            <div className={`accordion-card ${openAccordion === 13 ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => toggleAccordion(13)}>
                <span>Քարտի թոքենացում և մոբայլ (NFC) վճարումներ</span>
                <span className="accordion-icon">❯</span>
              </button>
              <div className="accordion-body">
                <div className="accordion-content">
                  <p>Անհպում վճարումները հնարավոր են Apple Pay, Google Pay և Բանկի մոբայլ հավելվածի (NFC) միջոցով:</p>
                </div>
              </div>
            </div>

            {/* --- ACCORDION 14 --- */}
            <div className={`accordion-card ${openAccordion === 14 ? 'active' : ''}`}>
              <button className="accordion-header" onClick={() => toggleAccordion(14)}>
                <span>Հնարավոր զեղծարարություններից խուսափելու համար․</span>
                <span className="accordion-icon">❯</span>
              </button>
              <div className="accordion-body">
                <div className="accordion-content">
                  <p>Երբեք մի փոխանցեք Ձեր PIN ծածկագիրը, CVV/CVC կոդը կամ SMS-ով ստացված ծածկագրերը երրորդ անձանց:</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-detail-page">
      <div className="card-detail-subnav">
        <div className="card-subnav-inner">
          <Link to="/cards" className={`subnav-tab ${location.pathname === '/cards' || location.pathname.startsWith('/card/') ? 'active' : ''}`}>Քարտեր</Link>
          <Link to="/card-issuance" className="subnav-tab">Քարտերի տրամադրում և սպասարկում</Link>
          <Link to="/social-cards" className="subnav-tab">Սոցիալական ապահովության վճարային քարտեր</Link>
          <Link to="/evoca-benefits" className="subnav-tab">Evoca Benefits</Link>
        </div>
      </div>

      <div className="card-hero-container">
        <div className="card-hero-wrapper">
          <div className="card-hero-text">
            {card?.tag && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ width: '16px', height: '16px', backgroundColor: '#6100e0', borderRadius: '2px' }}></span>
                <span style={{ color: '#6100e0', fontWeight: '700', fontSize: '15px' }}>{card.tag}</span>
              </div>
            )}
            <h1 className="card-hero-title">{card?.title}</h1>
            <p className="card-hero-description">{card?.subtitle || card?.description}</p>
            {card?.date && <p style={{ marginTop: '24px', color: '#8c8c96', fontWeight: '500', fontSize: '14px' }}>{card.date}</p>}
          </div>
          <div className="card-hero-media">
            {card?.img && <img src={card.img} alt={card.title} className="card-hero-img" />}
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
          <div className="card-content-body">
            {card?.paragraphs ? card.paragraphs.map((item, index) => <p key={index}>{item.text}</p>) : (
              <>
                <p>Այսուհետ <strong>Evocabank</strong>-ի հաճախորդներն ավելի հեշտ ու արագ կարող են կապ հաստատել Բանկի հետ` պարզապես հավաքելով <strong>8444</strong>:</p>
                <p>Հիշեցնենք նաև, որ <strong>Evocabank</strong>-ի հետ կարող եք նաև կապ հաստատել <span className="highlight-purple">+37410605555</span> հեռախոսահամարով:</p>
              </>
            )}
          </div>
          <div className="other-news-section" style={{ marginTop: '60px' }}>
            <h2 className="other-news-main-title">Այլ Նորություններ</h2>
            <div className="other-news-grid">
              {otherNews.map((news) => (
                <Link key={news.id} to={`/news/${news.id}`} className="news-card">
                  <div className="news-card-img-wrapper"><img src={news.img} alt={news.title} className="news-card-img" /></div>
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