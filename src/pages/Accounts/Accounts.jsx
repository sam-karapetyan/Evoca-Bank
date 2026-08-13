import React from 'react';
import './Accounts.css';

function Accounts() {
  const heroImageUrl = 'https://www.evoca.am/images-cache/menu/1/16111691720299/780x585.jpg';
  const bannerImageUrl = 'https://www.evoca.am/images-cache/menu/1/16111710051163/1920x530.jpg';

  return (
    <div className="AccountsPage">
      <div className="AccountsContainer">
        {/* Վերևի գլխավոր բլոկ (տեքստ + նկար) */}
        <div className="AccountsHeroCard">
          <div className="AccountsTextSection">
            <h1 className="AccountsTitle">Հաշիվների բացում և սպասարկում</h1>
            <p className="AccountsDescription">
              Առաջարկում ենք բացել դրամային և արտարժութային ընթացիկ բանկային հաշիվներ,
              որոնց սպասարկումն իրականացնում ենք մեր սակագների համաձայն։ Մեզ մոտ հաշիվներ
              կարող են բացել Հայաստանի ռեզիդենտ և ոչ ռեզիդենտ ֆիզիկական անձինք։
            </p>
          </div>

          <div className="AccountsImageSection">
            <img
              src={heroImageUrl}
              alt="Հաշիվների բացում և սպասարկում"
              className="AccountsImage"
            />
          </div>
        </div>

        {/* Ծանուցման / Պայմանագրային տեքստ */}
        <div className="AccountsNoticeSection">
          <p>
            Մեր և ձեր պայմանագրային փոխհարաբերությունները կարգավորվում են{' '}
            <strong>ՀԱՄԱԼԻՐ ԲԱՆԿԱՅԻՆ ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐԻ ՄԱՏՈՒՑՄԱՆ ՊԱՅՄԱՆՆԵՐՈՎ</strong>,
            որը հրապարակային առաջարկ (օֆերտա) է և ձեր կողմից համարվում է ընդունված այն պահից,
            երբ առձեռն կամ հեռակառավարման համակարգերի միջոցով մեզ եք ներկայացնում պատշաճ
            լրացված և վավերացված բանկային ծառայություններից օգտվելու հայտ/դիմում: Համալիր
            բանկային ծառայությունների մատուցման պայմաններին կարող եք ծանոթանալ{' '}
            <a href="#" className="AccountsLink">
              այստեղ
            </a>
            :
          </p>
        </div>
      </div>

      {/* Լայն բանները (Գրասենյակի նկարով և տեքստով) */}
      <div
        className="AccountsBannerSection"
        style={{ backgroundImage: `url(${bannerImageUrl})` }}
      >
        <div className="AccountsBannerOverlay">
          <h2 className="AccountsBannerText">
            Հաշիվներ բացելու նպատակով կարող եք դիմել մեր Գլխամասային գրասենյակ
            կամ ցանկացած մասնաճյուղ (բացառությամբ «Էրեբունի»-ի)։
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Accounts;