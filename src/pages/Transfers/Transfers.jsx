import React, { useState } from 'react';
import './Transfers.css';

function Transfers() {
  const [activeTab, setActiveTab] = useState('transfers'); // 'transfers' կամ 'payment-systems'

  const transfersHeroImage = 'https://www.evoca.am/images-cache/menu/1/1611294285816/780x585.jpg';
  const bannerImageUrl = 'https://www.evoca.am/images-cache/menu/1/1611294541215/1920x530.jpg';

  // Վճարային համակարգերի տվյալները (6 քարտերը)
  const paymentSystemsList = [
    {
      id: 1,
      logo: 'https://www.evoca.am/images-cache/payment_systems/1/1738743146575/200x100.png',
      description: 'MoneyTun-ը գործում է 2007 թվականից: Կազմակերպության նպատակը Ամերիկայի և Հայաստանի միջև ապահով ու պաշտպանված գործարքների ապահովումն է` հիմնված տասնամյակների փորձի վրա: Դրամական փոխանցումները կազմում են MoneyTun-ի կողմից մատուցվող ծառայությունների զգալի մասը:',
      phoneTitle: 'MoneyTun Հաճախորդների սպասարկման հեռախոսահամար`',
      phone: '+374 10 27 72 85',
      scheduleTitle: 'Աշխատանքային գրաֆիկ`',
      schedule: [
        'Երկուշաբթի-ուրբաթ 10:00-17:30',
        'Շաբաթ 10:00-14:00',
        'Կիրակի 10:00-13:00'
      ]
    },
    {
      id: 2,
      logo: 'https://www.evoca.am/images-cache/payment_systems/1/16510581265332/200x100.png',
      description: 'Գործում է 182 երկրի ավելի քան 509,000 սպասարկման կետերում: Փոխանցումները կատարվում են դոլարով և եվրոյով: Միջնորդավճարը գանձվում է` ըստ RIA համակարգի սահմանած սակագների:',
      phoneTitle: 'Ria Հաճախորդների սպասարկման հեռախոսահամար Հայաստանի համար`',
      phone: '+374 94 23 59 00',
      scheduleTitle: 'Աշխատանքային գրաֆիկ`',
      schedule: ['երկուշաբթի-ուրբաթ, 09:00-18:00', '(Երևանի ժամանակով)'],
      languagesTitle: 'Հաճախորդների աջակցության լեզուներ`',
      languages: 'ռուսերեն, անգլերեն'
    },
    {
      id: 3,
      logo: 'https://www.evoca.am/images-cache/payment_systems/1/17304660969195/200x100.png',
      description: 'UBPay – ը արագ դրամական փոխանցումների համակարգ է նախատեսված ֆիզիկական անձանց միջև ոչ առևտրային դրամական փոխանցումների իրականացման համար: Համակարգի միջոցով կարող եք իրականացնել փոխանցումներ Հայաստանից դեպի ՌԴ և հակառակ ուղղությամբ:',
      phoneTitle: 'UBPay Հաճախորդների սպասարկման հեռախոսահամար`',
      phone: '+374 43 00 49 35'
    },
    {
      id: 4,
      logo: 'https://www.evoca.am/images-cache/payment_systems/1/16133289933621/200x100.png',
      description: 'Գործում է 90 երկրի ավելի քան 57,000 կետերում (Ռուսաստան, ԱՄՆ այլ երկրներ, Մեծ Բրիտանիա, Չինաստան, Եվրոպական երկրներ և այլն): Փոխանցումները կատարվում են ռուբլիով, դոլարով և եվրոյով: Միջնորդավճարը գանձվում է` ըստ IntelExpress-ի սահմանած սակագների:',
      phoneTitle: 'INTELEXPRESS Հաճախորդների սպասարկման հեռախոսահամար`',
      phone: '+374 10 54 33 21'
    },
    {
      id: 5,
      logo: 'https://www.evoca.am/images-cache/payment_systems/1/17651707946608/200x100.png',
      description: '«ՍՏԱԿ» դրամական փոխանցումների հայաստանյան միասնական համակարգի գործունեության նպատակը ռեզիդենտ և ոչ ռեզիդենտ հաճախորդների համար պատշաճ որակի դրամական փոխանցումների իրականացման կազմակերպումն է:\n\nՀամակարգը հնարավորություն է տալիս կատարել և ստանալ փոխանցումներ դոլարով և, ինչպես նաև եվրոյով:'
    },
    {
      id: 6,
      logo: 'https://www.evoca.am/images-cache/payment_systems/1/17651703221475/200x100.png',
      description: 'Գործում է 170 երկրի ավելի քան 125,000 կետերում: Արտերկրից Հայաստան փոխանցվում է դոլար և եվրո, իսկ Հայաստանից արտերկիր` միայն դոլար: Միջնորդավճարը գանձվում է ըստ MoneyGram-ի սահմանած սանդղակի:',
      phoneTitle: 'MoneyGram Հաճախորդների սպասարկման հեռախոսահամար`',
      phone: '1-800-926-9400'
    }
  ];

  return (
    <div className="TransfersPage">
      {/* Վերևի մանուշակագույն Navbar */}
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
        {/* Breadcrumb Navigation */}
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
                հետո ներկայացված վճարման հանձնարարագրերը՝ հաջորդ բանկային օրը։
              </p>
            </div>
          </>
        )}

        {/* 2-ՐԴ ԷՋ: ՎՃԱՐԱՅԻՆ ՀԱՄԱԿԱՐԳԵՐ (3-ական քարտերով grid) */}
        {activeTab === 'payment-systems' && (
          <div className="PaymentSystemsGrid">
            {paymentSystemsList.map((item) => (
              <div className="PaymentSystemCard" key={item.id}>
                {/* Լոգո */}
                <div className="PaymentCardLogoContainer">
                  <img src={item.logo} alt="Payment System Logo" className="PaymentCardLogo" />
                </div>

                {/* Նկարագրություն */}
                <p className="PaymentCardDescription">{item.description}</p>

                {/* Սպասարկման մանրամասներ (եթե առկա են) */}
                {(item.phoneTitle || item.scheduleTitle) && (
                  <div className="PaymentCardFooter">
                    <hr className="PaymentCardDivider" />

                    {item.phoneTitle && (
                      <div className="FooterSection">
                        <span className="FooterTitle">{item.phoneTitle}</span>
                        <span className="FooterValue PhoneValue">{item.phone}</span>
                      </div>
                    )}

                    {item.scheduleTitle && (
                      <div className="FooterSection">
                        <span className="FooterTitle">{item.scheduleTitle}</span>
                        {item.schedule.map((line, idx) => (
                          <span className="FooterValue" key={idx}>{line}</span>
                        ))}
                      </div>
                    )}

                    {item.languagesTitle && (
                      <div className="FooterSection">
                        <span className="FooterTitle">{item.languagesTitle}</span>
                        <span className="FooterValue">{item.languages}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Բաններ միայն առաջին էջում */}
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