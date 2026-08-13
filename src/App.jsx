import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './Components/Header/Header';
import Nkarker from './Components/AnhatMain/1Nkarker';
import NkarDemq from './Components/AnhatMain/2Nkardemq';
import Ardzancarder from './Components/AnhatMain/3Ardzancarder'; 
import Carder from './Components/AnhatMain/4Carder';
import Hashvich from './Components/AnhatMain/5Hashvich';
import NodebukHer from './Components/AnhatMain/6NodbukHer';
import Gortsynkerner from './Components/AnhatMain/6DzerqMain';
import Mrcanak from './Components/AnhatMain/Mrcanak';
import Dram from './Components/AnhatMain/Dram';
import Footerverev from './Components/AnhatMain/Footerverev';
import Footer from './Components/Header/Footer';

// 📌 1. ԱՅՍՏԵՂ ԻՄՊՈՐՏ ԱՐԱ ՔՈ ՊԱՏՐԱՍՏԻ «ՄԵՐ ՄԱՍԻՆ» ԷՋԻ COMPONENT-Ը․
import AboutGeneral from './pages/AboutGeneral/AboutGeneral'; 

import Login from './Login/Login';
import FloatingChat from './Components/Chat/FloatingChat';
import CardDetail from './pages/CardDetail/CardDetail';
import BiometricDetail from './pages/biometric/BiometricDetail'; 

import GorcnkernerPage from './pages/Gorcnkerner/Gorcnkerner';
import Business from './pages/Bussines/Bussiness';
import BusinessDetail from './pages/Bussines/BusinessDetail';
import InstantPayments from './pages/InstantPayments/InstantPayments';
import NewsPage from './pages/News/NewsPage'; // 📌 Իմպորտ արա NewsPage-ը

// ScrollToTop component - էջը փոխելիս միշտ վերև բարձրանալու համար
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Home() {
  return (
    <>
      <Nkarker />
      <NkarDemq />
      <Ardzancarder />
      <Carder />
      <Hashvich />
      <NodebukHer />
      <Gortsynkerner />
      <Mrcanak />
      <Dram />
      <Footerverev />
    </>
  );
}

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
      <ScrollToTop />
      
      <div>
        <Header />

        <Routes>
          {/* Գլխավոր էջեր */}
          <Route path="/" element={<Home />} />
          <Route path="/all-news" element={<AllNewsPage />} />
          <Route path="/login" element={<Login />} />

          <Route path="/news" element={<NewsPage />} />
          <Route path="/all-news" element={<NewsPage />} />
          
          {/* Ակնթարթային վճարումներ */}
          <Route path="/instant-payments" element={<InstantPayments />} />

          {/* Քարտերի երթուղիներ */}
          <Route path="/cards" element={<CardDetail />} />
          <Route path="/card-issuance" element={<CardDetail />} />
          <Route path="/social-cards" element={<CardDetail />} />
          <Route path="/evoca-benefits" element={<CardDetail />} />

          {/* Dynamic Routes */}
          <Route path="/card/:cardId" element={<CardDetail />} />
          <Route path="/news/:cardId" element={<CardDetail />} />
          <Route path="/biometric" element={<BiometricDetail />} />
          
          {/* 📌 2. «ՄԵՐ ՄԱՍԻՆ» ROUTE-Ն․ PATH-Ը ԵՎ ELEMENT-Ը ԴԻՐ ՔՈ ՈՒԶԱԾՈՎ */}
          <Route path="/about-general" element={<AboutGeneral />} />
          
          <Route path="/partners" element={<GorcnkernerPage />} />
          
          {/* Մյուս SubNav էջերը */}
          <Route path="/structure" element={<AboutGeneral />} />
          <Route path="/shareholders" element={<AboutGeneral />} />
          <Route path="/management" element={<AboutGeneral />} />
          <Route path="/awards" element={<AboutGeneral />} />
          <Route path="/reviews" element={<AboutGeneral />} />
          <Route path="/csr" element={<AboutGeneral />} />
          <Route path="/business" element={<Business />} />
          <Route path="/business/:id" element={<BusinessDetail />} />
        </Routes>

        <FloatingChat />
        <Footer />
      </div>
    </Router>
  );
}

export default App;