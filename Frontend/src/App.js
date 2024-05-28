import logo from './logo.svg';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import { useState } from 'react';

import './App.css';
import {
  Login,
  Home,
  Sidebar,
  Products,
  Contests
} from "./Import.jsx";

function App() {
  const [logined, setLogined] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleLoginSuccess = (e) => {
    console.log("Login successful!"); // Add this line
    setLogined(true);
  };

  return (
    <Router>
    <div className="App">
    {logined ? (
      <>
        <div className='Sideb'>
          <Sidebar/>
        </div>
        <div className='Content'>
          <Routes>
            <Route path='/products' element = {<Products/>}/>
            <Route path='/contests' element = {<Contests/>}/>
          </Routes>
        </div>
      </>
    ):(
      <Routes>
        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path = "/sidebar" element={<Sidebar />} /> */}
      </Routes>
    )}
      
    </div>
    </Router>
  );
}

export default App;
