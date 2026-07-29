import React, { useState } from 'react';

function Hashvich() {
  const [activeTab, setActiveTab] = useState('vark'); // 'vark' (Վարկ) կամ 'avand' (Ավանդ)

  // Վարկի փոփոխականներ
  const [amount, setAmount] = useState(10000000);
  const [term, setTerm] = useState(12);
  const [rate, setRate] = useState(12);
  const [paymentType, setPaymentType] = useState('zspanakadzv'); // 'zspanakadzv' կամ 'anuitet'

  // Ավանդի փոփոխականներ
  const [avandAmount, setAvandAmount] = useState(1000000);
  const [avandTerm, setAvandTerm] = useState(12);
  const [avandRate, setAvandRate] = useState(9);

  // Հաշվարկված արդյունք
  const [result, setResult] = useState(null);

  // Վարկի հաշվարկ
  const calculateLoan = () => {
    const P = Number(amount);
    const n = Number(term);
    const r = Number(rate) / 100 / 12;

    if (P <= 0 || n <= 0) return;

    if (paymentType === 'anuitet') {
      const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = monthly * n;
      setResult({
        monthlyPayment: Math.round(monthly).toLocaleString('hy-AM') + ' ֏',
        totalPayment: Math.round(total).toLocaleString('hy-AM') + ' ֏',
        totalInterest: Math.round(total - P).toLocaleString('hy-AM') + ' ֏',
        type: 'anuitet'
      });
    } else {
      const principalPerMonth = P / n;
      const firstMonthInterest = P * r;
      const firstMonthTotal = principalPerMonth + firstMonthInterest;
      const lastMonthTotal = principalPerMonth + (principalPerMonth * r);
      
      let totalPayment = 0;
      for (let i = 0; i < n; i++) {
        totalPayment += principalPerMonth + (P - i * principalPerMonth) * r;
      }

      setResult({
        firstMonth: Math.round(firstMonthTotal).toLocaleString('hy-AM') + ' ֏',
        lastMonth: Math.round(lastMonthTotal).toLocaleString('hy-AM') + ' ֏',
        totalPayment: Math.round(totalPayment).toLocaleString('hy-AM') + ' ֏',
        totalInterest: Math.round(totalPayment - P).toLocaleString('hy-AM') + ' ֏',
        type: 'zspanakadzv'
      });
    }
  };

  // Ավանդի հաշվարկ
  const calculateAvand = () => {
    const P = Number(avandAmount);
    const n = Number(avandTerm);
    const r = Number(avandRate) / 100;

    const totalInterest = P * r * (n / 12);
    const total = P + totalInterest;

    setResult({
      totalInterest: Math.round(totalInterest).toLocaleString('hy-AM') + ' ֏',
      totalAmount: Math.round(total).toLocaleString('hy-AM') + ' ֏',
      type: 'avand'
    });
  };

  const handleCalculate = () => {
    if (activeTab === 'vark') {
      calculateLoan();
    } else {
      calculateAvand();
    }
  };

  return (
    <div className="hashvich-wrapper">
      <style>{`
        .hashvich-wrapper {
          width: 100%;
          max-width: 1100px;
          margin: 40px auto;
          padding: 0 20px;
          font-family: 'Segoe UI', Roboto, sans-serif;
          box-sizing: border-box;
        }

        .hashvich-heading {
          font-size: 38px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 30px;
          text-align: left;
        }

        /* Քարտի արտաքին տեսքը */
        .hashvich-card {
          background-color: #ffffff;
          border-radius: 20px;
          padding: 35px 40px;
          box-shadow: 0 10px 35px rgba(108, 17, 217, 0.05);
          border: 1px solid #f0ecfc;
          position: relative;
        }

        /* Թաբերը (Վարկ / Ավանդ) */
        .hashvich-tabs {
          display: inline-flex;
          background-color: #f5f4f9;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 35px;
        }

        .hashvich-tab-btn {
          background: transparent;
          border: none;
          padding: 10px 28px;
          font-size: 15px;
          font-weight: 700;
          color: #888888;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .hashvich-tab-btn.active {
          background-color: #ffffff;
          color: #1a1a1a;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        /* Ցանց (Grid) 2 սյունակով */
        .hashvich-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px 40px;
        }

        @media (max-width: 768px) {
          .hashvich-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Ինփութ բլոկ */
        .hashvich-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .hashvich-input-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 14px 18px;
          background-color: #ffffff;
          transition: border-color 0.2s ease;
        }

        .hashvich-input-box:focus-within {
          border-color: #6c11d9;
        }

        .hashvich-label {
          font-size: 14px;
          font-weight: 600;
          color: #2c2e35;
        }

        .hashvich-value-input {
          border: none;
          outline: none;
          font-size: 18px;
          font-weight: 800;
          color: #1a1a1a;
          text-align: right;
          width: 150px;
          background: transparent;
        }

        /* Սլայդեր (Range) */
        .hashvich-range-container {
          position: relative;
          padding-top: 4px;
        }

        .hashvich-range {
          width: 100%;
          -webkit-appearance: none;
          height: 3px;
          background: #e2e8f0;
          border-radius: 2px;
          outline: none;
        }

        .hashvich-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #6c11d9;
          cursor: pointer;
          box-shadow: 0 0 0 3px rgba(108, 17, 217, 0.2);
        }

        .hashvich-range-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 600;
          color: #a0aec0;
          margin-top: 6px;
        }

        /* Ռադիո կոճակներ (Մարման ձև) */
        .hashvich-radio-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .hashvich-radio-title {
          font-size: 13px;
          font-weight: 600;
          color: #888888;
        }

        .hashvich-radio-options {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-top: 4px;
        }

        .hashvich-radio-label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .hashvich-custom-radio {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.2s ease;
        }

        .hashvich-radio-label.active .hashvich-custom-radio {
          border-color: #6c11d9;
        }

        .hashvich-radio-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #6c11d9;
        }

        /* Ներքևի հատված (Ծանուցում + Կոճակ) */
        .hashvich-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 40px;
          gap: 20px;
        }

        @media (max-width: 600px) {
          .hashvich-footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        .hashvich-disclaimer {
          font-size: 13px;
          color: #718096;
          max-width: 500px;
          line-height: 1.4;
        }

        .hashvich-calc-btn {
          background-color: #6c11d9;
          color: #ffffff;
          border: none;
          padding: 14px 45px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 30px;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(108, 17, 217, 0.3);
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .hashvich-calc-btn:hover {
          background-color: #580fb4;
          transform: translateY(-2px);
        }

        /* Հաշվարկի արդյունքի բլոկ */
        .hashvich-result-box {
          margin-top: 30px;
          padding: 20px;
          background-color: #f9f8fe;
          border-radius: 14px;
          border: 1px solid #e8e2fa;
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
        }

        .hashvich-result-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .hashvich-result-title {
          font-size: 13px;
          color: #6c11d9;
          font-weight: 600;
        }

        .hashvich-result-val {
          font-size: 20px;
          font-weight: 800;
          color: #1a1a1a;
        }
      `}</style>

      <h1 className="hashvich-heading">Հաշվիչներ</h1>

      <div className="hashvich-card">
        
        {/* Թաբեր */}
        <div className="hashvich-tabs">
          <button 
            className={`hashvich-tab-btn ${activeTab === 'vark' ? 'active' : ''}`}
            onClick={() => { setActiveTab('vark'); setResult(null); }}
          >
            Վարկ
          </button>
          <button 
            className={`hashvich-tab-btn ${activeTab === 'avand' ? 'active' : ''}`}
            onClick={() => { setActiveTab('avand'); setResult(null); }}
          >
            Ավանդ
          </button>
        </div>

        {activeTab === 'vark' ? (
          /* ՎԱՐԿԻ ՀԱՇՎԻՉ */
          <div className="hashvich-grid">
            
            {/* 1․ Վարկի գումար */}
            <div className="hashvich-field">
              <div className="hashvich-input-box">
                <span className="hashvich-label">Վարկի գումար</span>
                <input 
                  type="text" 
                  className="hashvich-value-input"
                  value={Number(amount).toLocaleString('hy-AM')}
                  onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              <div className="hashvich-range-container">
                <input 
                  type="range" 
                  className="hashvich-range"
                  min="0" 
                  max="50000000" 
                  step="100000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="hashvich-range-labels">
                  <span>0</span>
                  <span>50000000</span>
                </div>
              </div>
            </div>

            {/* 2․ Ժամկետ */}
            <div className="hashvich-field">
              <div className="hashvich-input-box">
                <span className="hashvich-label">Ժամկետ</span>
                <span className="hashvich-value-input">{term} ամիս</span>
              </div>
              <div className="hashvich-range-container">
                <input 
                  type="range" 
                  className="hashvich-range"
                  min="1" 
                  max="1200" 
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                />
                <div className="hashvich-range-labels">
                  <span>1 ամիս</span>
                  <span>1200 ամիս</span>
                </div>
              </div>
            </div>

            {/* 3․ Տարեկան տոկոսադրույք */}
            <div className="hashvich-field">
              <div className="hashvich-input-box">
                <span className="hashvich-label">Տարեկան տոկոսադրույք</span>
                <span className="hashvich-value-input">{rate} %</span>
              </div>
              <div className="hashvich-range-container">
                <input 
                  type="range" 
                  className="hashvich-range"
                  min="1" 
                  max="36" 
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                <div className="hashvich-range-labels">
                  <span>1%</span>
                  <span>36 %</span>
                </div>
              </div>
            </div>

            {/* 4․ Մարման ձև */}
            <div className="hashvich-radio-group">
              <span className="hashvich-radio-title">Մարման ձև</span>
              <div className="hashvich-radio-options">
                <div 
                  className={`hashvich-radio-label ${paymentType === 'zspanakadzv' ? 'active' : ''}`}
                  onClick={() => setPaymentType('zspanakadzv')}
                >
                  <div className="hashvich-custom-radio">
                    {paymentType === 'zspanakadzv' && <div className="hashvich-radio-dot" />}
                  </div>
                  <span>Զսպանակաձև</span>
                </div>

                <div 
                  className={`hashvich-radio-label ${paymentType === 'anuitet' ? 'active' : ''}`}
                  onClick={() => setPaymentType('anuitet')}
                >
                  <div className="hashvich-custom-radio">
                    {paymentType === 'anuitet' && <div className="hashvich-radio-dot" />}
                  </div>
                  <span>Անուիտետ</span>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* ԱՎԱՆԴԻ ՀԱՇՎԻՉ */
          <div className="hashvich-grid">
            
            {/* Ավանդի գումար */}
            <div className="hashvich-field">
              <div className="hashvich-input-box">
                <span className="hashvich-label">Ավանդի գումար</span>
                <input 
                  type="text" 
                  className="hashvich-value-input"
                  value={Number(avandAmount).toLocaleString('hy-AM')}
                  onChange={(e) => setAvandAmount(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              <div className="hashvich-range-container">
                <input 
                  type="range" 
                  className="hashvich-range"
                  min="50000" 
                  max="100000000" 
                  step="50000"
                  value={avandAmount}
                  onChange={(e) => setAvandAmount(e.target.value)}
                />
                <div className="hashvich-range-labels">
                  <span>50,000 ֏</span>
                  <span>100,000,000 ֏</span>
                </div>
              </div>
            </div>

            {/* Ավանդի Ժամկետ */}
            <div className="hashvich-field">
              <div className="hashvich-input-box">
                <span className="hashvich-label">Ժամկետ</span>
                <span className="hashvich-value-input">{avandTerm} ամիս</span>
              </div>
              <div className="hashvich-range-container">
                <input 
                  type="range" 
                  className="hashvich-range"
                  min="1" 
                  max="60" 
                  value={avandTerm}
                  onChange={(e) => setAvandTerm(e.target.value)}
                />
                <div className="hashvich-range-labels">
                  <span>1 ամիս</span>
                  <span>60 ամիս</span>
                </div>
              </div>
            </div>

            {/* Ավանդի տոկոսադրույք */}
            <div className="hashvich-field">
              <div className="hashvich-input-box">
                <span className="hashvich-label">Տարեկան եկամտաբերություն</span>
                <span className="hashvich-value-input">{avandRate} %</span>
              </div>
              <div className="hashvich-range-container">
                <input 
                  type="range" 
                  className="hashvich-range"
                  min="1" 
                  max="15" 
                  value={avandRate}
                  onChange={(e) => setAvandRate(e.target.value)}
                />
                <div className="hashvich-range-labels">
                  <span>1%</span>
                  <span>15%</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Հաշվարկված արդյունքի ցուցադրում */}
        {result && (
          <div className="hashvich-result-box">
            {result.type === 'anuitet' && (
              <>
                <div className="hashvich-result-item">
                  <span className="hashvich-result-title">Ամսական վճար</span>
                  <span className="hashvich-result-val">{result.monthlyPayment}</span>
                </div>
                <div className="hashvich-result-item">
                  <span className="hashvich-result-title">Ընդհանուր վճար</span>
                  <span className="hashvich-result-val">{result.totalPayment}</span>
                </div>
                <div className="hashvich-result-item">
                  <span className="hashvich-result-title">Ընդհանուր տոկոսագումար</span>
                  <span className="hashvich-result-val">{result.totalInterest}</span>
                </div>
              </>
            )}

            {result.type === 'zspanakadzv' && (
              <>
                <div className="hashvich-result-item">
                  <span className="hashvich-result-title">Առաջին ամսվա վճար</span>
                  <span className="hashvich-result-val">{result.firstMonth}</span>
                </div>
                <div className="hashvich-result-item">
                  <span className="hashvich-result-title">Վերջին ամսվա վճար</span>
                  <span className="hashvich-result-val">{result.lastMonth}</span>
                </div>
                <div className="hashvich-result-item">
                  <span className="hashvich-result-title">Ընդհանուր վճար</span>
                  <span className="hashvich-result-val">{result.totalPayment}</span>
                </div>
              </>
            )}

            {result.type === 'avand' && (
              <>
                <div className="hashvich-result-item">
                  <span className="hashvich-result-title">Զուտ եկամուտ</span>
                  <span className="hashvich-result-val">{result.totalInterest}</span>
                </div>
                <div className="hashvich-result-item">
                  <span className="hashvich-result-title">Վերջնական գումար</span>
                  <span className="hashvich-result-val">{result.totalAmount}</span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Ներքևի տեքստ և կոճակ */}
        <div className="hashvich-footer">
          <p className="hashvich-disclaimer">
            Բոլոր հաշվարկները կրում են մոտավոր բնույթ և չեն հանդիսանում հրապարակային առաջարկ:
          </p>
          <button className="hashvich-calc-btn" onClick={handleCalculate}>
            Հաշվել
          </button>
        </div>

      </div>
    </div>
  );
}

export default Hashvich;