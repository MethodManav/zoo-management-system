import React from 'react';
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
    <>
        <div className="text-center m-auto p-20 space-y-4">
          
            <h1 className="text-7xl bg-clip-text text-[#FF8999]">
                Welcome to Zoo Explorer !!
            </h1>
            <p className="text-2xl text-[##777]">
                Discover the wonders of wildlife, one adventure at a time.
            </p>

        </div>

        <div className="flex flex-row justify-center items-center m-8 gap-4">
              <div className="p-[4rem] rounded-lg  ">
                <Link to="/admin"
                className="flex flex-col items-center justify-center bg-white font-semibold rounded-lg text-pink-500 
                    border border-black transition-all duration-300 hover:bg-gradient-to-b hover:from-purple-300 hover:to-pink-300 hover:text-black"
                >
                    <p className="text-sm text-black w-60 h-60 p-[2rem]">
                        Manage animals, tickets, and zoo operations
                    </p>

                    Admin
                
                </Link>
              </div>

              <div className="w-px h-60 bg-black"></div>

                <div className="p-[4rem] rounded-lg ">
                    <Link to="/booking"
                    className="flex flex-col items-center justify-center bg-white font-semibold rounded-lg text-pink-500 
                        border border-black transition-all duration-300 hover:bg-gradient-to-b hover:from-purple-300 hover:to-pink-300 hover:text-black"
                    >
                        <p className="text-sm text-black w-60 h-60 p-[2rem]">
                            Reserve your tickets and plan your visit easily.
                        </p>

                        Book Your Tickets
                    
                </Link>
                </div>
        </div>

    </>
  );

}

export default HomePage;