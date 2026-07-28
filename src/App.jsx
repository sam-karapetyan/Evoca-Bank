import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Nkarker from './Components/AnhatMain/1Nkarker';

// Փորձնական երկրորդ էջ (կարող ես հետագայում սարքել առանձին ֆայլով)
function Deposits() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Ավանդներ էջ</h1>
      <p>Բարի գալուստ Ավանդների բաժին</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* Գլխավոր էջ */}
          <Route path="/" element={<Nkarker />} />

          {/* Երկրորդ էջ (օրինակ՝ /deposits) */}
          <Route path="/deposits" element={<Deposits />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;