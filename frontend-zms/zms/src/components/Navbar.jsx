import React from "react";
import { useNavigate } from "react-router-dom";
import SearchAnimal from "./SearchAnimal";

const AdminNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full fixed top-10 left-0 z-50 flex justify-between items-baseline py-2 px-8 bg-white shadow">
     
      <div className="flex items-center gap-4">
        <SearchAnimal />
      </div>

      <button  onClick={() => navigate("/add-animal")} className="bg-[#FF8999] text-white px-6 py-2 rounded font-semibold">
        Add Animal
      </button>
    </nav>
  );
};

export default AdminNavbar;
