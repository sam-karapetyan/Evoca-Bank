import React from 'react';
import './Securities.css';

function Securities() {
  const heroImageUrl = 'https://www.evoca.am/images-cache/menu/1/16781890566687/780x585.jpg';

  return (
    <div className="SecuritiesPage">
      <div className="SecuritiesContainer">
        
        {/* Breadcrumb Navigation */}
        <div className="Breadcrumbs">
          <span>Անհատ</span>
          <span className="separator">›</span>
          <span>Արժեթղթեր</span>
          <span className="separator">›</span>
          <span className="active">Ներդրումային ծառայություններ</span>
        </div>

        {/* Hero Section */}
        <div className="SecuritiesHeroCard">
          <div className="SecuritiesTextSection">
            <h1 className="SecuritiesTitle">Ներդրումային ծառայություններ</h1>
            <p className="SecuritiesDescription">
              Evocabank-ն առաջարկում է ներդրումային ծառայություններ և տալիս
              եկամտի նոր աղբյուրների հնարավորություն՝ ձեր պահանջներին և
              ցանկություններին համապատասխան:
            </p>
          </div>
          <div className="SecuritiesImageSection">
            <img
              src={heroImageUrl}
              alt="Ներդրումային ծառայություններ"
              className="SecuritiesImage"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="SecuritiesContent">
          <p className="MainParagraph">
            Բանկն իր հաճախորդներին ներդրումային ծառայություններ է մատուցում ինչպես
            տեղական, այնպես էլ՝ միջազգային շուկաներում: Բանկի կողմից առաջարկվող
            ծառայությունները հասանելի են իրավաբանական և ֆիզիկական անձ հանդիսացող
            հաճախորդներին:
          </p>

          <h2 className="SectionSubheading">Ինչպե՞ս դառնալ հաճախորդ.</h2>

          <p className="DetailText">
            Ներդրումային ծառայություններից օգտվելու համար անհրաժեշտ է Բանկում
            ունենալ ընթացիկ բանկային հաշիվ, որի բացման համար պահանջվող
            փաստաթղթերին կարող եք ծանոթանալ <a href="#here" className="PurpleLink">այստեղ:</a>
          </p>

          <p className="DetailText">
            Բրոքերային հաշվի բացման համար անհրաժեշտ է այցելել Բանկի գլխամասային
            գրասենյակ:
          </p>

          {/* Contact Details */}
          <div className="ContactSection">
            <div className="ContactGroup">
              <h3 className="ContactTitle">Հասցե`</h3>
              <p className="ContactValue">Երևան, Հանրապետության 44/2</p>
            </div>

            <div className="ContactGroup">
              <h3 className="ContactTitle">Հետադարձ կապ`</h3>
              <p className="ContactValue">
                Հեռ.` <strong>374 33 777 453</strong> <br />
                <strong className="PhoneIndent">374 33 603 055</strong>
              </p>
              
              {/* Messengers */}
              <div className="SocialIcons">
                <span className="SocialIcon whatsapp">💬</span>
                <span className="SocialIcon telegram">✈️</span>
                <span className="SocialIcon viber">📞</span>
              </div>
            </div>

            <div className="ContactGroup">
              <p className="ContactValue">
                Էլ. հասցե`{' '}
                <a href="mailto:investsecurities@evoca.am" className="PurpleLink underline">
                  investsecurities@evoca.am
                </a>
              </p>
            </div>
          </div>

          {/* Warning Box */}
          <div className="WarningBox">
            <p>
              <strong>ՈՒՇԱԴՐՈՒԹՅՈՒՆ.</strong> Ֆինանսական շուկաներում
              գործարքների իրականացման հետ կապված <strong>ՌԻՍԿԸ ԿՐՈՒՄ Է ՀԱՃԱԽՈՐԴԸ:</strong>{' '}
              Բանկը <strong>ՉԻ ՓՈԽՀԱՏՈՒՑԵԼՈՒ</strong> հաճախորդի վնասները, եթե
              դրանք չեն պատճառվել Բանկի կողմից անբարեխիղճ վարքագծի արդյունքում:
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Securities;