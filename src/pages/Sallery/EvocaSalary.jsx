import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase'; // Firebase config ֆայլի հղումը
import './EvocaSalary.css';

function EvocaSalary() {
  const [salaryData, setSalaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const salaryRef = ref(db, 'salaryPage');
    const unsubscribe = onValue(salaryRef, (snapshot) => {
      if (snapshot.exists()) {
        setSalaryData(snapshot.val());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="salary-page" style={{ padding: '40px', textAlign: 'center' }}>
        Բեռնվում է...
      </div>
    );
  }

  const { hero, intro, mastercardGold, travelCard, benefitsCard, loansCard } = salaryData || {};

  return (
    <div className="salary-page">
      {/* Hero Section */}
      <section className="salary-hero">
        <div className="salary-hero-text">
          <h1 className="salary-title">{hero?.title}</h1>
          <p 
            className="salary-subtitle" 
            dangerouslySetInnerHTML={{ __html: hero?.subtitle || '' }}
          />
        </div>
        <div className="salary-hero-img-box">
          {hero?.image && (
            <img src={hero.image} alt="Evoca Salary" className="salary-hero-img" />
          )}
        </div>
      </section>

      {/* Intro Description */}
      <section className="salary-intro">
        <p dangerouslySetInnerHTML={{ __html: intro || '' }} />
      </section>

      {/* Benefits Sections */}
      <section className="salary-sections">
        
        {/* Card 1: Mastercard Gold */}
        {mastercardGold && (
          <div className="salary-card">
            <h2>
              {mastercardGold.titlePrefix}
              <span className="purple-text">{mastercardGold.titleHighlight}</span>
            </h2>
            <ul className="salary-list">
              {mastercardGold.list?.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
        )}

        {/* Card 2: Evoca Travel Card */}
        {travelCard && (
          <div className="salary-card">
            <h2>
              {travelCard.titlePrefix}
              <span className="purple-text">{travelCard.titleHighlight}</span>
            </h2>
            <ul className="salary-list">
              {travelCard.list?.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
        )}

        {/* Card 3: Evoca Benefits */}
        {benefitsCard && (
          <div className="salary-card">
            <h2>
              {benefitsCard.titlePrefix}
              <span className="purple-text">{benefitsCard.titleHighlight}</span>
            </h2>
            <p 
              className="card-subdesc" 
              dangerouslySetInnerHTML={{ __html: benefitsCard.subdesc || '' }} 
            />
            <ul className="salary-list">
              {benefitsCard.list?.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
        )}

        {/* Card 4: Loans */}
        {loansCard && (
          <div className="salary-card">
            <h2>
              {loansCard.titlePrefix}
              <span className="purple-text">{loansCard.titleHighlight}</span>
            </h2>
            
            {loansCard.blocks?.map((block, bIndex) => (
              <div key={bIndex} className="loan-sub-block">
                <h3>{block.title}</h3>
                <ul className="salary-list">
                  {block.list?.map((item, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

      </section>
    </div>
  );
}

export default EvocaSalary;