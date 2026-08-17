import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QartezImg from '../../assets/Qartez.png';
import './Dram.css';

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

    if (fromCurrency === toCurrency) {
      setToAmount(num.toString());
      return;
    }

    const fromCurr = dramData.currencies.find((c) => c.code === fromCurrency);
    const toCurr = dramData.currencies.find((c) => c.code === toCurrency);

    let result = 0;

    if (fromCurrency === 'AMD' && toCurr) {
      result = num / toCurr.sell;
    } else if (toCurrency === 'AMD' && fromCurr) {
      result = num * fromCurr.buy;
    } else if (fromCurr && toCurr) {
      const inAMD = num * fromCurr.buy;
      result = inAMD / toCurr.sell;
    }

    setToAmount(result ? result.toFixed(2) : '');
  }, [fromAmount, fromCurrency, toCurrency, dramData]);

  if (!dramData) return null;

  return (
    <div className="dram-wrapper">
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
              <div className="dram-table">
                <div className="dram-table-header">
                  <span>Արժույթ</span>
                  <span>Առք</span>
                  <span>Վաճառք</span>
                </div>

                {dramData.currencies.map((c) => (
                  <div className="dram-table-row" key={c.code}>
                    <div className="dram-currency-code">
                      {c.code === 'USD' && <span>🇺🇸</span>}
                      {c.code === 'EUR' && <span>🇪🇺</span>}
                      {c.code === 'RUB' && <span>🇷🇺</span>}
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
                Այլ արժույթներ &gt;
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