import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddAnimal = () => {
  const [form, setForm] = useState({
    type: "",
    weight: "",
    height: "",
    image: "",
    medicalCondition: "",
    description: "",
    diet: "",
    habitat: "",
    lifespan: "",
    age: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (imageFile) {
        formData.append("image", imageFile);
      }
      const res = await fetch("/animals", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setMessage("Animal added successfully!");
        setTimeout(() => navigate("/hero"), 1200);
      } else {
        setMessage("Failed to add animal.");
      }
    } catch {
      setMessage("Error connecting to server.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#FF8999]">Add Animal</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input name="type" value={form.type} onChange={handleChange} className="w-full border rounded px-3 py-2" required placeholder="Animal Type" />
        <input name="weight" value={form.weight} onChange={handleChange} className="w-full border rounded px-3 py-2" required placeholder="Weight (kg)" />
        <input name="height" value={form.height} onChange={handleChange} className="w-full border rounded px-3 py-2" required placeholder="Height (cm)" />
        <div>
          <label className="block mb-1 font-medium">Choose Image (PNG/JPEG)</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <input name="medicalCondition" value={form.medicalCondition} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Medical Condition" />
        <input name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Description" />
        <input name="diet" value={form.diet} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Diet" />
        <input name="habitat" value={form.habitat} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Natural Habitat" />
        <input name="lifespan" value={form.lifespan} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Average Lifespan (years)" />
        <input name="age" value={form.age} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Age (years)" />
        <button type="submit" className="w-full bg-[#FF8999] text-white py-2 rounded font-semibold" disabled={loading}>
          {loading ? "Adding..." : "Add Animal"}
        </button>
        {message && <div className="mt-2 text-center text-sm">{message}</div>}
      </form>
      <button
        type="button"
        className="mt-4 w-full bg-gray-200 text-black py-2 rounded font-semibold hover:bg-gray-300"
        onClick={() => {
          setForm({
            type: "",
            weight: "",
            height: "",
            image: "",
            medicalCondition: "",
            description: "",
            diet: "",
            habitat: "",
            lifespan: "",
            age: "",
          });
          setImageFile(null);
          navigate("/hero");
        }}
      >
        Back to Hero Page
      </button>
    </div>
  );
};

export default AddAnimal;
