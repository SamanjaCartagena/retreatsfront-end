import React,{useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
function GuideDetails() {
    const params = useParams()
        const guideId= params.id
  return (
         <div  className="relative h-auto min-h-[auto] w-full overflow-hidden grid place-items-center">
        <br/>
        <br/>
        <br/>
        <br/>
        
        
        {guideId}</div>
  )
}

export default GuideDetails