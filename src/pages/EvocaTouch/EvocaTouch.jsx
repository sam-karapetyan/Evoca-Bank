import React from 'react';
import './EvocaTouch.css';

function EvocaTouch() {
  const touchHeroImg = 'https://www.evoca.am/images-cache/menu/1/16781890566687/780x585.jpg'; // EvocaTOUCH Banner Image

  return (
    <div className="touch-page">
      <div className="touch-container">
        
        {/* Breadcrumb Navigation */}
        <div className="touch-breadcrumbs">
          <span>Անհատ</span>
          <span className="separator">›</span>
          <span className="active">EvocaTOUCH</span>
        </div>

        {/* Hero Banner Section */}
        <div className="touch-hero-card">
          <div className="touch-hero-text">
            <span className="badge">SoftPOS տեխնոլոգիա</span>
            <h1 className="touch-hero-title">EvocaTOUCH</h1>
            <p className="touch-hero-subtitle">
              Վճարումներն ընդունիր անմիջապես քո սմարթֆոնով՝ առանց ավանդական POS տերմինալի։
            </p>
          </div>
          <div className="touch-hero-img-box">
            <img src={touchHeroImg} alt="EvocaTOUCH Application" className="touch-hero-img" />
          </div>
        </div>

        {/* What is EvocaTOUCH Section */}
        <section className="touch-section">
          <h2 className="section-title">Ի՞նչ է EvocaTOUCH-ը</h2>
          <p className="section-desc">
            <strong>EvocaTOUCH</strong>-ը ժամանակակից ծրագրային լուծում է (SoftPOS), որը հնարավորություն է տալիս 
            <strong> Android </strong> օպերացիոն համակարգով և <strong>NFC</strong> չիպով աշխատող յուրաքանչյուր 
            սմարթֆոն կամ պլանշետ վերածել լիարժեք POS տերմինալի։
          </p>
        </section>

        {/* Features / Advantages Grid */}
        <section className="touch-section">
          <h2 className="section-title">EvocaTOUCH-ի առավելությունները</h2>
          
          <div className="touch-grid">
            <div className="touch-card">
              <div className="card-icon">📱</div>
              <h3>Շարժունակություն</h3>
              <p>Ընդունիր անհպում վճարումներ ցանկացած վայրում և ցանկացած պահի՝ միայն սմարթֆոնի միջոցով։</p>
            </div>

            <div className="touch-card">
              <div className="card-icon">💸</div>
              <h3>Խնայողություն</h3>
              <p>Չկան POS տերմինալների ձեռքբերման, վարձակալության կամ թղթային ժապավենների լրացուցիչ ծախսեր։</p>
            </div>

            <div className="touch-card">
              <div className="card-icon">🔒</div>
              <h3>Բարձր անվտանգություն</h3>
              <p>Գործարքներն իրականացվում են <strong>PCI DSS</strong> միջազգային անվտանգության չափանիշներին համապատասխան։</p>
            </div>

            <div className="touch-card">
              <div className="card-icon">🧾</div>
              <h3>Էլեկտրոնային անդորրագիր</h3>
              <p>Վճարման հաստատման անդորրագիրը հաճախորդին է ուղարկվում էլեկտրոնային եղանակով (SMS կամ Email)։</p>
            </div>
          </div>
        </section>

        {/* How it works / Accepted Cards */}
        <section className="touch-section info-box">
          <h2>Ընդունվող քարտեր և վճարային համակարգեր</h2>
          <p>
            EvocaTOUCH-ը հնարավորություն է տալիս ընդունել անհպում վճարումներ <strong>Visa</strong>, 
            <strong> Mastercard</strong>, <strong>ArCa</strong> քարտերով, ինչպես նաև <strong>Apple Pay</strong> և 
            <strong> Google Pay</strong> էլեկտրոնային դրամապանակներով։
          </p>
        </section>

      </div>
    </div>
  );
}

export default EvocaTouch;