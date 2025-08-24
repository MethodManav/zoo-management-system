import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const visitorTypes = [
  { label: "Individual", value: "Individual" },
  { label: "Family", value: "Family" },
  { label: "Foreign Tourist", value: "Foreign Tourist" },
  { label: "School", value: "School" },
];

const FIXED_TICKET_PRICE = 100;

const BookingTicket = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [numVisitors, setNumVisitors] = useState("");
  const [visitorType, setVisitorType] = useState("Individual");
  const [visitDate, setVisitDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("Form submitted");
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`https://zoo-management-system.onrender.com/admin/login/visitor`, {
        name: name,
        mobile: phone,
        memberOfFamily: Number(numVisitors),
        visitorType: visitorType,
        dateOfBooking: visitDate,
        amount: FIXED_TICKET_PRICE * Number(numVisitors),
      });
      if (response.status === 200) {
        setMessage(
          "Booking successful on " +
            visitDate +
            "and total amount is ₹" +
            FIXED_TICKET_PRICE * Number(numVisitors) +
            ""
        );
        setPhone("");
        setNumVisitors("");
        setVisitorType("Individual");
        setVisitDate("");
      } else {
        setMessage("Booking failed, Please try again.");
      }
    } catch {
      setMessage("Error connecting to server.");
    }
    setLoading(false);
  };

  const totalAmount = numVisitors
    ? FIXED_TICKET_PRICE * Number(numVisitors)
    : 0;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Book Your Tickets now</h2>
      <div className="mb-4 flex justify-between items-center">
        <span className="font-medium">Ticket Price (per person):</span>
        <span className="font-bold text-pink-600">₹{FIXED_TICKET_PRICE}</span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => {
              let val = e.target.value.replace(/\D/g, "");
              if (val.length > 10) val = val.slice(0, 10);
              setPhone(val);
            }}
            className="w-full border rounded px-3 py-2"
            required
            placeholder="Enter phone number"
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Number of Visitors</label>
          <input
            type="number"
            value={numVisitors}
            onChange={(e) => setNumVisitors(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            min={1}
            placeholder="Enter number of visitors"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">
            Select type of visitor
          </label>
          <div className="grid grid-cols-2 gap-4">
            {visitorTypes.map((type) => (
              <button
                type="button"
                key={type.value}
                className={`border rounded-lg p-6 text-lg font-semibold transition-colors duration-200
                                    ${
                                      visitorType === type.value
                                        ? "border-pink-500 bg-pink-100 text-pink-700"
                                        : "border-gray-300 bg-white text-gray-700 hover:border-pink-400 hover:bg-pink-50"
                                    }
                                `}
                onClick={() => setVisitorType(type.value)}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Select Visit Date</label>
          <input
            type="date"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Amount:</span>
            <span className="font-bold text-green-600">₹{totalAmount}</span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded font-semibold hover:bg-pink-600"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Ticket"}
        </button>
        {message && <div className="mt-2 text-center text-sm">{message}</div>}
      </form>
      <button
        type="button"
        className="mt-6 w-full bg-gray-200 text-black py-2 rounded font-semibold hover:bg-gray-300"
        onClick={() => navigate("/")}
      >
        Back to Home Page
      </button>
    </div>
  );
};

export default BookingTicket;
