import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QartezImg from '../../assets/Qartez.png';

function Dram() {
  const navigate = useNavigate();

  const [dramData, setDramData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const [fromAmount, setFromAmount] = useState('100000');
  const [fromCurrency, setFromCurrency] = useState('AMD');
  const [toCurrency, setToCurrency] = useState('USD');
  const [toAmount, setToAmount] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/dramSection')
      .then((res) => res.json())
      .then((data) => setDramData(data))
      .catch(() => {
        setDramData({
          infoText: "20,000 ԱՄՆ դոլարից ավել կամ դրան համարժեք այլ արտարժույթի փոխարկման դեպքում գործարքը հաստատվում է Բանկի հայեցողությամբ և Բանկի կողմից որոշված փոխարժեքով: 100,000 դրամ կամ դրան համարժեք արտարժույթից ավելի փոխանակման գործարքների իրականացման համար անհրաժեշտ է ներկայացնել անձը հաստատող փաստաթուղթ:",
          updatedAt: "29.07.26",
          tabs: ["Կանխիկ", "Անկանխիկ", "Ոսկու փոխարժեք", "Ռուբլու կանխիկ մուտք"],
          currencies: [
            { code: "USD", buy: 362, sell: 368, buyTrend: "down", sellTrend: "up" },
            { code: "EUR", buy: 410, sell: 423, buyTrend: "down", sellTrend: "up" },
            { code: "RUB", buy: 4.36, sell: 4.7, buyTrend: "down", sellTrend: "up" }
          ],
          locations: {
            title: "Մեր հասցեները",
            subtitle: "Բանկի հասցեները, աշխատաժամերը, բանկոմատները",
            buttonText: "Դիտել քարտեզը"
          }
        });
      });
  }, []);

  useEffect(() => {
    if (!dramData) return;

    const num = parseFloat(fromAmount) || 0;
    if (num <= 0) {
      setToAmount('');
      return;
    }

    const curr = dramData.currencies.find(c => c.code === toCurrency);
    if (!curr) {
      setToAmount(num.toString());
      return;
    }

    if (fromCurrency === 'AMD') {
      const res = (num / curr.sell).toFixed(2);
      setToAmount(res);
    } else {
      const res = (num * curr.buy).toFixed(2);
      setToAmount(res);
    }
  }, [fromAmount, fromCurrency, toCurrency, dramData]);

  if (!dramData) return null;

  return (
    <div className="dram-wrapper">
      <style>{`
        .dram-wrapper {
          width: 100%;
          padding: 60px 80px;
          background-color: #f8f9fc;
          box-sizing: border-box;
          font-family: 'Segoe UI', Roboto, sans-serif;
        }

        .dram-container {
          display: flex;
          gap: 50px;
          align-items: flex-start;
        }

        .dram-left {
          flex: 2;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .dram-info-text {
          font-size: 14px;
          line-height: 1.6;
          color: #333333;
          font-weight: 600;
        }

        .dram-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }

        .dram-tabs {
          display: flex;
          gap: 25px;
          border-bottom: 1px solid #eeeeee;
          padding-bottom: 12px;
          margin-bottom: 20px;
        }

        .dram-tab-btn {
          background: none;
          border: none;
          font-size: 14px;
          font-weight: 700;
          color: #888888;
          cursor: pointer;
          transition: color 0.3s ease;
          padding: 0;
        }

        .dram-tab-btn.active {
          color: #1a1a1a;
        }

        .dram-content-grid {
          display: flex;
          gap: 30px;
        }

        .dram-table {
          flex: 1.2;
        }

        .dram-table-header {
          display: flex;
          justify-content: space-between;
          padding-bottom: 10px;
          font-size: 12px;
          color: #a0a0a0;
          font-weight: 600;
        }

        .dram-table-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #f5f5f5;
        }

        .dram-currency-code {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          color: #1a1a1a;
          width: 80px;
        }

        .flag-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          object-fit: cover;
        }

        .rate-val {
          font-weight: 700;
          font-size: 15px;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .arrow-down { color: #e53935; font-size: 10px; }
        .arrow-up { color: #4caf50; font-size: 10px; }

        /* Աջ կողմի input-ներ */
        .dram-calculator {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .calc-input-group {
          background: #fcfcfc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          flex-direction: column;
        }

        .calc-label {
          font-size: 12px;
          color: #888888;
          margin-bottom: 4px;
        }

        .calc-input-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .calc-input {
          border: none;
          outline: none;
          background: transparent;
          font-size: 16px;
          font-weight: 700;
          width: 100%;
          color: #1a1a1a;
        }

        .calc-select {
          border: none;
          background: transparent;
          font-size: 14px;
          font-weight: 700;
          color: #6100e0;
          cursor: pointer;
          outline: none;
        }

        .dram-footer-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;
          font-size: 12px;
          color: #aaaaaa;
        }

        .other-curr-btn {
          color: #6100e0;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
        }

        .dram-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .dram-map-title {
          font-size: 24px;
          font-weight: 800;
          color: #1a1a1a;
          margin: 0;
        }

        .dram-map-subtitle {
          font-size: 13px;
          color: #888888;
          margin: 0;
        }

        .dram-map-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 8px 25px rgba(0,0,0,0.04);
          margin-top: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .map-img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 12px;
        }

        .map-pin {
          position: absolute;
          width: 48px;
          height: 48px;
          background-color: #6100e0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 20px;
          font-weight: bold;
          box-shadow: 0 6px 16px rgba(97, 0, 224, 0.4);
        }

        .map-btn {
          background-color: #f1e9ff;
          color: #6100e0;
          border: none;
          padding: 12px 24px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          align-self: flex-start;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .map-btn:hover {
          background-color: #6100e0;
          color: #ffffff;
          transform: translateY(-2px);
        }

        @media (max-width: 992px) {
          .dram-container {
            flex-direction: column;
          }
          .dram-wrapper {
            padding: 40px 20px;
          }
          .dram-content-grid {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="dram-container">
        <div className="dram-left">
          <p className="dram-info-text">{dramData.infoText}</p>

          <div className="dram-card">
            <div className="dram-tabs">
              {dramData.tabs.map((tab, idx) => (
                <button
                  key={idx}
                  className={`dram-tab-btn ${activeTab === idx ? 'active' : ''}`}
                  onClick={() => setActiveTab(idx)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="dram-content-grid">
              {/* Փոխարժեքների աղյուսակ */}
              <div className="dram-table">
                <div className="dram-table-header">
                  <span></span>
                  <span>Առք</span>
                  <span>Վաճառք</span>
                </div>

                {dramData.currencies.map((c) => (
                  <div className="dram-table-row" key={c.code}>
                    <div className="dram-currency-code">
                      {c.code === 'USD' && <span style={{ fontSize: '18px' }}>🇺🇸</span>}
                      {c.code === 'EUR' && <span style={{ fontSize: '18px' }}>🇪🇺</span>}
                      {c.code === 'RUB' && <span style={{ fontSize: '18px' }}>🇷🇺</span>}
                      <span>{c.code}</span>
                    </div>

                    <div className="rate-val">
                      <span className="arrow-down">▼</span> {c.buy}
                    </div>

                    <div className="rate-val">
                      <span className="arrow-up">▲</span> {c.sell}
                    </div>
                  </div>
                ))}
              </div>

              <div className="dram-calculator">
                <div className="calc-input-group">
                  <span className="calc-label">Ունեմ</span>
                  <div className="calc-input-row">
                    <input
                      type="number"
                      className="calc-input"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                    />
                    <select
                      className="calc-select"
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                    >
                      <option value="AMD">AMD</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="RUB">RUB</option>
                    </select>
                  </div>
                </div>

                <div className="calc-input-group">
                  <span className="calc-label">Կստանամ</span>
                  <div className="calc-input-row">
                    <input
                      type="text"
                      className="calc-input"
                      value={toAmount}
                      readOnly
                    />
                    <select
                      className="calc-select"
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="RUB">RUB</option>
                      <option value="AMD">AMD</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="dram-footer-info">
              <span>Թարմացվել է` {dramData.updatedAt}</span>
              <span
                className="other-curr-btn"
                onClick={() => navigate('/rates')}
              >
                Այլ արժույթներ
              </span>
            </div>
          </div>
        </div>

        <div className="dram-right">
          <h3 className="dram-map-title">{dramData.locations.title}</h3>
          <p className="dram-map-subtitle">{dramData.locations.subtitle}</p>

          <div className="dram-map-card">
            <img src={QartezImg} alt="Map" className="map-img" />
            <div className="map-pin">V</div>
          </div>

          <button
            className="map-btn"
            onClick={() => navigate('/map')}
          >
            {dramData.locations.buttonText} &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dram;