import React,{useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, getDocs, orderBy, limit, startAfter,  where, and, or, endBefore, limitToLast} from 'firebase/firestore';
import {db} from '../firebase.js';
import { set } from 'date-fns';
function RetreatDetails() {
    const params = useParams()
    const retreatId= params.id
    const [retreatName, setRetreatName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [retreatAddress, setRetreatAddress] = useState("");
    const [hostLastName, setHostLastName] = useState("");
    const [hostFirstName, setHostFirstName] = useState("");
    const [month, setMonth] = useState("");
    const [country, setCountry] = useState("");
    const [hostPic, setHostPic] = useState(""); 

useEffect(()=>{
  
          const q2 = query(collection(db, "retreats"), (where("id", "==", retreatId)));
          getDocs(q2).then((querySnapshot) => {
         
          const retreats: any[] = [];
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data().name);
            retreats.push({ ...doc.data() });
            setRetreatName(doc.data().name);
            setImageUrl(doc.data().imageurl);
            setRetreatAddress(doc.data().address);
            setHostLastName(doc.data().hostLastName);
            setHostFirstName(doc.data().hostName);
            setMonth(doc.data().month);
            setCountry(doc.data().location);
            setHostPic(doc.data().hostProfilePic);
            
          console.log(retreats);  
          })
        });
},[])
  return (
    <div  className="relative h-auto min-h-[auto] w-full overflow-hidden grid place-items-center">
        <br/>
        <br/>
        <br/>
        <br/>
         <h1>{retreatName}</h1>
         <img src={imageUrl} alt={retreatName} className="w-80% h-full object-cover" />  
         <br/>
          <h1>{retreatAddress}&nbsp;{month}&nbsp;{country}</h1>
          <h1 className='text-2xl font-bold m-4'>About the Host</h1>
          <div className="bg-gray-200 w-half p-10 rounded-lg flex m-4 gap-4 items-right">
            <p className='text-lg font-semibold mt-4'>{hostFirstName}</p>
            <p className='text-lg font-semibold mt-4'>{hostLastName}</p>
            <img src={hostPic} alt={hostFirstName} className="w-40 h-40 rounded-full object-cover" />
          </div>
    </div>
  )
}

export default RetreatDetails