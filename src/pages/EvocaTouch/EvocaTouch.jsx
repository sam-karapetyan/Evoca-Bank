import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../../firebase';
import './EvocaTouch.css';

function EvocaTouch() {
  const [touchData, setTouchData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const touchRef = ref(db, 'evocaTouch');
    get(touchRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setTouchData(snapshot.val());
        } else {
          console.log("Տվյալներ չեն գտնվել");
        }
      })
      .catch((error) => {
        console.error("Սխալ տվյալները բեռնելիս:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="touch-page">
        <div className="touch-container" style={{ textAlign: 'center', padding: '50px' }}>
          <h3>Բեռնվում է...</h3>
        </div>
      </div>
    );
  }

  if (!touchData) return null;

  return (
    <div className="touch-page">
      <div className="touch-container">
        
        <div className="touch-breadcrumbs">
          <span>Անհատ</span>
          <span className="separator">›</span>
          <span className="active">EvocaTOUCH</span>
        </div>

        <div className="touch-hero-card">
          <div className="touch-hero-text">
            <span className="badge">{touchData.hero?.badge}</span>
            <h1 className="touch-hero-title">{touchData.hero?.title}</h1>
            <p className="touch-hero-subtitle">{touchData.hero?.subtitle}</p>
          </div>
          <div className="touch-hero-img-box">
            <img 
              src={touchData.hero?.image} 
              alt={touchData.hero?.title} 
              className="touch-hero-img" 
            />
          </div>
        </div>

        <section className="touch-section">
          <h2 className="section-title">{touchData.whatIs?.title}</h2>
          <p 
            className="section-desc"
            dangerouslySetInnerHTML={{ __html: touchData.whatIs?.desc }}
          />
        </section>

        <section className="touch-section">
          <h2 className="section-title">{touchData.advantages?.title}</h2>
          
          <div className="touch-grid">
            {touchData.advantages?.items?.map((item, index) => (
              <div className="touch-card" key={index}>
                <div className="card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: item.desc }} />
              </div>
            ))}
          </div>
        </section>

        <section className="touch-section info-box">
          <h2>{touchData.acceptedCards?.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: touchData.acceptedCards?.desc }} />
        </section>

      </div>
    </div>
  );
}

export default EvocaTouch;