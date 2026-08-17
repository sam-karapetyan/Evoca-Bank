import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaArrowRight, FaChevronRight } from 'react-icons/fa';

// 📌 Նորությունների տվյալները
const featuredNewsData = {
  id: 1,
  title: "Evocabank-ը ներկայացնում է ֆինանսական տեխնոլոգիաների նոր սերնդի լուծումները",
  date: "12 Փետրվար, 2026",
  category: "Տեխնոլոգիաներ",
  description: "Ժամանակակից բանկային ծառայություններն այլևս հասանելի են մեկ հպումով։ Ակնթարթային փոխանցումներ, անվտանգ գործարքներ և նորարարական թվային գործիքներ Evoca-ի հետ։",
  image: "https://www.evoca.am/images-cache/news/1/17864472573391/780x585.png"
};

const newsGridData = [
  {
    id: 2,
    title: "Evoca-ի նոր ակցիան. Ստացեք հատուկ պայմաններ անհատական վարկավորման համար",
    date: "10 Փետրվար, 2026",
    category: "Առաջարկներ",
    description: "Օգտվեք մեր նոր ֆինանսական փաթեթներից և ստացեք էքսկլյուզիվ առավելություններ։",
    image: "https://www.evoca.am/images-cache/news/1/17815943976247/616x462.png"
  },
  {
    id: 3,
    title: "Թվային բանկինգի ապագան․ Ինչպես է Evocabank-ը փոխում հաճախորդների փորձառությունը",
    date: "05 Փետրվար, 2026",
    category: "Նորություններ",
    description: "Անվտանգության նոր ստանդարտներ և բիոմետրիկ նույնականացման համակարգեր։",
    image: "https://www.evoca.am/images-cache/news/1/17784860353078/450x295.png"
  },
  {
    id: 4,
    title: "Evoca Touch հավելվածի հերթական թարմացումը․ Նոր հնարավորություններ հաճախորդների համար",
    date: "28 Հունվար, 2026",
    category: "Թարմացում",
    description: "Ավելի արագ ինտերֆեյս, նոր վերլուծական գործիքներ և ավտոմատ վճարումների կարգավորում։",
    image: "https://www.evoca.am/images-cache/news/1/17722002491716/450x295.png"
  },
  {
    id: 5,
    title: "Բիզնեսի աջակցման նոր ծրագրեր Evocabank-ից․ Վարկավորում ցածր տոկոսադրույքով",
    date: "20 Հունվար, 2026",
    category: "Բիզնես",
    description: "Աջակցություն փոքր և միջին բիզնեսներին՝ զարգացման նոր հնարավորություններով։",
    image: "https://www.evoca.am/images-cache/news/1/17720089281517/450x295.png"
  },
  {
    id: 6,
    title: "Evoca-ն արժանացել է «Տարվա լավագույն թվային բանկ» միջազգային մրցանակին",
    date: "15 Հունվար, 2026",
    category: "Մրցանակներ",
    description: "Միջազգային փորձագետները բարձր են գնահատել բանկի նորարարական լուծումները։",
    image: "https://www.evoca.am/images-cache/news/1/17683825017248/450x295.jpg"
  }
];

