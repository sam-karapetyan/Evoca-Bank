import React, { useEffect } from 'react';
import NodebukHer from '../../Components/AnhatMain/6NodbukHer';

function PartnersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const partnersList = [
    { id: 1, img: "https://www.evoca.am/images-cache/partners/1/17104032198171/348x150_grayscale.png", name: "Partner 1" },
    { id: 2, img: "https://www.evoca.am/images-cache/partners/1/17077436606929/348x150_grayscale.png", name: "Partner 2" },
    { id: 3, img: "https://www.evoca.am/images-cache/partners/1/17107493820339/348x150_grayscale.png", name: "Partner 3" },
    { id: 4, img: "https://www.evoca.am/images-cache/partners/1/17072192942611/348x150_grayscale.png", name: "Partner 4" },
    { id: 5, img: "https://www.evoca.am/images-cache/partners/1/17072192635138/348x150_grayscale.png", name: "Partner 5" },
    { id: 6, img: "https://www.evoca.am/images-cache/partners/1/17072192435541/348x150_grayscale.png", name: "Partner 6" },
    { id: 7, img: "https://www.evoca.am/images-cache/partners/1/16104583322099/348x150_grayscale.png", name: "Partner 7" },
    { id: 8, img: "https://www.evoca.am/images-cache/partners/1/16104599802947/348x150_grayscale.png", name: "Partner 8" }
  ];

  return (
    <div className="partners-page-wrapper">
      <style>{`
        .partners-page-wrapper {
          width: 100%;
          min-height: 100vh;
          background-color: #ffffff;
          padding-top: 50px;
          padding-bottom: 60px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .partners-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .partners-page-title {
          font-size: 36px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 40px;
        }

        .partners-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 80px;
        }

        .partner-card-item {
          background: #ffffff;
          border-radius: 16px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #f2f2f2;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .partner-card-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(235, 0, 139, 0.12);
        }

        .partner-card-item img {
          max-width: 85%;
          max-height: 70%;
          object-fit: contain;
          filter: grayscale(100%);
          opacity: 0.8;
          transition: all 0.3s ease;
        }

        .partner-card-item:hover img {
          filter: grayscale(0%);
          opacity: 1;
        }

        @media (max-width: 1024px) {
          .partners-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .partners-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .partners-page-title {
            font-size: 26px;
          }
        }

        @media (max-width: 480px) {
          .partners-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="partners-container">
        <h1 className="partners-page-title">Գործընկերներ</h1>

        <div className="partners-grid">
          {partnersList.map((partner) => (
            <div key={partner.id} className="partner-card-item">
              <img src={partner.img} alt={partner.name} />
            </div>
          ))}
        </div>
      </div>

      <div className="partners-bottom-banner">
        <NodebukHer />
      </div>
    </div>
  );
}

export default PartnersPage;