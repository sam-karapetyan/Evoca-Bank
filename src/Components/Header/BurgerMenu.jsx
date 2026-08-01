import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

import bgDemq from '../../assets/burgermenudemq.png'; 
import logoImg from '../../assets/evocabank.png'; 

function BurgerMenu({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('individual');

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .SideMenuContainer {
          position: fixed;
          top: 0;
          right: 0;
          width: 100vw;
          height: 100vh;
          background-color: #121216;
          z-index: 9999;
          display: flex;
          color: white;
          animation: slideIn 0.35s ease-in-out;
        }

        @keyframes slideIn {
          from { right: -100vw; }
          to { right: 0; }
        }

        .CloseBtn {
          position: absolute;
          top: 25px;
          right: 35px;
          font-size: 28px;
          color: white;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 10000;
        }

        .SideMenuLeft {
          width: 35%;
          height: 100%;
          padding: 50px 30px 40px 0;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-start;
          background-color: #121216;
          background-image: url(${bgDemq});
          background-repeat: no-repeat;
          background-position: left center;
          background-size: cover;
          position: relative;
          box-sizing: border-box;
        }

        .MenuLogo {
          width: 150px;
          margin-bottom: 60px;
          margin-right: 20px;
          object-fit: contain;
          mix-blend-mode: multiply; 
        }

        .LeftMenuLinks {
          display: flex;
          flex-direction: column;
          gap: 22px;
          width: 100%;
          align-items: flex-end;
          padding-right: 20px;
        }

        .LeftMenuItem {
          font-size: 20px;
          font-weight: 600;
          color: #ffffff;
          text-decoration: none;
          background: none;
          border: none;
          text-align: right; 
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
        }

        .LeftMenuItem:hover, .LeftMenuItem.active {
          color: #a855f7;
        }

        .SideMenuRight {
          width: 65%;
          background-color: #6c11d9;
          padding: 80px 60px 100px 60px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 35px 40px;
          overflow-y: auto;
          max-height: 100vh;
        }

        .SideMenuRight::-webkit-scrollbar {
          width: 6px;
        }

        .SideMenuRight::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }

        .SectionTitle {
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 12px;
          color: #ffffff;
        }

        .MainSectionTitle {
          font-size: 24px;
          font-weight: bold;
          color: #ffffff;
          text-decoration: none;
          display: block;
          margin-top: 10px;
          transition: opacity 0.2s ease;
        }

        .MainSectionTitle:hover {
          opacity: 0.8;
        }

        .SectionItem {
          display: block;
          font-size: 15px;
          color: #e2d8f7;
          text-decoration: none;
          margin-bottom: 10px;
          transition: color 0.2s ease;
        }

        .SectionItem:hover {
          color: #ffffff;
        }

        @keyframes slideDownFade {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-item {
          animation: slideDownFade 0.35s forwards ease-out;
          opacity: 0;
        }

        .delay-1 { animation-delay: 0.1s !important; }
        .delay-2 { animation-delay: 0.2s !important; }
        .delay-3 { animation-delay: 0.3s !important; }
        .delay-4 { animation-delay: 0.4s !important; }
        .delay-5 { animation-delay: 0.5s !important; }
        .delay-6 { animation-delay: 0.6s !important; }
      `}</style>

      <div className="SideMenuContainer">
        <button className="CloseBtn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="SideMenuLeft">
          <img 
            src={logoImg} 
            alt="Evoca Logo" 
            className="MenuLogo" 
          />

          <div className="LeftMenuLinks">
            <button 
              className={`LeftMenuItem animate-item delay-1 ${activeTab === 'individual' ? 'active' : ''}`}
              onClick={() => setActiveTab('individual')}
            >
              Անհատ
            </button>
            <button 
              className={`LeftMenuItem animate-item delay-2 ${activeTab === 'business' ? 'active' : ''}`}
              onClick={() => setActiveTab('business')}
            >
              Բիզնես
            </button>
            <Link to="/instant-payments" className="LeftMenuItem animate-item delay-3" onClick={onClose}>Ակնթարթային վճարումներ</Link>
            <Link to="/about" className="LeftMenuItem animate-item delay-4" onClick={onClose}>Մեր մասին</Link>
            <Link to="/news" className="LeftMenuItem animate-item delay-5" onClick={onClose}>Նորություններ</Link>
            <Link to="/blog" className="LeftMenuItem animate-item delay-6" onClick={onClose}>Բլոգ</Link>
            <Link to="/career" className="LeftMenuItem animate-item delay-6" onClick={onClose}>Կարիերա</Link>
          </div>
        </div>

        <div className="SideMenuRight" key={activeTab}>
          {activeTab === 'individual' ? (
            <>
              <div className="animate-item delay-1">
                <div className="SectionTitle">Վարկեր</div>
                <Link to="/loans" className="SectionItem" onClick={onClose}>Վարկեր</Link>
                <Link to="/credit-history" className="SectionItem" onClick={onClose}>Վարկային պատմություն և սքոր</Link>
                <Link to="/important-info" className="SectionItem" onClick={onClose}>Կարևոր տեղեկատվություն</Link>
              </div>

              <div className="animate-item delay-1">
                <div className="SectionTitle">Քարտեր</div>
                <Link to="/cards" className="SectionItem" onClick={onClose}>Քարտեր</Link>
                <Link to="/card-service" className="SectionItem" onClick={onClose}>Քարտերի տրամադրում և սպասարկում</Link>
                <Link to="/social-cards" className="SectionItem" onClick={onClose}>Սոցիալական ապահովության վճարային քարտեր</Link>
                <Link to="/evoca-benefits" className="SectionItem" onClick={onClose}>Evoca Benefits</Link>
              </div>

              <div className="animate-item delay-2">
                <div className="SectionTitle">Ավանդներ</div>
                <Link to="/deposits" className="SectionItem" onClick={onClose}>Ավանդներ</Link>
                <Link to="/deposit-info" className="SectionItem" onClick={onClose}>Կարևոր տեղեկատվություն</Link>
              </div>

              <div className="animate-item delay-2">
                <div className="SectionTitle">Հաշիվներ</div>
                <Link to="/accounts" className="SectionItem" onClick={onClose}>Հաշիվների բացում և սպասարկում</Link>
                <Link to="/metal-accounts" className="SectionItem" onClick={onClose}>Առարկայազուրկ մետաղական հաշիվներ</Link>
                <Link to="/non-resident" className="SectionItem" onClick={onClose}>Ոչ ռեզիդենտ հաճախորդների հեռավար սպասարկում</Link>
                <Link to="/safes" className="SectionItem" onClick={onClose}>Պահատուփեր</Link>
              </div>

              <div className="animate-item delay-3">
                <div className="SectionTitle">Փոխանցումներ</div>
                <Link to="/transfers" className="SectionItem" onClick={onClose}>Դրամական փոխանցումներ</Link>
                <Link to="/payment-systems" className="SectionItem" onClick={onClose}>Վճարային համակարգեր</Link>
              </div>

              <div className="animate-item delay-3">
                <div className="SectionTitle">Արժեթղթեր</div>
                <Link to="/investment" className="SectionItem" onClick={onClose}>Ներդրումային ծառայություններ</Link>
                <Link to="/bonds" className="SectionItem" onClick={onClose}>Պարտատոմսեր</Link>
                <Link to="/hkd-services" className="SectionItem" onClick={onClose}>ՀԿԴ ծառայություններ</Link>
                <Link to="/repo" className="SectionItem" onClick={onClose}>Ռեպո/Հակադարձ Ռեպո գործարքներ</Link>
                <Link to="/evocainvest" className="SectionItem" onClick={onClose}>EvocaINVEST</Link>
              </div>

              <div className="animate-item delay-4">
                <Link to="/evoca-salary" className="MainSectionTitle" onClick={onClose}>EvocaSALARY</Link>
              </div>

              <div className="animate-item delay-4">
                <Link to="/evoca-touch" className="MainSectionTitle" onClick={onClose}>EvocaTOUCH</Link>
              </div>

              <div className="animate-item delay-5">
                <Link to="/evoca-codes" className="MainSectionTitle" onClick={onClose}>Evoca codes</Link>
              </div>
            </>
          ) : (
            <>
              <div className="animate-item delay-1">
                <div className="SectionTitle">Վարկեր</div>
                <Link to="/business-loans" className="SectionItem" onClick={onClose}>Բիզնես վարկեր</Link>
              </div>

              <div className="animate-item delay-1">
                <div className="SectionTitle">Լիզինգ</div>
                <Link to="/leasing" className="SectionItem" onClick={onClose}>Evoca Leasing</Link>
                <Link to="/special-offer" className="SectionItem" onClick={onClose}>Հատուկ առաջարկ</Link>
              </div>

              <div className="animate-item delay-2">
                <div className="SectionTitle">Հաշիվներ</div>
                <Link to="/accounts" className="SectionItem" onClick={onClose}>Հաշիվների բացում և սպասարկում</Link>
                <Link to="/metal-accounts" className="SectionItem" onClick={onClose}>Առարկայազուրկ մետաղական հաշիվներ</Link>
              </div>

              <div className="animate-item delay-2">
                <div className="SectionTitle">Ավանդներ</div>
                <Link to="/deposits" className="SectionItem" onClick={onClose}>Դասական ավանդ</Link>
              </div>

              <div className="animate-item delay-3">
                <div className="SectionTitle">Արժեթղթերի շուկա</div>
                <Link to="/investment" className="SectionItem" onClick={onClose}>Ներդրումային ծառայություններ</Link>
                <Link to="/bonds" className="SectionItem" onClick={onClose}>Պարտատոմսեր</Link>
                <Link to="/hkd-services" className="SectionItem" onClick={onClose}>ՀԿԴ ծառայություններ</Link>
                <Link to="/repo" className="SectionItem" onClick={onClose}>Ռեպո/Հակադարձ ռեպո գործարքներ</Link>
                <Link to="/evocainvest" className="SectionItem" onClick={onClose}>EvocaINVEST</Link>
              </div>

              <div className="animate-item delay-3">
                <div className="SectionTitle">Առևտրի ֆինանսավորում</div>
                <Link to="/guarantees" className="SectionItem" onClick={onClose}>Երաշխիք</Link>
                <Link to="/factoring" className="SectionItem" onClick={onClose}>Ֆակտորինգային ֆինանսավորում</Link>
                <Link to="/accreditive" className="SectionItem" onClick={onClose}>Ակրեդիտիվ</Link>
                <Link to="/incasso" className="SectionItem" onClick={onClose}>Ինկասո</Link>
              </div>

              <div className="animate-item delay-4">
                <div className="SectionTitle">Դիջիթալ</div>
                <Link to="/v-pos" className="SectionItem" onClick={onClose}>V-POS Տերմինալ</Link>
                <Link to="/pos" className="SectionItem" onClick={onClose}>POS Տերմինալ</Link>
                <Link to="/rates" className="SectionItem" onClick={onClose}>Սակագներ</Link>
                <Link to="/pos-request" className="SectionItem" onClick={onClose}>Տերմինալի տեղադրման հայտ</Link>
                <Link to="/mpos" className="SectionItem" onClick={onClose}>Evoca Mobile POS` mPOS</Link>
              </div>

              <div className="animate-item delay-4">
                <div className="SectionTitle">Այլ</div>
                <Link to="/safes" className="SectionItem" onClick={onClose}>Պահատուփեր</Link>
                <Link to="/transfers" className="SectionItem" onClick={onClose}>Փոխանցումներ</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default BurgerMenu;