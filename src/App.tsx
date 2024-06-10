import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPage from './components/MenuPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuPage />} />
      </Routes>
    </Router>
  );
};

export default App;
