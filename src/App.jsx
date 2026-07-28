import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Nkarker from './Components/AnhatMain/1Nkarker';
import NkarDemq from './Components/AnhatMain/2Nkardemq';
import Ardzancarder from './Components/AnhatMain/3Ardzancarder'; // Ավելացվել է import-ը

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
          <Route 
            path="/" 
            element={
              <>
                <Nkarker />
                <NkarDemq />
                <Ardzancarder /> {/* Ավելացվել է գլխավոր էջում */}
              </>
            } 
          />

          {/* Երկրորդ էջ (օրինակ՝ /deposits) */}
          <Route path="/deposits" element={<Deposits />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;