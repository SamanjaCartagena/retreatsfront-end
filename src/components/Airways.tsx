import React from 'react'
import  pic from '../assets/airline.jpg'
function Airways() {
  return (
     <div>
        <div className="relative h-[80vh] min-h-[700px] w-full overflow-hidden">
   
    <div className="justify-center items-center grid h-screen absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pic})` }}>
      
      <div className="w-full max-w-xs items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-white text-center mb-4">
          Coming Soon!
        </h1>
 
      </div>
      </div>
    </div>
     </div>
  )
}

export default Airways