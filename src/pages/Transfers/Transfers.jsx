import React, { useState } from 'react';
import './Transfers.css';

function Transfers() {
  // activeTab-ը կառավարում է 1-ին և 2-րդ էջերի միջև անցումը
  const [activeTab, setActiveTab] = useState('transfers'); // 'transfers' կամ 'payment-systems'

  const transfersHeroImage = 'https://www.evoca.am/images-cache/menu/1/1611294285816/780x585.jpg';
  const bannerImageUrl = 'https://www.evoca.am/images-cache/menu/1/1611294541215/1920x530.jpg';

  return (
    <div className="TransfersPage">
      {/* 1. Վերևի մանուշակագույն Nav Bar-ը */}
      <div className="TransfersTopNav">
        <div className="TopNavContainer">
          <button
            className={`TopNavTab ${activeTab === 'transfers' ? 'active' : ''}`}
            onClick={() => setActiveTab('transfers')}
          >
            Դրամական փոխանցումներ
          </button>
          <button
            className={`TopNavTab ${activeTab === 'payment-systems' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment-systems')}
          >
            Վճարային համակարգեր
          </button>
        </div>
      </div>

      <div className="TransfersContainer">
        {/* 2. Breadcrumbs (Անհատ > Փոխանցումներ > ...) */}
        <div className="Breadcrumbs">
          <span>Անհատ</span>
          <span className="separator">›</span>
          <span>Փոխանցումներ</span>
          <span className="separator">›</span>
          <span className="active">
            {activeTab === 'transfers' ? 'Դրամական փոխանցումներ' : 'Վճարային համակարգեր'}
          </span>
        </div>

        {/* 1-ԻՆ ԷՋ: ԴՐԱՄԱԿԱՆ ՓՈԽԱՆՑՈՒՄՆԵՐ */}
        {activeTab === 'transfers' && (
          <>
            {/* Գլխավոր քարտ */}
            <div className="TransfersHeroCard">
              <div className="TransfersTextSection">
                <h1 className="TransfersTitle">Դրամական փոխանցումներ</h1>
                <p className="TransfersDescription">
                  Իրականացնում ենք դրամական փոխանցումներ Հայաստանի տարածքում և դեպի արտերկիր՝
                  դրամով և արտարժույթով։ Փոխանցումներն իրականացվում են միջազգային
                  բանկային ստանդարտներին համապատասխանող համակարգերով։
                </p>
              </div>

              <div className="TransfersImageSection">
                <img
                  src={transfersHeroImage}
                  alt="Դրամական փոխանցումներ"
                  className="TransfersImage"
                />
              </div>
            </div>

            {/* Ընդհանուր դրույթներ */}
            <div className="TransfersProvisionsSection">
              <h2 className="ProvisionsTitle">Ընդհանուր դրույթներ</h2>

              <p className="ProvisionText">
                Ձեր բանկային փոխանցումներն իրականացնում ենք՝ ղեկավարվելով «Բանկերի և բանկային
                գործունեության մասին» ՀՀ օրենքով, ՀՀ Կենտրոնական բանկի իրավական ակտերով, ՀՀ այլ
                իրավական ակտերով, թղթակից բանկերի հետ կնքված պայմանագրերով և սպասարկման
                սահմանված պայմաններով։
              </p>

              <p className="ProvisionText">
                Ձեր փոխանցումները կատարում ենք վճարման հանձնարարագրերի հիման վրա (կախված
                գումարի չափից, փոխանցման բնույթից և նպատակից՝ կարող են պահանջվել նաև այլ
                փաստաթղթեր)։
              </p>

              <p className="ProvisionText">
                Յուրաքանչյուր աշխատանքային օրվա ընթացքում՝ մինչև ժամը 15:30 ներկայացված
                վճարման հանձնարարագրերը կատարում ենք նույն բանկային օրը, իսկ ժամը 15:30-ից
                հետո ներկայացված վճարման հանձնարարագրերը՝ հաջորդ բանկային օրը։ Մինչև ժամը
                16:30 ներկայացված դրամով փոխանցումները (պետական և տեղական բյուջեի վճարներ,
                կոմունալ կամ սոցիալական այլ վճարներ) կատարման ենք ընդունում նույն բանկային օրը։
              </p>

              <p className="ProvisionText">
                Դրամով և արտարժույթով բանկային փոխանցումներ իրականացնելիս ձեզանից գանձում ենք{' '}
                <a href="#" className="ProvisionsLink">
                  միջնորդավճարներ
                </a>{' '}
                ըստ մեր դրույքաչափերի և սակագների։ Կոմունալ վճարների սպասարկման դիմաց
                միջնորդավճար չենք գանձում։ Միջնորդավճարները գանձվում են ՀՀ դրամով։
                Արտարժույթի տոկոսային հարաբերակցությամբ սահմանված միջնորդավճարները
                գանձվում են ՀՀ դրամով՝ հիմք ընդունելով գանձման օրը տվյալ արտարժույթի համար մեր
                կողմից սահմանված անկանխիկ վաճառքի փոխարժեքը։
              </p>

              <p className="ProvisionText">
                Մենք պարտավոր ենք տրամադրել յուրաքանչյուր փոխանցման կատարումը հավաստող
                փաստաթուղթ, որտեղ նշված կլինեն փոխանցման գումարը, արժույթը, միջնորդավճարի
                չափը և այլ մանրամասներ։
              </p>
            </div>
          </>
        )}

        {/* 2-ՐԴ ԷՋ: ՎՃԱՐԱՅԻՆ ՀԱՄԱԿԱՐԳԵՐ */}
        {activeTab === 'payment-systems' && (
          <div className="PaymentSystemsSection" style={{ padding: '40px 0', minHeight: '300px' }}>
            <h1 className="TransfersTitle">Վճարային համակարգեր</h1>
            <p className="TransfersDescription">
              Այստեղ կարող եք ծանոթանալ արտերկրյա և միջազգային վճարային համակարգերով
              իրականացվող փոխանցումների պայմաններին։
            </p>
          </div>
        )}
      </div>

      {/* Լայն բաններ 1-ին էջի համար */}
      {activeTab === 'transfers' && (
        <div
          className="TransfersBannerSection"
          style={{ backgroundImage: `url(${bannerImageUrl})` }}
        >
          <div className="TransfersBannerOverlay">
            <h2 className="TransfersBannerText">
              Կարող եք գումարներ փոխանցել ինչպես ձեր հաշվից, այնպես էլ առանց հաշվի բացման։
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transfers;