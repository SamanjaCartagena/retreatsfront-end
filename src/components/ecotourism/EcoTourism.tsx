import React from 'react'

function EcoTourism() {
  const pic='https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/eco.png?alt=media&token=83ab2674-8ab7-4c7e-b259-2a1bc01db987'
  return (
    <>
    <div>
            <div className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
   
    <div className="justify-center items-center grid h-screen absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pic})` }}>
      
      <div className="w-full max-w-xs items-center justify-center">
        
      
  

 
</div>


</div>
    </div>
     <div className='container p-4'>
      <h2 className="text-lg bold mb-2">What is eco-tourism?</h2>
      <p>Ecotourism is responsible travel to natural areas that protects the environment, supports local communities, and educates travelers!</p>
      <p>Ecotourism focuses on protecting the places people visit. 
        When travelers support conservation efforts and local communities,
         their experiences can become connected to something larger than themselves.
         Knowing that a journey contributes to protecting wildlife, ecosystems, or local livelihoods 
         can create a deeper sense of purpose and responsibility.

</p>
</div>
    </div>
    </>
  )
}

export default EcoTourism