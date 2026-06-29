import React from 'react'
import pic from '../../assets/manhattan.png'
function Founder() {
  return (
       <div className="relative h-[30vh] min-h-[300px] w-full overflow-hidden">
          <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${pic})` }}
      >
            <center><p className='lg:text-2xl sm:text-base mt-20 text-white justify-center w-full font-bold'>We are located in New York City! Contact us!
                <br/>
                Samanja.Cartagena@gmail.com
                <br/>
                1(347)-856-8559
                 <br/>
                  </p>
                 
                  </center>

      </div>

    </div>
  )
}

export default Founder