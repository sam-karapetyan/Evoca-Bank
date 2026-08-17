import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import './Accounts.css';

function Accounts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accountsRef = ref(db, 'accountsPage');
    const unsubscribe = onValue(accountsRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="AccountsPage" style={{ padding: '40px', textAlign: 'center' }}>
        Բեռնվում է...
      </div>
    );
  }

  const { hero, notice, banner } = data || {};

  return (
    <div className="AccountsPage">
      <div className="AccountsContainer">
        {/* Վերևի գլխավոր բլոկ (տեքստ + նկար) */}
        <div className="AccountsHeroCard">
          <div className="AccountsTextSection">
            <h1 className="AccountsTitle">{hero?.title}</h1>
            <p className="AccountsDescription">{hero?.description}</p>
          </div>

          <div className="AccountsImageSection">
            {hero?.image && (
              <img
                src={hero.image}
                alt={hero.title || 'Հաշիվների բացում և սպասարկում'}
                className="AccountsImage"
              />
            )}
          </div>
        </div>

        {/* Ծանուցման / Պայմանագրային տեքստ */}
        <div className="AccountsNoticeSection">
          <p dangerouslySetInnerHTML={{ __html: notice || '' }} />
        </div>
      </div>

      {/* Լայն բանները (Գրասենյակի նկարով և տեքստով) */}
      {banner?.image && (
        <div
          className="AccountsBannerSection"
          style={{ backgroundImage: `url(${banner.image})` }}
        >
          <div className="AccountsBannerOverlay">
            <h2 className="AccountsBannerText">{banner.text}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Accounts;