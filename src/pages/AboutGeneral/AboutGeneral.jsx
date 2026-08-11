import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './aboutGeneral.css';

const historyData = [
  {
    year: '2026',
    text: 'Բանկը բացեց նոր «Աջափնյակ» մասնաճյուղը, կնքեց նոր միջազգային համագործակցության պայմանագրեր, մասնակցեց միջազգային կոնֆերանսների, արժանացավ հեղինակավոր մրցանակների և կյանքի կոչեց Երևանը գունավորող street art-երը:',
    image: 'https://www.evoca.am/images-cache/histories/1/17823049564741/450x330.png'
  },
  {
    year: '2025',
    text: 'Բանկը փոխեց իր կազմակերպաիրավական ձևը՝ ՓԲԸ-ից ԲԲԸ-ի: Evoca-ն և EBRD-ն ստորագրեցին համագործակցության համաձայնագիր: Ներկայացվեց Evoca Travel Card-ը: Մեկնարկեցին Evoca Partners Club-ն և Evoca Benefits նախագիծը:',
    image: 'https://www.evoca.am/images-cache/histories/1/17574211752061/450x330.png'
  },
  {
    year: '2024',
    text: 'Evocabank-ը ձեռք է բերել նոր միջազգային գործընկերներ, այդ թվում՝ EIB Global-ը, հովանավորել մի շարք նախագծեր, ներկայացրել իր նոր EvocaHOME օվերդրաֆտը, ինչպես նաև արժանացել միջազգային մրցանակների:',
    image: 'https://www.evoca.am/images-cache/histories/1/17240707281875/450x330.png'
  },
  {
    year: '2023',
    text: 'Evocabank-ը թողարկել է նոր, գերժամանակակից EvocaTOUCH 2 և EvocaINVEST հավելվածները: Գործընկերներին է ներկայացրել Evoca Digital քարտը, Action օնլայն վարկը, էլեկտրոնային ստորագրության e-Sign համակարգը:',
    image: 'https://www.evoca.am/images-cache/histories/1/17001230844576/450x330.jpg'
  },
  {
    year: '2022',
    text: 'Evoca-ն համալրել է կանոնադրական կապիտալը 3 մլրդ դրամով: Թողարկել է պարտատոմսեր: Ներկայացրել է Visa Vision քարտը: ՀայՓոստի հետ սկսել է համագործակցություն՝ հարմարավետ և հասանելի ֆինտեխ ծառայությունների գծով: Գործարկել է Evoca mobile POS-ը:',
    image: 'https://www.evoca.am/images-cache/histories/1/16542512333235/450x330.png'
  },
  {
    year: '2021',
    text: 'Evoca-ի նոր, կրեատիվ լուծումներով կայքը Awwwards թիմի կողմից արժանացել է 2 մրցանակի: Բանկը ներկայացրել է իր Evoca Gift Card-ը: Բանկը 2 փուլով թողարկել է պարտատոմսեր, այդ թվում՝ online տարբերակով:',
    image: 'https://www.evoca.am/images-cache/histories/1/16448252170155/450x330.png'
  }
];

