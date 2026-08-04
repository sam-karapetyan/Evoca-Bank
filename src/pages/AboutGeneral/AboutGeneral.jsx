import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AboutGeneral.css';

function AboutGeneral() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Ֆունկցիա՝ ստուգելու համար, թե ո՞ր էջն է ակտիվ
  const isActive = (path) => location.pathname === path;

  return (
    <div className="about-general-page">
      
      {/* 1. Sub-Header Մանուշակագույն Մենյու (Link-երով) */}
      <div className="about-sub-header">
        <div className="about-sub-header-inner">
          <Link 
            to="/about-general" 
            className={`about-nav-item ${isActive('/about-general') ? 'active' : ''}`}
          >
            Ընդհանուր
          </Link>

          <Link 
            to="/structure" 
            className={`about-nav-item ${isActive('/structure') ? 'active' : ''}`}
          >
            Կառուցվածք
          </Link>

          <Link 
            to="/shareholders" 
            className={`about-nav-item ${isActive('/shareholders') ? 'active' : ''}`}
          >
            Բաժնետերեր
          </Link>

          <Link 
            to="/management" 
            className={`about-nav-item ${isActive('/management') ? 'active' : ''}`}
          >
            Ղեկավարություն
          </Link>

          <Link 
            to="/partners" 
            className={`about-nav-item ${isActive('/partners') ? 'active' : ''}`}
          >
            Գործընկերներ
          </Link>

          <Link 
            to="/awards" 
            className={`about-nav-item ${isActive('/awards') ? 'active' : ''}`}
          >
            Մրցանակներ
          </Link>

          <Link 
            to="/reviews" 
            className={`about-nav-item ${isActive('/reviews') ? 'active' : ''}`}
          >
            Կարծիքներ
          </Link>

          <Link 
            to="/csr" 
            className={`about-nav-item ${isActive('/csr') ? 'active' : ''}`}
          >
            CSR
          </Link>
        </div>
      </div>

      <div className="about-container">
        {/* Breadcrumb */}
        <div className="about-breadcrumb">
          <span>🏠 &gt; Մեր մասին &gt; Evoca-ի մասին &gt; </span>
          <strong>Ընդհանուր</strong>
        </div>

        {/* 2. Ընդհանուր տեղեկատվություն */}
        <h1 className="about-main-title">Ընդհանուր տեղեկատվություն</h1>
        
        <div className="about-intro-section">
          <div className="about-intro-text">
            <p><strong style={{ color: '#6100e0' }}>Evocabank</strong>-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է, որն առանձնանում է տեղեկատվական նորագույն տեխնոլոգիաների ակտիվ կիրառմամբ:</p>
            <p>Մենք հատուկ ուշադրություն ենք դարձնում մոբայլ ծառայությունների զարգացմանը:</p>
            <p>Մենք աշխատում ենք mobile-first ֆորմատով՝ յուրաքանչյուր նոր ծառայություն նախագծելիս նախևառաջ հաշվի ենք առնում դրա՝ հավելվածով օգտագործման հարմարավետությունը:</p>
            <p>Աշխարհը թվային է դառնում, և մենք պատրաստ ենք դրան:</p>
          </div>
          <div className="about-intro-image">
            <img 
              src="https://www.evoca.am/images-cache/about_pages/1/16201288751575/780x570.png" 
              alt="Evoca Digital" 
            />
          </div>
        </div>
      </div>

      {/* 3. Մեր տեսլականը */}
      <div className="about-vision-section">
        <div className="about-vision-content">
          <h2 className="vision-title">Մեր տեսլականը</h2>
          <div className="vision-description">
            <div className="vision-line"></div>
            <p>Դառնալ գլոբալ ֆինտեխ գործընկեր, որը միավորում է լավագույն փորձն ու տեխնոլոգիական նորարարությունները հարմարավետ և ճկուն ծառայություններ ապահովելու համար:</p>
          </div>
        </div>
      </div>

      {/* 4. Մեր առաքելությունը */}
      <div className="about-mission-section">
        <div className="about-container">
          <h2 className="mission-title">Մեր առաքելությունը</h2>
          <div className="mission-image-wrapper">
            <img 
              src="https://www.evoca.am/images-cache/about_pages/1/16201289115712/1180x600.jpg" 
              alt="Evoca Office" 
              className="mission-main-img" 
            />
            <div className="mission-text-box">
              <p>Որպես human-first և խելացի ֆինտեխ ընկերություն՝ մենք հնարավորություն ենք տալիս մարդկանց երազել ավելի համարձակ, բիզնեսներին՝ բացահայտել նոր հորիզոններ, և հասարակությանը՝ կառուցել ավելի լավ ապագա:</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Այլ Նորություններ */}
      <div className="about-container news-section">
        <h2 className="news-title">Այլ Նորություններ</h2>
        <div className="news-cards-grid">
          
          <div className="news-card">
            <img src="https://www.evoca.am/images-cache/news/1/16201288751575/780x570.png" alt="News 1" />
            <div className="news-card-content">
              <h3>Evocabank-ը և Green Rock-ը մեկնարկեցին Բանկի նոր գլխամասի նախագիծը</h3>
              <span>30.07.2026</span>
            </div>
          </div>

          <div className="news-card">
            <img src="https://www.evoca.am/images-cache/news/2/16201288751575/780x570.png" alt="News 2" />
            <div className="news-card-content">
              <h3>Evoca-ի ղեկավարները հաջողությամբ ավարտեցին Generative AI դասընթացը</h3>
              <span>17.07.2026</span>
            </div>
          </div>

          <div className="news-card">
            <div className="news-card-purple-bg">
              <h2>evocaBANK</h2>
            </div>
            <div className="news-card-content">
              <h3>ՊԱՐԶԱԲԱՆՈՒՄ</h3>
              <span>05.06.2026</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default AboutGeneral;