import React from 'react';
import './Loans.css';

const loansData = [
  {
    id: 1,
    title: 'Անգրավ սպառողական վարկ',
    description:
      'Նոր նպատակներ, անսպասելի ծախսեր կամ վաղուց պլանավորված գնումներ: Evocabank-ի անգրավ սպառողական վարկը կօգնի կյանքի կոչել Ձեր ծրագրերը՝ առանց գույքի գրավադրման:',
    image:
      'https://www.evoca.am/images-cache/loans/1/17364209867562/415x261.png',
    stats: [
      { topLabel: 'մինչև', value: '10 մլն. ֏', bottomLabel: 'Գումար' },
      { topLabel: 'մինչև', value: '60 ամիս', bottomLabel: 'Ժամկետ' },
      { topLabel: 'սկսած', value: '19%-ից', bottomLabel: 'Տոկոսադրույք' },
    ],
  },
  {
    id: 2,
    title: 'Ավտոմեքենայի ձեռքբերման նպատակով վարկ',
    description:
      'Նոր ավտոմեքենա գնելու որոշո՞ւմ եք կայացրել, արդեն ընտրե՞լ եք մակնիշը, մոդելը և գույնը: Evocabank-ը կօգնի ավարտին հասցնել Ձեր որոշումը:',
    image:
      'https://www.evoca.am/images-cache/loans/1/16994456305602/415x261.png',
    stats: [
      { topLabel: 'մինչև', value: '50 մլն. ֏', bottomLabel: 'Գումար' },
      { topLabel: 'մինչև', value: '84 ամիս', bottomLabel: 'Ժամկետ' },
      { topLabel: 'սկսած', value: '13%-ից', bottomLabel: 'Տոկոսադրույք' },
      { topLabel: 'սկսած', value: '10%-ից', bottomLabel: 'Կանխավճար' },
    ],
  },
  {
    id: 3,
    title: 'Գույքի գրավով ապահովված վարկ',
    description:
      'Ստացիր քեզ անհրաժեշտ ֆինանսավորումը՝ գրավադրելով անշարժ գույք կամ տրանսպորտային միջոց:',
    image:
      'https://www.evoca.am/images-cache/loans/1/1614244906092/415x261.jpg',
    stats: [
      { topLabel: 'մինչև', value: '150 մլն. ֏', bottomLabel: 'Գումար' },
      {
        topLabel: 'անշարժ գույքի գրավադրման դեպքում',
        value: '24-180 ամիս',
        bottomLabel: 'Վարկի մարման ժամկետը',
      },
      {
        topLabel: 'շարժական գույքի գրավադրման դեպքում',
        value: '60 ամիս',
        bottomLabel: 'Վարկի մարման ժամկետը',
      },
      { topLabel: 'Սկսած', value: '14%-ից', bottomLabel: 'Տոկոսադրույք' },
    ],
  },
  {
    id: 4,
    title: 'Արևային կայանների ձեռք բերման վարկ EvocaPOWER',
    description:
      'Քո տան էլեկտրաէներգիան արևից, իսկ վարկը՝ Evoca-ից: EvocaPOWER վարկատեսակը տրամադրվում է առանց կանխավճարի, գրավի և բանկ այցելելու անհրաժեշտության:',
    image:
      'https://www.evoca.am/images-cache/loans/1/16142653302177/415x261.jpg',
    stats: [
      { topLabel: 'Մինչև', value: '5 մլն. ֏', bottomLabel: 'Գումար' },
      { topLabel: 'Մինչև', value: '60 ամիս', bottomLabel: 'Ժամկետ' },
      { topLabel: 'Սկսած', value: '0%-ից', bottomLabel: 'Տոկոսադրույքից' },
    ],
  },
  {
    id: 5,
    title: 'Ոսկու գրավով (լոմբարդային) վարկ',
    description:
      'Ձևակերպե՛ք ոսկյա իրերի գրավով վարկեր Evocabank-ի մասնաճյուղերում հաշված րոպեների ընթացքում և ստացե՛ք վարկ ոսկու գնահատված արժեքի մինչև 150%-ի չափով:',
    image:
      'https://www.evoca.am/images-cache/loans/1/16131174467985/415x261.jpg',
    stats: [
      { topLabel: 'մինչև', value: '50 մլն. ֏', bottomLabel: 'Գումար' },
      { topLabel: '', value: '3-60 ամիս', bottomLabel: 'Ժամկետ' },
      { topLabel: 'սկսած', value: '15.5%-ից', bottomLabel: 'Տոկոսադրույք' },
      {
        topLabel: 'մինչև',
        value: '150%',
        bottomLabel: 'Վարկ / գրավ հարաբերակցություն',
      },
    ],
  },
  {
    id: 6,
    title: 'Տեղում Ապառիկ',
    description:
      'Ցանկանո՞ւմ ես ձեռք բերել քո նախընտրած ապրանքը կամ օգտվել ծառայությունից, բայց չես ցանկանում ամբողջ գումարը վճարել միանգամից: Օգտվիր Evoca-ի տեղումապառիկից:',
    image:
      'https://www.evoca.am/images-cache/loans/1/16142452902587/415x261.jpg',
    stats: [
      { topLabel: 'մինչև', value: '5 մլն. ֏', bottomLabel: 'Գումար' },
      { topLabel: 'մինչև', value: '60 ամիս', bottomLabel: 'Ժամկետ' },
      { topLabel: 'Սկսած', value: '0%-ից', bottomLabel: 'Տոկոսադրույք' },
    ],
  },
  {
    id: 7,
    title: 'Evoca աշխատավարձային փաթեթի շրջանակներում տրամադրվող վարկ',
    description:
      'Աշխատավա՞րձ ես ստանում մեր բանկային քարտով և ունե՞ս ընթացիկ ծախսերի հետ կապված խնդիրներ: Evocabank-ը քեզ կտրամադրի շահավետ պայմաններով վարկ:',
    image:
      'https://www.evoca.am/images-cache/loans/1/17552479364123/415x261.png',
    stats: [],
  },
  {
    id: 8,
    title: 'Բնակարանային հիփոթեքային վարկեր Բանկի ռեսուրսով',
    description:
      'Ձեռք բերեք Ձեր նախընտրած բնակարանը հիփոթեքային վարկավորման միջոցով:',
    image:
      'https://www.evoca.am/images-cache/loans/1/16142566831396/415x261.jpg',
    stats: [
      { topLabel: 'մինչև', value: '80 մլն. ֏', bottomLabel: 'Գումար' },
      { topLabel: 'մինչև', value: '240 ամիս', bottomLabel: 'Ժամկետ' },
      { topLabel: 'սկսած', value: '13.2%', bottomLabel: 'Տոկոսադրույք' },
    ],
  },
  {
    id: 9,
    title: 'Action',
    description:
      'Action online վարկ կարող ես ստանալ EvocaTOUCH հավելվածի միջոցով՝ 24/7 ռեժիմով, ցանկացած վայրից և ցանկացած ժամի:',
    image:
      'https://www.evoca.am/images-cache/loans/1/16142451996694/415x261.jpg',
    stats: [
      { topLabel: 'մինչև', value: '10 մլն ֏', bottomLabel: 'Սահմանաչափ' },
      { topLabel: 'մինչև', value: '60 ամիս', bottomLabel: 'Մարման ժամկետ' },
      {
        topLabel: 'սկսած',
        value: '18%-ից',
        bottomLabel: 'Տարեկան անվանական տոկոսադրույք',
      },
    ],
  },
  {
    id: 10,
    title: 'Հիփոթեքային վարկ ԼՂ-ից բռնի տեղահանված ընտանիքներին',
    description:
      'Evocabank-ը միշտ ձեր կողքին է: Առաջարկում ենք հատուկ պայմաններով հիփոթեքային վարկեր Լեռնային Ղարաբաղից բռնի տեղահանված ընտանիքներին:',
    image:
      'https://www.evoca.am/images-cache/loans/1/16142452390605/415x261.jpg',
    stats: [
      { topLabel: 'մինչև', value: '55 մլն ֏', bottomLabel: 'Գումար' },
      { topLabel: 'մինչև', value: '120 ամիս', bottomLabel: 'Մարման ժամկետ' },
      { topLabel: '', value: '13%', bottomLabel: 'Տոկոսադրույք' },
    ],
  },
];

function Loans() {
  return (
    <div className="LoansPageContainer">
      <div className="LoansList">
        {loansData.map((loan) => (
          <div key={loan.id} className="LoanCard">
            <div className="LoanCardImageWrapper">
              <img src={loan.image} alt={loan.title} className="LoanCardImage" />
            </div>

            <div className="LoanCardContent">
              <h2 className="LoanCardTitle">{loan.title}</h2>
              <p className="LoanCardDescription">{loan.description}</p>

              {loan.stats && loan.stats.length > 0 && (
                <div className="LoanCardStats">
                  {loan.stats.map((stat, idx) => (
                    <div key={idx} className="StatItem">
                      <span className="StatTopLabel">{stat.topLabel}</span>
                      <span className="StatValue">{stat.value}</span>
                      <span className="StatBottomLabel">{stat.bottomLabel}</span>
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

export default Loans;