import React, { useState } from 'react';
import Header from '../../Components/Header/Header';
import Menu from '../../Components/Menu/Menu';
import Footer from '../../Components/Footer/Footer';

function MenuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Header setSearchTerm={setSearchTerm} />
        <Menu searchTerm={searchTerm} />
      </div>
      <Footer />
    </div>
  );
}

export default MenuPage;
