import React from "react";

const AnimalModal = ({ animal, onClose }) => {
  if (!animal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-[#FF8999] hover:text-pink-600"
        >
          &times;
        </button>
        <img
          src={animal.image}
          alt={animal.name}
          className="w-48 h-48 object-cover rounded mb-4 mx-auto"
        />
        <h2 className="text-3xl font-bold text-[#FF8999] mb-2 text-center">{animal.name}</h2>
        <div className="text-md text-gray-700 mb-1 text-center">
          <span className="font-semibold">Type of Animal:</span> {animal.type}
        </div>
        <div className="text-md text-gray-700 mb-1 text-center">
          <span className="font-semibold">Meal:</span> {animal.meal}
        </div>
        {/* Add more details if available */}
        {animal.description && (
          <div className="text-md text-gray-700 mt-2 text-center">
            <span className="font-semibold">Description:</span> {animal.description}
          </div>
        )}
        {animal.id && (
          <div className="text-sm text-gray-500 mt-2 text-center">
            <span className="font-semibold">ID:</span> {animal.id}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalModal;
