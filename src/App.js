import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login/Login';
import SideBar from './Component/Dashboard/SideBar';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<SideBar/>} />
      </Routes>
    </Router>
  );
}

export default App;