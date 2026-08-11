import React from 'react';
import { Link } from 'react-router-dom';
import '../Bussines/Bussiness.css';

function Business() {
  const businessItems = [
    {
      id: 1,
      title: "Արագ բիզնես վարկ/վարկային գիծ",
      description: "Արագ ֆինանսավորում Ձեր բիզնեսի զարգացման համար միայն երաշխավորությամբ և ցածր տոկոսադրույքով:",
      image: "https://www.evoca.am/images-cache/loans/1/17721008940374/415x261.png",
      link: "/business/fast-loan",
      stats: [
        { label: "Ժամկետ", value: "Մինչև 60 ամիս" },
        { label: "Սահմանաչափ կամ համարժեք արտարժույթ", value: "Մինչև 30 մլն ֏" },
        { label: "Տարեկան տոկոսադրույք", value: "9.22%-17.89%" }
      ]
    },
    {
      id: 2,
      title: "Բիզնես վարկերի վերաֆինանսավորում",
      description: "Տեղափոխեք Ձեր բիզնես վարկը Evocabank, ստացեք վարկի վերաֆինանսավորում և լրացուցիչ ֆինանսավորում՝ ավելի հարմար պայմաններով:",
      image: "https://www.evoca.am/images-cache/loans/1/17749381045652/415x261.png",
      link: "/business/refinancing",
      stats: [
        { label: "Ժամկետ", value: "36-120 ամիս" },
        { label: "ՀՀ դրամ կամ համարժեք արտարժույթ", value: "15մլն - 500մլն" },
        { label: "Տարեկան անվանական տոկոսադրույք", value: "Սկսած 12%" }
      ]
    },
    {
      id: 3,
      title: "Պարտատոմսերովապահովված վարկ",
      description: "Ստացեք վարկ՝ Բանկի պարտատոմսերի գրավով և շարունակեք զարգացնել Ձեր բիզնեսը:",
      image: "https://www.evoca.am/images-cache/loans/1/17822121684763/415x261.png",
      link: "/business/bonds-loan",
      stats: [
        { label: "Ժամկետ", value: "Մինչև 36 ամիս" },
        { label: "Սահմանաչափ կամ համարժեք արտարժույթ", value: "Մինչև 500 մլն ֏" },
        { label: "Տոկոսադրույքի սուբսիդավորման չափ", value: "8%" }
      ]
    }
  ];

  return (
    <div className="business-page">
      <div className="business-container">
        {/* Breadcrumb */}
        <div className="business-breadcrumb">
          <Link to="/">🏠 Գլխավոր</Link> &gt; <span>Բիզնես</span>
        </div>

        <h1 className="business-main-title">Բիզնես վարկեր</h1>

        {/* Business Horizontal Cards List */}
        <div className="business-list">
          {businessItems.map((item) => (
            <div key={item.id} className="business-horizontal-card">
              <div className="business-card-image-box">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="business-card-info">
                <h2>{item.title}</h2>
                <p className="business-desc">{item.description}</p>

                {/* Stats row */}
                <div className="business-stats-row">
                  {item.stats.map((stat, idx) => (
                    <div key={idx} className="business-stat-item">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Link to={item.link} className="business-more-btn">
                  Մանրամասն &gt;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Business;