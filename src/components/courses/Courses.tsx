import React from 'react'

function Mentor() {
       const pic='https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/sherpas.jpg?alt=media&token=07da771f-1b0f-4cd3-a920-fbc64c4492d6'

  return (
     <div className="relative h-[80vh] min-h-[700px] w-full overflow-hidden">
      
      
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${pic})` }}
      ></div>
    <div>Mentors</div>
    </div>
  )
}

export default Mentor