function AboutGeneral() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const location = useLocation();

  const isStructure = location.pathname === '/structure';
  const isShareholders = location.pathname === '/shareholders';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleYearChange = (index) => {
    if (index === activeIndex || index < 0 || index >= historyData.length) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setAnimating(false);
    }, 200);
  };

  return (
    <div className="about-general-page">
      {/* Top Tab Navigation */}
      <div className="about-sub-header">
        <div className="about-sub-header-inner">
          <Link to="/about-general" className={`about-nav-item ${!isStructure && !isShareholders ? 'active' : ''}`}>Ընդհանուր</Link>
          <Link to="/structure" className={`about-nav-item ${isStructure ? 'active' : ''}`}>Կառուցվածք</Link>
          <Link to="/shareholders" className={`about-nav-item ${isShareholders ? 'active' : ''}`}>Բաժնետերեր</Link>
          <Link to="/partners" className="about-nav-item">Գործընկերներ</Link>
        </div>
      </div>

      <div className="about-container">
        {/* Page 2: Կառուցվածք */}
        {isStructure && (
          <>
            <div className="about-breadcrumb">
              <Link to="/">🏠</Link> &gt; Մեր մասին &gt; Evoca-ի մասին &gt; <strong>Կառուցվածք</strong>
            </div>

            <h1 className="about-main-title">Բանկի կառուցվածքը</h1>

            <div className="structure-chart-wrapper">
              <img 
                src="https://www.evoca.am/file_manager/structure/Organizational%20Structure-arm.png" 
                alt="Բանկի կառուցվածքը" 
                className="structure-img"
              />
            </div>
          </>
        )}

        {/* Page 3: Բաժնետերեր */}
        {isShareholders && (
          <>
            <div className="about-breadcrumb">
              <Link to="/">🏠</Link> &gt; Մեր մասին &gt; Evoca-ի մասին &gt; <strong>Բաժնետերեր</strong>
            </div>

            <h1 className="about-main-title">Բաժնետերեր</h1>

            <div className="shareholders-section">
              <div className="shareholder-card">
                <div className="shareholder-img-wrapper">
                  <img 
                    src="https://www.evoca.am/file_manager/Shareholders/Mareta%20Gevorkyan%20Evocabank.png" 
                    alt="Մարետա Գևորկյան" 
                  />
                </div>
                <div className="shareholder-info">
                  <h2 className="shareholder-name">Մարետա Գևորկյան</h2>
                  <div className="shareholder-bio">
                    <p>Մարետա Գևորկյանը միանձնյա տիրապետում է Evocabank-ի բաժնետոմսերի 100%-ին:</p>
                    <p>Նա ծնվել է Դիլիջանում, ավարտել Դիլիջանի միջնակարգ դպրոցը, այնուհետև՝ Երևանի պետական մանկավարժական ակադեմիան:</p>
                    <p>2008 թվականից բնակվելով Շվեյցարիայում՝ նա ակտիվորեն ներգրավված է բանկային, տարածքային զարգացման և սոցիալական նախաձեռնություններում՝ նպաստելով Հայաստանի կայուն զարգացմանը:</p>
                  </div>
                  <div className="shareholder-note">
                    <p><strong>Նշում.</strong> Բանկն անուղղակի նշանակալից մասնակից չունի:</p>
                  </div>
                </div>
              </div>

              {/* Necessary Information Static Section */}
              <div className="info-section">
                <h3 className="section-subtitle">ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ</h3>
                
                <div className="info-card">
                  <h4 className="info-card-title">Ուշադրություն.</h4>
                  <ul className="info-bullets">
                    <li>
                      «ԷՎՈԿԱԲԱՆԿ» ԲԲԸ-ի յուրաքանչյուր բաժնետեր, համաձայն «Բանկերի և բանկային գործունեության մասին» Հայաստանի Հանրապետության օրենքի 43-րդ հոդվածի 4-րդ մասի, իրավունք ունի ստանալու մեր վերջին տարեկան հաշվետվության և արտաքին աուդիտի եզրակացության պատճենները:
                    </li>
                    <li>
                      «ԷՎՈԿԱԲԱՆԿ» ԲԲԸ-ի տեղաբաշխված քվեարկող բաժնետոմսերի 2%-ին և ավելին տիրապետող յուրաքանչյուր բաժնետեր իրավունք ունի ստանալու «Բանկերի և բանկային գործունեության մասին» Հայաստանի Հանրապետության օրենքի 43-րդ հոդվածի 4-րդ և 5-րդ մասերով սահմանված տեղեկությունները:
                    </li>
                    <li>
                      Վերոնշյալ տեղեկությունները տրամադրում ենք ԱՆՎՃԱՐ՝ բաժնետիրոջ գրավոր դիմումը ստանալուց հետո 3 (երեք) աշխատանքային օրվա ընթացքում: Գրավոր դիմումը կարող է ներկայացվել առձեռն՝ մեր Գլխամասային գրասենյակում, ցանկացած մասնաճյուղում կամ ներկայացուցչությունում, էլեկտրոնային հասցեով՝ hello@evoca.am կամ փոստով՝ ՀՀ, 0010, ք. Երևան, Հանրապետության 44/2 հասցեով:
                    </li>
                    <li>
                      Շահութաբաժինների բաշխումը կատարվում է ՀՀ օրենսդրական ակտերի համաձայն և Բանկի կանոնադրությամբ սահմանված կարգով:
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Page 1: Ընդհանուր */}
        {!isStructure && !isShareholders && (
          <>
            <div className="about-breadcrumb">
              <Link to="/">🏠</Link> &gt; Մեր մասին &gt; Evoca-ի մասին &gt; <strong>Ընդհանուր</strong>
            </div>

            <h1 className="about-main-title">Ընդհանուր տեղեկություն</h1>

            <div className="about-intro-section">
              <div className="about-intro-text">
                <p>
                  <strong>Evocabank</strong>-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է, որն առանձնանում է տեղեկատվական նորագույն տեխնոլոգիաների ակտիվ կիրառմամբ:
                </p>
                <p>
                  Մենք հատուկ ուշադրություն ենք դարձնում մոբայլ ծառայությունների զարգացմանը:
                </p>
                <p>
                  Մենք աշխատում ենք mobile-first ֆորմատով՝ յուրաքանչյուր նոր ծառայություն նախագծելիս նախևառաջ հաշվի ենք առնում դրա՝ հավելվածով օգտագործման հարմարավետությունը:
                </p>
                <p>
                  Աշխարհը թվային է դառնում, և մենք պատրաստ ենք դրան:
                </p>
              </div>

              <div className="about-intro-image">
                <img 
                  src="https://www.evoca.am/images-cache/about_pages/1/16201288751575/780x570.png" 
                  alt="Evocabank" 
                />
              </div>
            </div>

            <div className="about-vision-section">
              <div className="about-vision-content">
                <h2 className="vision-title">Մեր տեսլականը</h2>
                <div className="vision-description">
                  <div className="vision-line"></div>
                  <p>
                    Դառնալ գլոբալ ֆինտեխ գործընկեր, որը միավորում է լավագույն փորձն ու տեխնոլոգիական նորարարությունները հարմարավետ և ճկուն ծառայություններապահովելու համար:
                  </p>
                </div>
              </div>
            </div>

            <div className="about-mission-section">
              <h2 className="mission-title">Մեր առաքելությունը</h2>
              
              <div className="mission-image-wrapper">
                <img 
                  src="https://www.evoca.am/images-cache/about_pages/1/160992374514/946x430.jpg" 
                  alt="Evoca Mission" 
                  className="mission-main-img"
                />
                
                <div className="mission-text-box">
                  <p>
                    Որպես human-first և խելացի ֆինտեխ ընկերություն՝ մենք հնարավորություն ենք տալիս մարդկանց երազելու ավելի համարձակ, բիզնեսներին՝ բացահայտելու նոր հորիզոններ, և հասարակությանը՝ կառուցելու ավելի լավ ապագա:
                  </p>
                </div>
              </div>
            </div>

            <div className="values-section">
              <h2 className="values-title">Արժեքներ և առաջնայնություններ</h2>
              <div className="values-grid">
                <div className="value-card">
                  <h3>Human-first</h3>
                  <p>
                    Առաջին տեղում միշտ մարդիկ են՝ մեր հաճախորդները, էքսպերտների թիմը և հասարակությունը: Չէ՞ որ աշխարհում ամեն ինչ արվում է մարդկանց կողմից մարդկանց համար:
                  </p>
                </div>
                <div className="value-card">
                  <h3>Նորարարություն</h3>
                  <p>
                    Նորարարությունը մեր ԴՆԹ-ի մասն է, իսկ փոփոխությունն այսօր միակ հաստատունն է: Մենք բաց ենք և պատրաստակամ զարգանալու համար:
                  </p>
                </div>
                <div className="value-card">
                  <h3>Դրական ազդեցություն</h3>
                  <p>
                    Մենք ձգտում ենք ունենալ դրական ազդեցություն և նպաստել աշխարհն ավելի լավը դարձնելուն:
                  </p>
                </div>
              </div>
            </div>

            <div className="csr-section">
              <h2 className="csr-title">Կորպորատիվ սոցիալական պատասխանատվություն</h2>
              <p className="csr-subtitle">
                Բանկը շարունակաբար աջակցություն է ցուցաբերում հանրության տարբեր խմբերին և հասարակական նախաձեռնություններին հետևյալ ոլորտներում՝
              </p>
              
              <div className="csr-grid">
                <div className="csr-item">
                  <div className="csr-dash"></div>
                  <p>Նորագույն տեխնոլոգիաների զարգացում, նորարար նախաձեռնություններ, startup-եր,</p>
                </div>
                <div className="csr-item">
                  <div className="csr-dash"></div>
                  <p>Երիտասարդության կրթական, գիտական և մշակութային նախաձեռնություններ,</p>
                </div>
                <div className="csr-item">
                  <div className="csr-dash"></div>
                  <p>Հասարակական կարևոր նշանակություն ունեցող նախաձեռնություններ,</p>
                </div>
                <div className="csr-item">
                  <div className="csr-dash"></div>
                  <p>Հասարակության առավել խոցելի խմբեր, մասնավորապես՝ ծնողազուրկ կամ հատուկ խնամքի տակ գտնվող երեխաներ:</p>
                </div>
              </div>
            </div>

            <div className="history-section">
              <h2 className="history-title">Բանկի պատմությունը</h2>

              <div className="timeline-controls">
                <button 
                  className="arrow-btn" 
                  onClick={() => handleYearChange(activeIndex + 1)}
                  disabled={activeIndex === historyData.length - 1}
                >
                  &larr;
                </button>

                <div className="timeline-track">
                  <div className="timeline-line-bg"></div>
                  
                  <div 
                    className="timeline-line-active" 
                    style={{
                      left: `${(activeIndex / (historyData.length - 1)) * 100}%`
                    }}
                  ></div>

                  {historyData.map((item, index) => (
                    <button 
                      key={item.year} 
                      className={`year-item ${index === activeIndex ? 'active' : ''}`}
                      onClick={() => handleYearChange(index)}
                    >
                      <span className="year-label">{item.year}</span>
                      <span className="year-dot"></span>
                    </button>
                  ))}
                </div>

                <button 
                  className="arrow-btn" 
                  onClick={() => handleYearChange(activeIndex - 1)}
                  disabled={activeIndex === 0}
                >
                  &rarr;
                </button>
              </div>

              <div className={`history-card-container ${animating ? 'animating' : ''}`}>
                <div className="history-text-box">
                  <p>{historyData[activeIndex].text}</p>
                </div>
                <div className="history-img-box">
                  <img 
                    src={historyData[activeIndex].image} 
                    alt={`Evoca history ${historyData[activeIndex].year}`} 
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AboutGeneral;