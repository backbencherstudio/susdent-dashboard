    import React from 'react';

const Loader = () => {
  return (
    // The background color matches the dark slate of the main dashboard area
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[300px] bg-[#151722] space-y-6">
      
      {/* Animated Glowing Spinner */}
      <div className="relative w-16 h-16">
        {/* Outer glowing ring (Purple) */}
        <div className="absolute inset-0 rounded-full border-y-4 border-[#a855f7] animate-[spin_1.5s_linear_infinite] opacity-90 shadow-[0_0_15px_rgba(168,85,247,0.6)]"></div>
        
        {/* Inner glowing ring (Blue) */}
        <div className="absolute inset-2 rounded-full border-x-4 border-[#3b82f6] animate-[spin_1s_linear_infinite_reverse] opacity-90 shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
        
        {/* Center pulsing core */}
        {/* <div className="absolute inset-[22px] rounded-full bg-white opacity-80 animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div> */}
      </div>

      {/* Brand-aligned Loading Text */}
      <div className="flex items-center space-x-1">
        <span className="text-gray-300 font-medium tracking-widest text-sm">LOADING</span>
        <span className="flex space-x-1 animate-pulse">
          <span className="w-1 h-1 bg-[#a855f7] rounded-full"></span>
          <span className="w-1 h-1 bg-[#3b82f6] rounded-full"></span>
          <span className="w-1 h-1 bg-[#a855f7] rounded-full"></span>
        </span>
      </div>
      
    </div>
  );
};

export default Loader;