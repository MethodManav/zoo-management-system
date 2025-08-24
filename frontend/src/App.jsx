import { useState } from 'react'
import './App.css'
import './index.css'
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from './pages/HomePage';
import Admin from './pages/Admin';
import BookingTicket from './pages/Booking';
import HomePage from './pages/HomePage';

function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/booking" element={<BookingTicket/>} />
      </Routes>
    </>
  )
}

export default App


