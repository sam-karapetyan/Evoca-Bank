import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import './Deposits.css';

function Deposits() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const depositsRef = ref(db, 'depositsPage');
    const unsubscribe = onValue(depositsRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="DepositsPageContainer" style={{ padding: '40px', textAlign: 'center' }}>
        Բեռնվում է...
      </div>
    );
  }

  const { title, deposits } = data || {};

  return (
    <div className="DepositsPageContainer">
      <h1 className="DepositsPageMainTitle">{title || 'Ավանդներ'}</h1>
      <div className="DepositsList">
        {deposits?.map((deposit) => (
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