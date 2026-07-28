import React from 'react';
import Headeriverev from './Headeriverev';
import Headernerqev from './Headernerqev';

function Header() {
  return (
    <header className="w-full shadow-sm font-sans select-none">
      <Headeriverev />
      <Headernerqev />
    </header>
  );
}

export default Header;