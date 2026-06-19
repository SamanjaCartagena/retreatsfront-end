import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, where, getDocs, query } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, listAll, uploadBytes, deleteObject} from "firebase/storage";
import { db, auth,storage} from "../../firebase.js";

import React,{useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
function GuideDetails() {
    const params = useParams()
        const guideId= params.id
        const [loggedIn, setLoggedIn] = useState(false)
        const [userId, setUserId] = useState("")
        const [guideIsUser, setGuideIsUser] = useState(false)
        const [guestEmail, setGuestEmail] = useState("")
        const [documentId, setDocumentId] = useState("")
        const [guideFirstName, setGuideFirstName] = useState("")
        const [imageList, setImageList]=useState([])
        const [hostPic, setHostPic] = useState("")
        useEffect(()=>{
          window.scrollTo(0,0)
          const auth=getAuth()
                  onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://google.com
            const uid = user.uid;
            setUserId(uid);
            const guestEmail = user.email;
            setLoggedIn(true)
            if(user.uid ==guideId){
              setGuideIsUser(true)
    
            }
            else{
              setGuideIsUser(false)
            }
          } else {
            // User is signed out
            setLoggedIn(false)
            console.log("User is logged out");
          }
        });
                  
                  const q2 = query(collection(db, "guides"), (where("id", "==", guideId)));
                  getDocs(q2).then((querySnapshot) => {
                 
                  const retreats: any[] = [];
                  querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data().name);
        
                    retreats.push({ ...doc.data() });
                    setDocumentId(doc.id);
                    setGuideFirstName(doc.data().name);
                    
                
                    console.log("Retreat id is", doc.data().retreatId)
                    
                  console.log(retreats);  
                  })
                 
                });
            
            
                    const profilePicRef = ref(storage, `/profilePic/${guideId}/profile.jpg`);
                  getDownloadURL(profilePicRef).then((url)=>{
                    setHostPic(url);
                  }).catch((error)=>{
                    console.log("Error getting profile picture:", error);
                  })
                    const imageListRef = ref(storage, `/retreatimages/${userId}/${guideId}/`);
        
                  listAll(imageListRef).then((res)=>{
                                    res.items.forEach((item)=>{
                                      getDownloadURL(item).then((url)=>{
                                        setImageList((prev)=>[...prev, url]);
                                        
                                      });
                                    });
                                  })
        
                                },[guideId])
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