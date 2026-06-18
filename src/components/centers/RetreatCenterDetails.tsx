import React from 'react'
import {useEffect, useState} from 'react'
import { collection, query, getDocs, orderBy, limit, startAfter,  where, and, or, endBefore, limitToLast} from 'firebase/firestore';
import {db} from '../../firebase.js';  
import {useParams} from 'react-router-dom'
function RetreatCenterDetails() {
    const [nameOfCenter, setNameOfCenter] = useState([]);
     const params = useParams();
    const id = params.id;
    useEffect(() => {
    const q1 =query(collection(db, "centers"), where ("id", "==", id));
              getDocs(q1).then((querySnapshot) => {
             
              const retreats: any[] = [];
              querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data().name);
                retreats.push({ ...doc.data() });
                setNameOfCenter(doc.data().name);
              })

            })
}, [])
    
   
  return (
        <div className="min-h-screen bg-gray-100 mt-30 lg:flex md:grid-cols-1 justify-center items-center justify-items-center">

    <div>{nameOfCenter}</div>
    </div>

  )
}

export default RetreatCenterDetails