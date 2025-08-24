import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchAnimal from "../components/SearchAnimal";
import AnimalModal from "../components/AnimalModal";
import AdminNavbar from "../components/Navbar";

const hardcodedAnimals = [
  {
    id: 1,
    name: "Lion",
    type: "Mammal",
    meal: "Meat",
    image:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Elephant",
    type: "Mammal",
    meal: "Grass",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Penguin",
    type: "Bird",
    meal: "Fish",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Giraffe",
    type: "Mammal",
    meal: "Leaves",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
];

const Hero = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const admin = params.get("admin") || "Admin";

  const [animals, setAnimals] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    // Use hardcoded data instead of fetch
    setAnimals(hardcodedAnimals);
  }, []);

  const handleAnimalClick = (animal) => {
    setSelectedAnimal(animal);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <AdminNavbar />
      <div className="flex w-full justify-center items-baseline mt-40 mb-8">
        <h1 className="text-6xl font-bold text-[#FF8999] text-center flex-1">
          Welcome to Zoo, {admin}!
        </h1>
      </div>

      <div className="flex flex-row justify-center items-stretch gap-8">
        {animals.map((animal) => (
          <div key={animal.id} onClick={() => handleAnimalClick(animal)}
            className="flex flex-col items-center bg-pink-50 rounded-lg p-6 shadow w-64 cursor-pointer">
            <img src={animal.image} alt={animal.name} className="w-40 h-40 object-cover rounded mb-4"/>

            <div className="text-xl font-bold text-[#FF8999]">
              {animal.name}
            </div>

            <div className="text-md text-gray-700">
              Type of Animal: {animal.type}
            </div>
            
            <div className="text-md text-gray-700">Meal: {animal.meal}</div>
          </div>
        ))}
      </div>

      {modalOpen && selectedAnimal && (
        <AnimalModal
          animal={selectedAnimal}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Hero;
