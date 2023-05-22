import React from "react";

const NewsLetter = () => {
  return (
    <div className="bg-[#0B51FF] w-full">
      <div className="w-full max-w-7xl py-12 mx-auto flex flex-col lg:flex-row gap-8 px-6 min-h-[40vh] lg:h-[40vh] my-12">
        <div>
          <h1 className="text-white text-5xl font-medium">Subscribe to our newsletter</h1>
          <p className="text-white text-lg pt-4 font-light">
            Leave us with your email and never miss a single update.
          </p>
          {/* input and suscribe, side by side */}
          <div className="flex flex-col lg:flex-row gap-4 mt-6 border-[0.8px] border-gray-400 py-2 rounded px-4 hover:border-white">
            <input
              type="text"
              placeholder="YOUR EMAIL ADDRESS"
              className="appearance-none bg-transparent flex-1 border-none ring-0 focus:outline-none text-white"
            />
            <button className="btn-black px-2 lg:px-8 py-3 h-full">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
