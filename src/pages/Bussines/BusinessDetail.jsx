import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './BusinessDetail.css';

const businessData = {
  1: {
    id: 1,
    category: "Բիզնես վարկեր",
    title: "Արագ բիզնես վարկ/վարկային գիծ",
    subtitle: "Արագ ֆինանսավորում Ձեր բիզնեսի զարգացման համար միայն երաշխավորությամբ և ցածր տոկոսադրույքով:",
    image: "https://www.evoca.am/images-cache/loans/1/17721008940374/415x261.png",
    description: "Evocabank-ի Արագ բիզնես վարկը/Վարկային գիծը այն բիզնեսների համար է, որոնք ցանկանում են արագ ներդրումներ՝ առանց ավելորդ փաստաթղթաշրջանառության և բարդ ընթացակարգերի:",
    suitableTitle: "Արագ բիզնես վարկը, վարկային գիծը հարմար է՝",
    suitableList: [
      "շրջանառու միջոցների համալրման,",
      "հիմնական միջոցների ձեռքբերման,",
      "ընթացիկ ծախսերի ֆինանսավորման,",
      "կրեդիտորական պարտքերի մարման,",
      "և այլ բիզնես նպատակների համար:"
    ],
    providedTitle: "Վարկը/Վարկային գիծը տրամադրվում է՝",
    providedList: [
      { highlight: "ԱՌԱՆՑ", text: "ֆինանսական վերլուծության," },
      { highlight: "ԱՌԱՆՑ", text: "գրավի" },
      { highlight: "ԱՌԱՆՑ", text: "հայտի ուսումնասիրության վճարի" },
      { highlight: "ՄԻԱՅՆ", text: "երաշխավորությամբ" }
    ],
    footerText: "Անկախ նրանից՝ Evocabank-ի հաճախորդ եք, թե ոչ, եթե ունեք գործող բիզնես և հստակ նպատակ, վարկը, վարկային գիծը հենց Ձեզ համար է:",
    currencies: ["֏", "$", "€"],
    stats: [
      { value: "60 ամիս", label: "Ժամկետ" },
      { value: "30 մլն ֏", label: "Սահմանաչափ կամ համարժեք արտարժույթ" },
      { value: "9.22%-17.89%", label: "Տարեկան տոկոսադրույք" }
    ]
  },
  2: {
    id: 2,
    category: "Բիզնես վարկեր",
    title: "Բիզնես վարկերի վերաֆինանսավորում",
    subtitle: "Տեղափոխեք Ձեր բիզնես վարկը Evocabank, ստացեք վարկի վերաֆինանսավորում և լրացուցիչ ֆինանսավորում՝ ավելի հարմար պայմաններով:",
    image: "https://www.evoca.am/images-cache/loans/1/17749381045652/415x261.png",
    description: "Վերաֆինանսավորման միջոցով Դուք կարող եք միավորել Ձեր առկա բոլոր վարկերը, նվազեցնել ամսական վճարները և ստանալ լրացուցիչ դրամական միջոցներ ձեր բիզնեսի համար։",
    suitableTitle: "Վերաֆինանսավորումը հարմար է՝",
    suitableList: [
      "վարկային բեռի թեթևացման,",
      "տոկոսադրույքի նվազեցման,",
      "լրացուցիչ ֆինանսական միջոցների ներգրավման,",
      "մարման ժամկետների երկարաձգման համար:"
    ],
    providedTitle: "Վերաֆինանսավորումը տրամադրվում է՝",
    providedList: [
      { highlight: "ԱՌԱՆՑ", text: "լրացուցիչ միջնորդավճարների" },
      { highlight: "ԱՐԱԳ", text: "որոշման կայացմամբ" },
      { highlight: "ՃԿՈՒՆ", text: "մարման ժամանակացույցով" }
    ],
    footerText: "Եթե ցանկանում եք բարելավել Ձեր ընթացիկ վարկային պայմանները, Evocabank-ն առաջարկում է լավագույն լուծումները:",
    currencies: ["֏", "$"],
    stats: [
      { value: "36-120 ամիս", label: "Ժամկետ" },
      { value: "15մլն - 500մլն", label: "ՀՀ դրամ կամ համարժեք արտարժույթ" },
      { value: "Սկսած 12%", label: "Տարեկան անվանական տոկոսադրույք" }
    ]
  },
  3: {
    id: 3,
    category: "Բիզնես վարկեր",
    title: "Պարտատոմսերով ապահովված վարկ",
    subtitle: "Ստացեք վարկ՝ Բանկի պարտատոմսերի գրավով և շարունակեք զարգացնել Ձեր բիզնեսը:",
    image: "https://www.evoca.am/images-cache/loans/1/17822121684763/415x261.png",
    description: "Բանկի կողմից թողարկված պարտատոմսերով ապահովված վարկերը տրամադրվում են ռեկորդային арագությամբ և նվազագույն փաստաթղթավորմամբ։",
    suitableTitle: "Վարկը հարմար է՝",
    suitableList: [
      "անհապաղ դրամական միջոցների ստացման,",
      "պարտատոմսերի եկամտաբերությունը չկորցնելու,",
      "կարճաժամկետ բիզնես ծրագրերի իրականացման համար:"
    ],
    providedTitle: "Վարկը տրամադրվում է՝",
    providedList: [
      { highlight: "ԱՌԱՆՑ", text: "եկամուտների հաստատման" },
      { highlight: "ԱՆՄԻՋԱՊԵՍ", text: "պարտատոմսերի գրավադրմամբ" }
    ],
    footerText: "Օգտագործեք Ձեր ներդրումների ներուժը առանց դրանք վաճառելու:",
    currencies: ["֏", "$", "€"],
    stats: [
      { value: "36 ամիս", label: "Ժամկետ" },
      { value: "500 մլն ֏", label: "Սահմանաչափ կամ համարժեք արտարժույթ" },
      { value: "8%", label: "Տոկոսադրույքի սուբսիդավորման չափ" }
    ]
  }
};

