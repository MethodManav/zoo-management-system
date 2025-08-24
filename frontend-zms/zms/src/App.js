import './App.css';
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import BookingTicket from "./pages/Booking";
import HomePage from "./pages/Home";

function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/booking" element={<BookingTicket />} />
     </Routes>
    </>
  );
}

export default App;
