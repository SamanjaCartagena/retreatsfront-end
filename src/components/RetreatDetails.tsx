import React,{useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';

function RetreatDetails() {
    const params = useParams()
    const retreatId= params.id
useEffect(()=>{


},[])
  return (
    <div  className="relative h-[80vh] min-h-[700px] w-full overflow-hidden">
        <br/>
        <br/>
        <br/>
        <br/>
         <h1>{retreatId}</h1>
    </div>
  )
}

export default RetreatDetails