function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("Բոլորը");
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = ["Բոլորը", "Նորություններ", "Առաջարկներ", "Տեխնոլոգիաներ", "Բիզնես", "Մրցանակներ"];

  const filteredNews = activeCategory === "Բոլորը" 
    ? newsGridData 
    : newsGridData.filter(item => item.category === activeCategory);

  return (
    <div className="news-page-container">
      <style>{`
        /* --- BASE PAGE STYLING --- */
        .news-page-container {
          width: 100%;
          min-height: 100vh;
          background-color: #f8f9fa;
          font-family: 'Montserratarm-Regular', -apple-system, BlinkMacSystemFont, sans-serif;
          padding-bottom: 60px;
        }

        /* --- HEADER & NAVIGATION --- */
        .news-header-section {
          background-color: #ffffff;
          padding: 40px 50px 25px 50px;
          border-bottom: 1px solid #eef0f4;
        }

        .news-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #888888;
          margin-bottom: 15px;
        }

        .news-breadcrumb a {
          color: #888888;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .news-breadcrumb a:hover {
          color: #6400DC;
        }

        .news-title-main {
          font-size: 36px;
          font-weight: 800;
          color: #111111;
          margin: 0 0 25px 0;
          letter-spacing: -0.5px;
        }

        /* --- 🎨 CATEGORIES TABS (ՈՒՂՂՎԱԾ ԸՍՏ ՆԿԱՐԻ) --- */
        .news-categories-wrapper {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }

        .category-tab-btn {
          padding: 10px 24px;
          border-radius: 50px;
          border: 1px solid #e2e8f0;
          background-color: #ffffff;
          color: #222222;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }

        .category-tab-btn:hover {
          border-color: #6400DC;
          color: #6400DC;
        }

        .category-tab-btn.active {
          background-color: #6400DC;
          color: #ffffff;
          border-color: #6400DC;
          font-weight: 700;
          box-shadow: 0 6px 18px rgba(100, 0, 220, 0.35);
        }

        /* --- CONTENT BODY --- */
        .news-body-content {
          max-width: 1240px;
          margin: 40px auto 0 auto;
          padding: 0 20px;
        }

        /* --- HERO FEATURED CARD --- */
        .hero-featured-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          margin-bottom: 40px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hero-featured-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(100, 0, 220, 0.12);
        }

        .hero-image-box {
          width: 100%;
          height: 100%;
          min-height: 380px;
          overflow: hidden;
        }

        .hero-image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .hero-featured-card:hover .hero-image-box img {
          transform: scale(1.04);
        }

        .hero-content-box {
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .news-badge {
          display: inline-block;
          align-self: flex-start;
          background: rgba(100, 0, 220, 0.08);
          color: #6400DC;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        .news-date {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #888888;
          margin-bottom: 12px;
        }

        .hero-title {
          font-size: 24px;
          font-weight: 700;
          color: #111111;
          line-height: 1.35;
          margin-bottom: 15px;
        }

        .hero-description {
          font-size: 15px;
          color: #555555;
          line-height: 1.6;
          margin-bottom: 25px;
        }

        .read-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #6400DC;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          transition: gap 0.3s ease, color 0.3s ease;
        }

        .read-more-btn:hover {
          gap: 15px;
          color: #4a00a8;
        }

        /* --- CARDS GRID --- */
        .news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-bottom: 50px;
        }

        .news-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .news-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
        }

        .news-card-img-wrapper {
          width: 100%;
          height: 220px;
          overflow: hidden;
        }

        .news-card-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .news-card:hover .news-card-img-wrapper img {
          transform: scale(1.05);
        }

        .news-card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .news-card-title {
          font-size: 17px;
          font-weight: 700;
          color: #111111;
          line-height: 1.4;
          margin: 10px 0 12px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .news-card-desc {
          font-size: 14px;
          color: #666666;
          line-height: 1.5;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .news-card-footer {
          margin-top: auto;
          padding-top: 15px;
          border-top: 1px solid #f0f0f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* --- LOAD MORE & PAGINATION --- */
        .load-more-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          margin-top: 20px;
        }

        .load-more-btn {
          background-color: #6400DC;
          color: #ffffff;
          border: none;
          padding: 14px 40px;
          border-radius: 30px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          box-shadow: 0 6px 18px rgba(100, 0, 220, 0.3);
        }

        .load-more-btn:hover {
          background-color: #5200b8;
          transform: translateY(-2px);
        }

        .pagination-bar {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .page-num {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid #e0e0e0;
          background-color: #ffffff;
          color: #333333;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .page-num:hover, .page-num.active {
          background-color: #6400DC;
          color: #ffffff;
          border-color: #6400DC;
        }

        /* --- RESPONSIVE MOBILE & TABLET --- */
        @media screen and (max-width: 1024px) {
          .news-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .hero-featured-card {
            grid-template-columns: 1fr;
          }
        }

        @media screen and (max-width: 768px) {
          .news-header-section {
            padding: 25px 20px 15px 20px;
          }

          .news-title-main {
            font-size: 28px;
          }

          .news-body-content {
            padding: 0 15px;
            margin-top: 25px;
          }

          .hero-featured-card {
            grid-template-columns: 1fr;
            border-radius: 16px;
          }

          .hero-image-box {
            min-height: 240px;
            height: 240px;
          }

          .hero-content-box {
            padding: 24px 20px;
          }

          .news-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        @media screen and (max-width: 430px) {
          .news-categories-wrapper {
            overflow-x: auto;
            white-space: nowrap;
            padding-bottom: 8px;
            flex-wrap: nowrap;
            -webkit-overflow-scrolling: touch;
          }

          .category-tab-btn {
            padding: 8px 18px;
            font-size: 13px;
            flex-shrink: 0;
          }

          .load-more-btn {
            width: 100%;
            padding: 14px 0;
          }
        }
      `}</style>

      <div className="news-header-section">
        <div className="news-breadcrumb">
          <Link to="/">Գլխավոր</Link>
          <FaChevronRight style={{ fontSize: '10px' }} />
          <span>Նորություններ</span>
        </div>

        <h1 className="news-title-main">Նորություններ</h1>

      </div>

      <div className="news-body-content">
        <div className="hero-featured-card">
          <div className="hero-image-box">
            <img src={featuredNewsData.image} alt={featuredNewsData.title} />
          </div>
          <div className="hero-content-box">
            <span className="news-badge">{featuredNewsData.category}</span>
            <div className="news-date">
              <FaCalendarAlt />
              <span>{featuredNewsData.date}</span>
            </div>
            <h2 className="hero-title">{featuredNewsData.title}</h2>
            <p className="hero-description">{featuredNewsData.description}</p>
            <Link to={`/news/${featuredNewsData.id}`} className="read-more-btn">
              <span>Կարդալ ավելին</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>

        <div className="news-grid">
          {filteredNews.slice(0, visibleCount).map((item) => (
            <div key={item.id} className="news-card">
              <div className="news-card-img-wrapper">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="news-card-body">
                <span className="news-badge">{item.category}</span>
                <div className="news-date">
                  <FaCalendarAlt />
                  <span>{item.date}</span>
                </div>
                <h3 className="news-card-title">{item.title}</h3>
                <p className="news-card-desc">{item.description}</p>
                
                <div className="news-card-footer">
                  <Link to={`/news/${item.id}`} className="read-more-btn">
                    <span>Կարդալ ավելին</span>
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="load-more-container">
          <button 
            className="load-more-btn" 
            onClick={() => setVisibleCount(prev => prev + 3)}
          >
            Տեսնել ավելին
          </button>

          <div className="pagination-bar">
            <button className="page-num active">1</button>
            <button className="page-num">2</button>
            <button className="page-num">3</button>
            <button className="page-num"><FaChevronRight style={{ fontSize: '12px' }} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;