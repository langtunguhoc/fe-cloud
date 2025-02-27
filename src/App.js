
import './App.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from"./components/register/register.js"
import Home from"./components/home/home.js"
import Login from "./components/login/login.js"
import Update from "./components/update/update.js"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      
  }, []);

  

  return (
      <BrowserRouter>
      {/* <Header isLoggedIn={isLoggedIn} /> */}
          <Routes> 
              <Route path = '/' element={<Navigate to="/Register" replace />} />
              <Route path = "/login" element={<Login />} />
              <Route path = "/register" element={<Register  />} />
              <Route path = "/home" element={<Home  />} />
              <Route path = "/update" element={<Update  />} />
          </Routes>
      {/* <Footer /> */}
      </BrowserRouter>
  )
}

export default App