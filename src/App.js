import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Bus from './Bus';
import Mypage from './Mypage';

function App() { 
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Mypage />} />
        <Route exact path="/bus" element={<Bus />} />
      </Routes>
    </div>
  );
}

export default App;
