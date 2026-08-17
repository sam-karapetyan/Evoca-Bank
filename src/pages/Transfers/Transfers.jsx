import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import './Transfers.css';

function Transfers() {
  const [activeTab, setActiveTab] = useState('transfers'); 
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const transfersRef = ref(db, 'transfersPage');
    const unsubscribe = onValue(transfersRef, (snapshot) => {
      if (snapshot.exists()) {
        setPageData(snapshot.val());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="TransfersPage" style={{ padding: '40px', textAlign: 'center' }}>
        Բեռնվում է...
      </div>
    );
  }

  const { hero, provisions, banner, paymentSystems } = pageData || {};

  return (
    <div className="TransfersPage">
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

        {activeTab === 'transfers' && (
          <>
            <div className="TransfersHeroCard">
              <div className="TransfersTextSection">
                <h1 className="TransfersTitle">{hero?.title}</h1>
                <p className="TransfersDescription">{hero?.description}</p>
              </div>

              <div className="TransfersImageSection">
                {hero?.image && (
                  <img
                    src={hero.image}
                    alt={hero.title || 'Դրամական փոխանցումներ'}
                    className="TransfersImage"
                  />
                )}
              </div>
            </div>

            <div className="TransfersProvisionsSection">
              <h2 className="ProvisionsTitle">{provisions?.title}</h2>
              {provisions?.list?.map((text, idx) => (
                <p className="ProvisionText" key={idx}>
                  {text}
                </p>
              ))}
            </div>
          </>
        )}

        {activeTab === 'payment-systems' && (
          <div className="PaymentSystemsGrid">
            {paymentSystems?.map((item) => (
              <div className="PaymentSystemCard" key={item.id}>
                <div className="PaymentCardLogoContainer">
                  <img src={item.logo} alt="Payment System Logo" className="PaymentCardLogo" />
                </div>

                <p className="PaymentCardDescription">{item.description}</p>

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
                        {item.schedule?.map((line, idx) => (
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

      {activeTab === 'transfers' && banner?.image && (
        <div
          className="TransfersBannerSection"
          style={{ backgroundImage: `url(${banner.image})` }}
        >
          <div className="TransfersBannerOverlay">
            <h2 className="TransfersBannerText">{banner.text}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transfers;