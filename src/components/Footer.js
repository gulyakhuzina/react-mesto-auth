import React from 'react';
import {Route, Routes} from 'react-router-dom';

function Footer() {
  return (
    <Routes>
      <Route path="/" element={
        <footer className="footer">
          <p className="footer__description">© 2023 Mesto Russia</p>
        </footer>
      } />
    </Routes>
  );
}

export default Footer;