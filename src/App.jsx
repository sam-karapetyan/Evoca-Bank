import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Header (Գլխամաս)
import Header from './Components/Header/Header';

// 2. Գլխավոր էջի բաժիններն ըստ ֆայլերի հերթականության (1-7)
import Nkarker from './Components/AnhatMain/1Nkarker';
import NkarDemq from './Components/AnhatMain/2Nkardemq';
import Ardzancarder from './Components/AnhatMain/3Ardzancarder'; 
import Carder from './Components/AnhatMain/4Carder';
import Hashvich from './Components/AnhatMain/5Hashvich';
import NodebukHer from './Components/AnhatMain/6NodbukHer';
import Gortsynkerner from './Components/AnhatMain/6DzerqMain'; // Կամ ./Components/AnhatMain/Gortsynkerner

function Deposits() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Ավանդներ էջ</h1>
      <p>Բարի գալուստ Ավանդների բաժին</p>
    </div>
  );
}

function BecomeClient() {
  return (
    <div style={{ padding: '60px', textAlign: 'center' }}>
      <h1>Դառնալ Հաճախորդ</h1>
      <p>Բարի գալուստ</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        {/* Header */}
        <Header />

        <Routes>
          <Route 
            path="/" 
            element={
              <>
                {/* 1. Նկարներ */}
                <Nkarker />

                {/* 2. Նկար / Դեմք */}
                <NkarDemq />

                {/* 3. Արձան / Քարտեր */}
                <Ardzancarder />

                {/* 4. Քարտեր */}
                <Carder />

                {/* 5. Հաշվիչ */}
                <Hashvich />

                {/* 6. Նոթբուք / Հեռախոս */}
                <NodebukHer />

                {/* 7. Գործընկերներ (Ձեռք) */}
                <Gortsynkerner />
              </>
            } 
          />

          <Route path="/deposits" element={<Deposits />} />
          <Route path="/become-client" element={<BecomeClient />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;