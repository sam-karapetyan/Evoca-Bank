import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../src/Components/Header/Header'; 

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/cards" element={<div className="p-10 text-center font-bold">Քարտեր էջ</div>} />
      </Routes>
    </Router>
  );
}

export default App;