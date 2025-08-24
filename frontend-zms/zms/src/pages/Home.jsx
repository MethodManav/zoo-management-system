import React from 'react';
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
    <>
        <div className="text-center my-4">
          <h1 class="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
  Hello,
</h1>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Welcome to Zoo Explorer !!
            </h1>
            <p className="text-lg bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Discover the wonders of wildlife, one adventure at a time.
            </p>
        </div>

      <div className="flex flex-col justify-center items-center m-8 gap-4">
  {/* Box 1 */}
  <Link 
    to="/admin"
    className="flex items-center justify-center w-40 h-20 border-2 border-purple-500 text-purple-500 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition-colors duration-300"
  >
    Admin
  </Link>

  {/* Vertical line */}
  <div className="w-0.5 h-4/5 bg-purple-500"></div>

  {/* Box 2 */}
  <Link 
    to="/booking"
    className="flex items-center justify-center w-40 h-20 border-2 border-pink-500 text-pink-500 font-semibold rounded-lg hover:bg-pink-500 hover:text-white transition-colors duration-300"
  >
    Booking
  </Link>
</div>


    </>
  );

}

export default HomePage;