import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import './Securities.css';

function Securities() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const securitiesRef = ref(db, 'securitiesPage');
    const unsubscribe = onValue(securitiesRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="SecuritiesPage" style={{ padding: '40px', textAlign: 'center' }}>
        Բեռնվում է...
      </div>
    );
  }

  const { breadcrumbs, hero, content, contact, warning } = data || {};

  return (
    <div className="SecuritiesPage">
      <div className="SecuritiesContainer">
        
        {/* Breadcrumb Navigation */}
        <div className="Breadcrumbs">
          {breadcrumbs?.map((item, index) => (
            <React.Fragment key={index}>
              <span className={index === breadcrumbs.length - 1 ? 'active' : ''}>
                {item}
              </span>
              {index < breadcrumbs.length - 1 && <span className="separator">›</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="SecuritiesHeroCard">
          <div className="SecuritiesTextSection">
            <h1 className="SecuritiesTitle">{hero?.title}</h1>
            <p className="SecuritiesDescription">{hero?.description}</p>
          </div>
          <div className="SecuritiesImageSection">
            {hero?.image && (
              <img
                src={hero.image}
                alt={hero.title || 'Ներդրումային ծառայություններ'}
                className="SecuritiesImage"
              />
            )}
          </div>
        </div>

        <div className="SecuritiesContent">
          <p className="MainParagraph">{content?.mainParagraph}</p>

          <h2 className="SectionSubheading">{content?.howToBecomeTitle}</h2>

          <p 
            className="DetailText" 
            dangerouslySetInnerHTML={{ __html: content?.detailText1 || '' }} 
          />

          <p className="DetailText">{content?.detailText2}</p>

          <div className="ContactSection">
            <div className="ContactGroup">
              <h3 className="ContactTitle">Հասցե`</h3>
              <p className="ContactValue">{contact?.address}</p>
            </div>

            <div className="ContactGroup">
              <h3 className="ContactTitle">Հետադարձ կապ`</h3>
              <p className="ContactValue">
                Հեռ.` <strong>{contact?.phone1}</strong> <br />
                <strong className="PhoneIndent">{contact?.phone2}</strong>
              </p>
              
              <div className="SocialIcons">
                <span className="SocialIcon whatsapp">💬</span>
                <span className="SocialIcon telegram">✈️</span>
                <span className="SocialIcon viber">📞</span>
              </div>
            </div>

            <div className="ContactGroup">
              <p className="ContactValue">
                Էլ. հասցե`{' '}
                <a href={`mailto:${contact?.email}`} className="PurpleLink underline">
                  {contact?.email}
                </a>
              </p>
            </div>
          </div>

          <div className="WarningBox">
            <p dangerouslySetInnerHTML={{ __html: warning || '' }} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Securities;