function BusinessDetail() {
  const { id } = useParams();
  const item = businessData[id] || businessData[1];

  return (
    <div className="evoca-detail-page">
      <div className="evoca-top-purple-bar">
        <div className="evoca-container">
          <span className="evoca-category-badge">{item.category}</span>
        </div>
      </div>

      <div className="evoca-hero-section">
        <div className="evoca-container evoca-hero-container">
          <div className="evoca-hero-text">
            <h1>{item.title}</h1>
            <p>{item.subtitle}</p>
          </div>
          <div className="evoca-hero-image">
            <img src={item.image} alt={item.title} />
          </div>
        </div>
      </div>

      <div className="evoca-container evoca-main-grid">
        <div className="evoca-left-content">
          <p className="evoca-main-desc">{item.description}</p>

          <h3 className="evoca-section-title">{item.suitableTitle}</h3>
          <ul className="evoca-bullet-list">
            {item.suitableList.map((text, idx) => (
              <li key={idx}>
                <span className="purple-dot">•</span> {text}
              </li>
            ))}
          </ul>

          <h3 className="evoca-section-title">{item.providedTitle}</h3>
          <ul className="evoca-bullet-list">
            {item.providedList.map((row, idx) => (
              <li key={idx}>
                <span className="purple-dot">•</span>{" "}
                <strong className="purple-bold">{row.highlight}</strong> {row.text}
              </li>
            ))}
          </ul>

          <p className="evoca-footer-desc">{item.footerText}</p>

          <div className="evoca-actions">
            <button className="evoca-apply-btn">Դիմել առցանց</button>
            <Link to="/business" className="evoca-back-link">
              ← Վերադառնալ
            </Link>
          </div>
        </div>

        <div className="evoca-right-sidebar">
          <div className="evoca-param-card">
            <div className="evoca-currencies-row">
              {item.currencies.map((curr, idx) => (
                <div key={idx} className="evoca-curr-badge">
                  {curr}
                </div>
              ))}
            </div>

            <div className="evoca-stats-table">
              {item.stats.map((stat, idx) => (
                <div key={idx} className="evoca-table-row">
                  <div className="evoca-stat-value">{stat.value}</div>
                  <div className="evoca-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessDetail;