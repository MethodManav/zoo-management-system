import './App.css';
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import BookingTicket from "./pages/Booking";
import HomePage from "./pages/Home";
import Hero from "./pages/Hero";
import AddAnimal from "./pages/AddAnimal";

function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/booking" element={<BookingTicket />} />
      <Route path="/hero" element={<Hero />} />
      <Route path="/add-animal" element={<AddAnimal />} />
     </Routes>
    </>
  );
}

export default App;
