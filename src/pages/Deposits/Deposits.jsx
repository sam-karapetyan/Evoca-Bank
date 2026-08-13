import React from 'react';
import './Deposits.css';

const depositsData = [
  {
    id: 1,
    title: 'Դասական ավանդ',
    description:
      'Ձեր անհոգ ապագայի համար առաջարկում ենք ավելացնել Ձեր խնայողությունները՝ ներդնելով Դասական ավանդ՝ կայուն և բարձր եկամտաբերությամբ:',
    image:
      'https://www.evoca.am/images-cache/deposits/1/1613390220029/415x261.jpg',
    stats: [
      { topLabel: 'Սկսած', value: '100,000 ֏', bottomLabel: 'Գումար' },
      { topLabel: '', value: '31-1,825 օր', bottomLabel: 'Ժամկետ' },
      { topLabel: 'Մինչև', value: '10.5% ֏', bottomLabel: 'Տոկոսադրույք' },
      { topLabel: 'սկսած', value: '100,000 ֏', bottomLabel: 'Համալրման հնարավորություն' },
    ],
  },
  {
    id: 2,
    title: 'Մանկական ավանդ',
    description:
      'Ձեր երեխայի անհոգ ապագայի համար առաջարկում ենք ներդնել «Մանկական» ավանդ: «Մանկական» ժամկետային ավանդն ընդունում ենք ֆիզիկական անձանցից՝ երեխաների անունով ներդնելու պայմանով:',
    image:
      'https://www.evoca.am/images-cache/deposits/1/16133900414285/415x261.jpg',
    stats: [
      { topLabel: 'Սկսած', value: '100,000 ֏', bottomLabel: 'Գումար' },
      { topLabel: 'մինչև', value: '18 լրանալը', bottomLabel: 'Ժամկետ' },
      { topLabel: '', value: '9.5% ֏', bottomLabel: 'Տոկոսադրույք' },
      { topLabel: 'սկսած', value: '40,000 ֏', bottomLabel: 'Համալրման հնարավորություն' },
    ],
  },
  {
    id: 3,
    title: 'Ավանդ Evoca Online',
    description:
      'Ցանկանո՞ւմ եք ներդնել ավանդ բարձր տոկոսադրույքով, բայց չունե՞ք ժամանակ: Ձևակերպե՛ք EvocaONLINE ավանդ՝ առանց բանկ այցելելու: Իսկ մենք բոլոր փաստաթղթերը կուղարկենք Ձեր էլ. հասցեին:',
    image:
      'https://www.evoca.am/images-cache/deposits/1/16133900122121/415x261.jpg',
    stats: [
      { topLabel: 'Սկսած', value: '100,000 ֏', bottomLabel: 'Գումար' },
      { topLabel: '', value: '31-1,825 օր', bottomLabel: 'Ժամկետ' },
      { topLabel: 'մինչև', value: '10.75% ֏', bottomLabel: 'Տոկոսադրույք' },
    ],
  },
];

function Deposits() {
  return (
    <div className="DepositsPageContainer">
      <h1 className="DepositsPageMainTitle">Ավանդներ</h1>
      <div className="DepositsList">
        {depositsData.map((deposit) => (
          <div key={deposit.id} className="DepositCard">
            <div className="DepositCardImageWrapper">
              <img
                src={deposit.image}
                alt={deposit.title}
                className="DepositCardImage"
              />
            </div>

            <div className="DepositCardContent">
              <h2 className="DepositCardTitle">{deposit.title}</h2>
              <p className="DepositCardDescription">{deposit.description}</p>

              {deposit.stats && deposit.stats.length > 0 && (
                <div className="DepositCardStats">
                  {deposit.stats.map((stat, idx) => (
                    <div key={idx} className="DepositStatItem">
                      <span className="DepositStatTopLabel">{stat.topLabel}</span>
                      <span className="DepositStatValue">{stat.value}</span>
                      <span className="DepositStatBottomLabel">
                        {stat.bottomLabel}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Deposits;