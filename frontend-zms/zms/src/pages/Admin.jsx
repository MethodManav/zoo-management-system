import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(
        `https://zoo-management-system.onrender.com/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: username, password }),
        }
      );
      if (res.ok) {
        setMessage("Login successful!");
        setTimeout(() => {
          navigate(`/hero?admin=${encodeURIComponent(username)}`);
        }, 1000);
      } else {
        setMessage("Invalid credentials.");
      }
    } catch {
      setMessage("Error connecting to server.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            placeholder="Enter username"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FF8999] text-white py-2 rounded font-semibold "
          onClick={() =>
            navigate(`/hero?admin=${encodeURIComponent(username)}`)
          }
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && <div className="mt-2 text-center text-sm">{message}</div>}
      </form>
    </div>
  );
};

export default Admin;
