import React from 'react';
import './EvocaSalary.css';

function EvocaSalary() {
  const salaryHeroImg = "https://www.evoca.am/images-cache/menu/1/17738355890361/780x585.png";

  return (
    <div className="salary-page">
      {/* Hero Section */}
      <section className="salary-hero">
        <div className="salary-hero-text">
          <h1 className="salary-title">EVOCA ԱՇԽԱՏԱՎԱՐՁԱՅԻՆ ՆԱԽԱԳԻԾ</h1>
          <p className="salary-subtitle">
            Քո աշխատավարձը կարող է քեզ տալ շատ ավելին: <br />
            Պարզապես պետք է ընտրել Evocabank-ը:
          </p>
        </div>
        <div className="salary-hero-img-box">
          <img src={salaryHeroImg} alt="Evoca Salary" className="salary-hero-img" />
        </div>
      </section>

      {/* Intro Description */}
      <section className="salary-intro">
        <p>
          Evoca աշխատավարձային նախագիծը մեկնարկել է նրանց համար, ովքեր, իրենց աշխատավարձը քարտին ստանալուց բացի, ցանկանում են նաև ստանալ <strong>նոր հնարավորություններ ու առավելություններ</strong>:
        </p>
      </section>

      {/* Benefits Sections */}
      <section className="salary-sections">
        
        {/* Card 1: Mastercard Gold */}
        <div className="salary-card">
          <h2>Բեր աշխատավարձդ Evoca, Ստացիր անվճար <span className="purple-text">Mastercard Gold</span></h2>
          <ul className="salary-list">
            <li>Պրեմիում դասի քարտ</li>
            <li>Հասանելի ամբողջ աշխարհում</li>
            <li>Գումարի անվտանգության բարձր մակարդակ</li>
            <li>Դրական մնացորդի նկատմամբ <strong>2% տարեկան տոկոսադրույք</strong></li>
          </ul>
        </div>

        {/* Card 2: Evoca Travel Card */}
        <div className="salary-card">
          <h2>Բեր աշխատավարձդ Evoca, Ստացիր 50% զեղչով <span className="purple-text">Evoca Travel Card</span></h2>
          <ul className="salary-list">
            <li>Մինչև <strong>1.5% cashback</strong> արտասահմանում իրականացրած վճարումների համար</li>
            <li>Անվճար <strong>6 մուտք</strong> Lounge Key սրահներ քեզ և հյուրերիդ համար</li>
            <li>Անվճար <strong>6 անգամ</strong> Fast track-ից օգտվելու հնարավորություն քեզ և հյուրերիդ համար</li>
            <li>Այլ ճամփորդական առավելություններ</li>
          </ul>
        </div>

        {/* Card 3: Evoca Benefits */}
        <div className="salary-card">
          <h2>Բեր աշխատավարձդ Evoca, Ստացիր մի շարք <span className="purple-text">Բենեֆիթներ</span></h2>
          <p className="card-subdesc">
            Դառնալով Evoca քարտապան՝ կունենաս հնարավորություն օգտվելու <strong>Evoca Benefits</strong> նախագծից և մեր 100-ից ավել գործընկերների մոտ կստանաս՝
          </p>
          <ul className="salary-list">
            <li>Մինչև <strong>25% զեղչ</strong></li>
            <li>Մինչև <strong>25% cashback</strong></li>
            <li>Նվեր քարտեր</li>
          </ul>
        </div>

        {/* Card 4: Loans */}
        <div className="salary-card">
          <h2>Բեր աշխատավարձդ Evoca, Ստացիր <span className="purple-text">ավելի ցածր տոկոսադրույքով վարկեր</span></h2>
          
          <div className="loan-sub-block">
            <h3>Օվերդրաֆտ կամ Մարման գրաֆիկով վարկ</h3>
            <ul className="salary-list">
              <li>Մինչև աշխատավարձի <strong>15-ապատիկի</strong> չափով</li>
              <li>Մինչև <strong>10 մլն դրամ</strong> գումար</li>
              <li>Մինչև <strong>60 ամիս</strong> մարման ժամկետ</li>
            </ul>
          </div>

          <div className="loan-sub-block">
            <h3>Ավտովարկ</h3>
            <ul className="salary-list">
              <li><strong>0.5%-ով ցածր</strong> տոկոսադրույք</li>
              <li>Մինչև <strong>50 մլն դրամ</strong> գումար</li>
              <li>Մինչև <strong>84 ամիս</strong> մարման ժամկետ</li>
              <li>Նախընտրած մեքենայի ձեռքբերում՝ ինչպես առաջնային, այնպես էլ երկրորդային շուկայից</li>
            </ul>
          </div>

          <div className="loan-sub-block">
            <h3>Անշարժ գույքի գրավով սպառողական վարկ</h3>
            <ul className="salary-list">
              <li><strong>0.5%-ով ցածր</strong> տոկոսադրույք</li>
              <li>Մինչև <strong>100 մլն դրամ</strong> գումար</li>
              <li>Մինչև <strong>120 ամիս</strong> մարման ժամկետ</li>
            </ul>
          </div>
        </div>

      </section>
    </div>
  );
}

export default EvocaSalary;