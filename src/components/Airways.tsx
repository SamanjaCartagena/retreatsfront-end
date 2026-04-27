import React from 'react'
import  pic from '../assets/airline.jpg'
function Airways() {
  return (
     <div>
        <div className="relative h-[80vh] min-h-[700px] w-full overflow-hidden">
   
    <div className="justify-center items-center grid h-screen absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pic})` }}>
      
      <div className="w-full max-w-xs items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-white text-center mb-4">
          Explore Flight Deals
        </h1>
        <p className="text-lg text-white/80 text-center mb-6">
          Find the best flight deals to your dream retreat destinations.
        </p>
        <div className="flex justify-center">
          <input type="text" placeholder="Search for flight deals..." className="px-4 py-2 rounded-l-md border-none focus:ring-2 focus:ring-retreat-ocean focus:outline-none" />
          <button className="px-4 py-2 bg-retreat-ocean text-white rounded-r-md hover:bg-retreat-forest transition-colors">
            Search
          </button>
        </div>
      </div>
      </div>
    </div>
     </div>
  )
}

export default Airways