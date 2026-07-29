import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Components/Header/Header';
import Nkarker from './Components/AnhatMain/1Nkarker';
import NkarDemq from './Components/AnhatMain/2Nkardemq';
import Ardzancarder from './Components/AnhatMain/3Ardzancarder'; 
import Carder from './Components/AnhatMain/4Carder';
import Hashvich from './Components/AnhatMain/5Hashvich';
import NodebukHer from './Components/AnhatMain/6NodbukHer';
import Gortsynkerner from './Components/AnhatMain/6DzerqMain';
import Mrcanak from './Components/AnhatMain/Mrcanak'; // Ներմուծում ենք Mrcanak-ը
import Dram from './Components/AnhatMain/Dram'
import Footerverev from './Components/AnhatMain/Footerverev';

// Նոր էջ, որը բացվելու է "Բոլոր Նորությունները" կոճակը սեղմելիս
function AllNewsPage() {
  return (
    <div style={{ padding: '80px 20px', textAlign: 'center', minHeight: '60vh' }}>
      <h1>Բոլոր Նորությունների Էջ</h1>
      <p>Այստեղ կարող ես տեղադրել քո նոր էջի կոդը։</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Nkarker />
                <NkarDemq />
                <Ardzancarder />
                <Carder />
                <Hashvich />
                <NodebukHer />
                <Gortsynkerner />
                <Mrcanak />
                <Dram/>
                <Footerverev/>
              </>
            } 
          />

          {/* Նոր բացվող էջի երթուղին */}
          <Route path="/all-news" element={<AllNewsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;