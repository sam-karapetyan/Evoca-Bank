import React from 'react';
import LogoImg from '../../assets/Logo2.png';

function Footer() {
  return (
    <footer className="evoca-footer">
      <style>{`
        .evoca-footer {
          width: 100%;
          background-color: #ffffff;
          color: #333333;
          font-family: 'Segoe UI', Roboto, sans-serif;
          box-sizing: border-box;
        }

        .footer-main-content {
          max-width: 1300px;
          margin: 0 auto;
          padding: 50px 20px 40px 20px;
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr 1fr 1.1fr;
          gap: 30px;
        }

        /* Ձախ սյունակ (Լոգո և հասցե) */
        .footer-col-brand {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .footer-logo {
          max-width: 71px;
          height: auto;
          margin-bottom: 10px;
        }

        .footer-address {
          font-size: 13px;
          line-height: 1.5;
          color: #4a4a4a;
          margin: 0;
        }

        .footer-notice {
          font-size: 12px;
          line-height: 1.5;
          color: #222222;
          font-weight: 700;
          margin-top: 10px;
        }

        .footer-copyright {
          font-size: 11px;
          color: #999999;
          margin-top: 8px;
        }

        /* Հղումների սյունակներ */
        .footer-col-links h4 {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
          margin-top: 0;
          margin-bottom: 18px;
        }

        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links-list a {
          text-decoration: none;
          color: #4a4a4a;
          font-size: 13px;
          transition: color 0.2s ease;
        }

        .footer-links-list a:hover {
          color: #6100e0;
        }

        /* Աջ սյունակ (Սոց. ցանցեր և Կապ) */
        .footer-col-contact {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .social-icons {
          display: flex;
          gap: 14px;
          align-items: center;
        }

        .social-icon-link {
          color: #888888;
          transition: color 0.2s ease;
        }

        .social-icon-link:hover {
          color: #6100e0;
        }

        .app-buttons {
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }

        .app-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: #000000;
          color: #ffffff;
          padding: 6px 12px;
          border-radius: 6px;
          text-decoration: none;
          font-size: 10px;
          transition: opacity 0.2s ease;
        }

        .app-btn:hover {
          opacity: 0.85;
        }

        .app-btn span.btn-text {
          display: flex;
          flex-direction: column;
        }

        .app-btn span.small-text {
          font-size: 8px;
          text-transform: uppercase;
        }

        .app-btn span.big-text {
          font-size: 11px;
          font-weight: 700;
        }

        .contact-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 10px;
        }

        .purple-link {
          color: #6100e0;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
        }

        .purple-link:hover {
          text-decoration: underline;
        }

        .phone-number {
          color: #6100e0;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
        }

        .short-phone {
          color: #6100e0;
          font-weight: 800;
          font-size: 15px;
          text-decoration: none;
        }

        /* Ներքևի Տեքստը և Լոգոների շարքը */
        .footer-bottom-strip {
          background-color: #f5f5f7;
          border-top: 1px solid #eeeeee;
          padding: 20px 0;
        }

        .footer-bottom-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .disclaimer-text {
          font-size: 10px;
          line-height: 1.5;
          color: #888888;
          max-width: 750px;
          margin: 0;
        }

        .partner-badges {
          display: flex;
          align-items: center;
          gap: 15px;
          opacity: 0.8;
        }

        .partner-link {
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .partner-link:hover {
          opacity: 0.6;
        }

        @media (max-width: 1024px) {
          .footer-main-content {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .footer-main-content {
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .footer-bottom-container {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      {/* Վերևի հիմնական բաժինը */}
      <div className="footer-main-content">
        {/* 1. Լոգո և հասցե */}
        <div className="footer-col-brand">
          <a href="/">
            <img src={LogoImg} alt="Evocabank Logo" className="footer-logo" />
          </a>
          <p className="footer-address">
            ք. Երևան, 0010,<br />
            Հանրապետության 44/2
          </p>
          <p className="footer-notice">
            Evocabank-ը վերահսկվում է<br />
            Հայաստանի Հանրապետության<br />
            Կենտրոնական բանկի կողմից
          </p>
          <p className="footer-copyright">
            1990 - 2026, © ԲՈԼՈՐ ԻՐԱՎՈՒՆՔՆԵՐԸ ՊԱՇՏՊԱՆՎԱԾ ԵՆ
          </p>
        </div>

        {/* 2. Բանկի մասին */}
        <div className="footer-col-links">
          <h4>Բանկի մասին</h4>
          <ul className="footer-links-list">
            <li><a href="/about">Մեր մասին</a></li>
            <li><a href="/management">Ղեկավարություն</a></li>
            <li><a href="/shareholders">Բաժնետերեր</a></li>
            <li><a href="/reports">Հաշվետվություններ</a></li>
            <li><a href="/legal">Իրավական ակտեր</a></li>
            <li><a href="/tariffs">Սակագներ</a></li>
            <li><a href="/property">Օտարվող գույք</a></li>
            <li><a href="/developers">Կառուցապատողներ</a></li>
            <li><a href="/auto-salons">Գործընկեր ավտոսրահներ</a></li>
            <li><a href="/archive">Սակագների արխիվ</a></li>
          </ul>
        </div>

        {/* 3. Օգտակար հղումներ */}
        <div className="footer-col-links">
          <h4>Օգտակար հղումներ</h4>
          <ul className="footer-links-list">
            <li><a href="/customer-rights">Հաճախորդի իրավունքները (Բողոքի ներկայացման կանոններ)</a></li>
            <li><a href="/residency-rules">Հաճախորդի ռեզիդենտության չափանիշներ</a></li>
            <li><a href="/regulation">Կարգավորում</a></li>
            <li><a href="/privacy-policy">Գաղտնիության քաղաքականություն</a></li>
            <li><a href="/fin-ombudsman">Ֆին. հաշտարար</a></li>
            <li><a href="/financial-crime-prevention">Ֆինանսական հանցագործությունների կանխարգելում</a></li>
          </ul>
        </div>

        {/* 4. Այլ հղումներ */}
        <div className="footer-col-links">
          <h4>Այլ հղումներ</h4>
          <ul className="footer-links-list">
            <li><a href="/evoca-online">EvocaONLINE</a></li>
            <li><a href="/safes">Պահատուփեր</a></li>
            <li><a href="/faq">Հաճախ տրվող հարցեր</a></li>
            <li><a href="/announcements">Հայտարարություններ</a></li>
            <li><a href="/dibrary">Dibrary</a></li>
            <li><a href="/booklets">Բուկլետներ</a></li>
            <li><a href="/contact">Հետադարձ կապ</a></li>
            <li><a href="/sitemap">Կայքի քարտեզ</a></li>
          </ul>
        </div>

        {/* 5. Սոց. ցանցեր և Կապ */}
        <div className="footer-col-contact">
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="Facebook">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="Instagram">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="Pinterest">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="YouTube">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="LinkedIn">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>

          <div className="app-buttons">
            <a href="https://apple.com/app-store" target="_blank" rel="noopener noreferrer" className="app-btn">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-.96.04-2.13.64-2.81 1.44-.61.71-1.14 1.86-1 2.97 1.08.08 2.17-.57 2.82-1.37z"/></svg>
              <span className="btn-text">
                <span className="small-text">Download on the</span>
                <span className="big-text">App Store</span>
              </span>
            </a>
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="app-btn">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.61 22.186c-.198-.204-.31-.482-.31-.776V2.59c0-.294.112-.572.309-.776zm11.31 11.31L17.7 10.34l-2.071-1.196-2.902 2.902 2.192 2.078zm1.14-7.462L5.27.606A1.066 1.066 0 0 0 4.7.469l10.219 10.219 1.14-5.026zm0 12.676l-1.14-5.026L4.7 23.531c.189-.044.382-.132.57-.238l10.789-5.051z"/></svg>
              <span className="btn-text">
                <span className="small-text">GET IT ON</span>
                <span className="big-text">Google Play</span>
              </span>
            </a>
          </div>

          <div className="contact-links">
            <a href="/branches" className="purple-link">Բանկի հասցեները և աշխատաժամերը</a>
            <a href="/contact" className="purple-link">Կապ մեզ հետ</a>
            <a href="tel:+37410605555" className="phone-number">+374 10 605555</a>
            <a href="tel:8444" className="short-phone">8444</a>
          </div>
        </div>
      </div>

      {/* Ներքևի գորշ շերտը */}
      <div className="footer-bottom-strip">
        <div className="footer-bottom-container">
          <p className="disclaimer-text">
            Հարգելի՛ այցելու, Կայքի որևէ տեղեկատվության վերաբերյալ տարբեր լեզուներում անհամապատասխանությունների, ինչպես նաև ռուսերեն և անգլերեն լեզուներում ոչ ամբողջական նյութ տեսնելու դեպքում խնդրում ենք առաջնորդվել հայերեն տարբերակով: "Էվոկաբանկ" ԲԲԸ-ն պատասխանատվություն չի կրում իր ինտերնետային կայքում հղված այլ անձանց ինտերնետային կայքերի բովանդակության ստույգության և արժանահավատության, այնտեղ տեղադրված գովազդների, ինչպես նաև երրորդ անձանց կողմից այդ կայքերում տեղադրված տեղեկատվության օգտագործման հնարավոր հետևանքների համար:
          </p>
          
          <div className="partner-badges">
            <a href="https://fininfo.am" target="_blank" rel="noopener noreferrer" className="partner-link" style={{ fontSize: '11px', fontWeight: 'bold', color: '#666' }}>fininfo</a>
            <a href="https://abcfinance.am" target="_blank" rel="noopener noreferrer" className="partner-link" style={{ fontSize: '11px', fontWeight: 'bold', color: '#666' }}>abcfinance.am</a>
            <a href="https://arca.am" target="_blank" rel="noopener noreferrer" className="partner-link" style={{ fontSize: '12px', fontWeight: '900', color: '#003399' }}>arca</a>
            <a href="/aa-partner" className="partner-link" style={{ fontSize: '11px', fontWeight: 'bold', color: '#666' }}>AA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;