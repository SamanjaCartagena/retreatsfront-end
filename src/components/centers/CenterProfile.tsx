import { onAuthStateChanged } from 'firebase/auth'
import React, {useState, useEffect} from 'react'
import { collection, query, getDocs, orderBy, limit, startAfter,  where, and, or,  endBefore, limitToLast} from 'firebase/firestore';
import {db} from '../../firebase.js';

import { useParams } from 'react-router-dom';

export default function CenterProfile() {
    const params= useParams()
    const centerId= params.id
    const [nameOfCenter, setNameOfCenter] = useState("")
    useEffect(()=> {
               const fetchData = async () => {

        const q =query(collection(db, "centers"), where("id", "==", centerId));
                   const querySnapshot = await getDocs(q);
                       querySnapshot.forEach((doc) => {
                        setNameOfCenter(doc.data().location)

                       })
                    }
                    fetchData()
                    

    },[centerId])
  return (
         <div  className="relative h-auto min-h-[auto] w-full overflow-hidden grid place-items-center">
        <br/>
        <br/>
        <br/>
        <br/>
        
                <h2>{nameOfCenter}</h2>
            </div>

  )
}
