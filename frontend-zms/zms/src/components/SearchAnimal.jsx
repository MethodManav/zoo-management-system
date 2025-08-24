import React, { useState } from "react";

const SearchAnimal = () => {
  const [animalId, setAnimalId] = useState("");
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!animalId) return;
    setLoading(true);
    setError("");
    setAnimal(null);
    try {
      const res = await fetch(`/animals/${animalId}`);
      if (res.ok){
      const data = await res.json();
      setAnimal(data);
      } else {
        setError("Animal not found");
      }
    } catch (err) {
      setError("Animal not found");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-end">
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={animalId}
          onChange={(e) => setAnimalId(e.target.value)}
          placeholder="Enter Animal ID"
          className="border rounded px-3 py-2"
        />
        <button
          onClick={handleSearch}
          className="bg-[#FF8999] text-white px-4 py-2 rounded font-semibold"
        >
          Search Animal
        </button>
      </div>
      {loading && <div className="text-sm text-gray-500">Loading...</div>}
      {error && <div className="text-sm text-red-500">{error}</div>}
      {animal && (
        <div className="flex flex-col items-center bg-pink-50 rounded-lg p-4 shadow w-64 mt-2">
          <img
            src={animal.image}
            alt={animal.name}
            className="w-32 h-32 object-cover rounded mb-2"
          />
          <div className="text-lg font-bold text-[#FF8999]">{animal.name}</div>
          <div className="text-md text-gray-700">
            Type of Animal: {animal.type}
          </div>
          <div className="text-md text-gray-700">Meal: {animal.meal}</div>
        </div>
      )}
    </div>
  );
};

export default SearchAnimal;