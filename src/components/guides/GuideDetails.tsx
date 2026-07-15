import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, listAll, uploadBytes, deleteObject} from "firebase/storage";
import { db, auth,storage} from "../../firebase.js";
import {v4} from 'uuid';
import Modal from '../Modal'

import React,{useEffect, useState, useRef} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button.js';
import { Input } from '../ui/input.js';
import emailjs from '@emailjs/browser';
import { useToast } from "@/hooks/use-toast";
import { Card } from '../ui/card.js';
import ModalImage from '../ModalImage.js';


function GuideDetails() {
    const params = useParams()
              const userId= params.id
            const form = useRef();
        const edit=()=>{
          setOpenEditor(true)
        }
        
        const [loggedIn, setLoggedIn] = useState(false)
        const [guideId, setGuideId] = useState("")
        const [guideProfession, setGuideProfession] = useState("")
        const [guideEmail, setGuideEmail] = useState("")
        const [guidePhone, setGuidePhone] = useState("")
        const [guideCity, setGuideCity] = useState("")
        const [guideIntroduction, setGuideIntroduction] = useState("")
        const [imageUpload, setImageUpload] = useState(null);
        const [currentUser, setCurrentUser] = useState(false)
        const [guideUsername, setGuideUsername] = useState("")
        const [guideLocation, setGuideLocation] = useState("")
        const [firstName, setFirstName] = useState("")
        const [lastName, setLastName] = useState("")
        const [documentId, setDocumentId] = useState("")
        const [avatarUrl, setAvatarUrl] = useState(null)
        const [guideFirstName, setGuideFirstName] = useState("")
        const [imageList, setImageList]=useState([])
        const [imageUrl, setImageUrl] = useState("")
        const [openSomething, setOpenSomething] = useState(false)
        const [hostPic, setHostPic] = useState("")
        const [guideType, setGuideType] = useState("")
        const [openEditor, setOpenEditor] = useState(false)
        const [guideSpecialty, setGuideSpecialty] = useState("")
        const [guide1, setGuide1] = useState(guideSpecialty[0])
        const [guide2, setGuide2] = useState("")
        const [guide3, setGuide3] = useState("")
        const [inquiryModal, setInquiryModal] = useState(false)
        const [formData, setFormData] = useState({
              user_name:"",
              user_email:"",
              user_message:""
             })
          const saveChanges =()=>{
              const docRef = doc(db, "guides", documentId);
              updateDoc(docRef, { guideFirstName: firstName,
                guideLastName: lastName,
                guideEmail: guideEmail, 
                guideUserName:guideUsername,
                guideIntroduction: guideIntroduction,
                guidePhone:guidePhone,
                guideProfession: guideProfession,
                guideSpecialty:[guide1, guide2, guide3].concat(guideType).filter(Boolean),
                
               });
               setOpenEditor(false);
            }
         const { toast } = useToast();
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
          };
        
       const handleSubmit=(e: React.FormEvent)=>{
    e.preventDefault();

    emailjs
      .sendForm('service_9u700we', 'template_slv7qow', form.current, {
        publicKey: 'iYI6t4bT28fP2liFc',
      })
      .then(
        () => {

          console.log('SUCCESS!');
          setInquiryModal(false)
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
          toast({
      title: "Inquiry Submitted",
      description: `Thank you for your interest in ${guideFirstName}. We will get back to you soon!` ,
    });
    // Reset form
   
                    }

        const passImageUrl=(e)=>{
          setImageUrl(e)
          setOpenSomething(true)
        }
       
        useEffect(()=>{
          window.scrollTo(0,0)
            const loadData = async () => {
               const q =query(collection(db, "guides"), where("guideId", "==", userId));
                const querySnapshot = await getDocs(q);
                 if(querySnapshot.size === 0){
                    return;
                  }
                  else{
                  querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              setDocumentId(doc.id)
              setAvatarUrl(doc.data().guideProfilePicUrl)
              setFirstName(doc.data().guideFirstName);
              setLastName(doc.data().guideLastName);
              setGuideUsername(doc.data().guideUserName)
              setGuideEmail(doc.data().guideEmail);
              setGuideId(doc.data().guideId);
              setGuideProfession(doc.data().guideProfession)
              setGuideCity(doc.data().guideCity)
              setGuideLocation(doc.data().guideLocation)
              setGuideSpecialty(doc.data().guideSpecialty)
              setGuideIntroduction(doc.data().guideIntroduction);
              setGuidePhone(doc.data().guidePhone);
            });
          }
        }
          
        
              loadData()
              console.log("Document id is"+documentId)
          const auth=getAuth()
                  onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://google.com
            const uid = user.uid;

            if(user.uid === userId){
              setCurrentUser(true)
              console.log("Current user is the guide")
            }
            else{
              setCurrentUser(false)
            }
            const guestEmail = user.email;
            setLoggedIn(true)
          
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
            
               const profilePic = ref(storage, `/guideProfilePic/${userId}/profile.jpg`);
                  getDownloadURL(profilePic).then((url)=>{
                    setAvatarUrl(url);
                  }
                  );
                       
                                const imageListRef = ref(storage, `/guideImage/${userId}/`);
                    
                              listAll(imageListRef).then((res)=>{
                                                res.items.forEach((item)=>{
                                                  getDownloadURL(item).then((url)=>{
                                                    setImageList((prev)=>[...prev, url]);
                                                    
                                                  });
                                                });
                                              });
                                
        
                                },[userId])

                              const profile=()=>{
            
            const profilePicRef = ref(storage, `/guideProfilePic/${userId}/profile.jpg`);
            uploadBytes(profilePicRef, imageUpload).then((snapshot)=>{
              getDownloadURL(snapshot.ref).then((url)=>{
                setAvatarUrl(url);
                  const docRef = doc(db, "guides", documentId);
        
                   updateDoc(docRef, {
                     guideProfilePicUrl: avatarUrl,
                    
                           });
              }
              );
            });
           }
            const uploadImage=(e)=>{
                   e.preventDefault();
                  // Create a root reference
                  console.log("Upload Image");
                  if(imageUpload == null) return;
                  
                  
                  const imageRef = ref(storage, `/guideImage/${userId}/${imageUpload.name+v4()}`);
                  uploadBytes(imageRef, imageUpload).then((snapshot)=>{
                    getDownloadURL(snapshot.ref).then((url)=>{
                      setImageList((prev)=>[...prev, url]);
                    }
                    );
                  });
                  console.log("imageList", imageList);
              
                }
                 const deleteImage=(url)=>{
                       alert("Are you sure you want to delete this image?"+url);
                        const imageRef = ref(storage, url);
                        deleteObject(imageRef).then(() => {
                          setImageList((prev)=>prev.filter((imageUrl)=>imageUrl!==url));
                        }).catch((error) => {
                          console.error("Error deleting image: ", error);
                        });
                     }
              
              
  return (
                             <div className="max-w-full pt-40 mx-auto p-4 grid place-items-center" style={{ backgroundColor:'lightGray', color:'black'}}>
                                  <div className="flexbox gap-4">
                                            <img src={avatarUrl} alt="Avatar" className="w-60 h-60 mt-2 rounded-full mb-4 justify-center items-center mx-auto object-cover"/>
                                             {currentUser &&
                                               <div>
                                           <input type="file" id="profile-pic" className='bg-lime-700 w-60 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
                                           <br/><br/>
                                           <Button onClick={profile} className='bg-lime-700  w-60 text-white font-bold py-2 px-4 m-2 rounded focus:outline-none focus:shadow-outline'>Upload Profile Picture</Button>
                                           </div>
                                                }
                                           
                                              {currentUser &&
                                               <div>
                                           
                                           <Button onClick={edit} className='bg-lime-700  w-60 text-white font-bold py-2 px-4 m-2 rounded focus:outline-none focus:shadow-outline'>Edit Info</Button>
                                           </div>
                                                }
                                           </div>
                                              <Modal isOpen={openEditor} onClose={()=>setOpenEditor(false)}>
          <div style={{width:'100%', height:'700px', overflowY:'scroll'}} className="justify-center mt-20 items-center text-center p-4 bold text-sm">
              <h1 className="text-2xl font-bold mb-4">Edit Your Profile</h1>
             <input type="text" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded w-full"/>
             <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded w-full"/>
             <input type="email" placeholder="Email" value={guideEmail} onChange={(e)=>setGuideEmail(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded w-full"/>
             <input type="text" placeholder="Username" value={guideUsername} onChange={(e)=>setGuideUsername(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded w-full"/>
             <textarea placeholder="Guide Profession" value={guideProfession} onChange={(e)=>setGuideProfession(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded w-full"/>
                           <textarea placeholder="Guide Profession" value={guideIntroduction} onChange={(e)=>setGuideIntroduction(e.target.value)} className="mb-2 p-2 border border-gray-300 h-40 rounded w-full"/>

              
              <h1 className="text-xl font-bold mb-2">Specialty</h1>
                 <select className="bg-white p-2 rounded-md" onChange={(e)=>setGuide1(e.target.value)} value={guide1}>
              <option value="">Select Type</option>
    <option value="Adventure">Adventure</option>
    <option value="Art">Art</option>
    <option value="Ayurveda">Ayurveda</option>
    <option value="Breathwork">Breathwork</option>
        <option value="Chakras">Chakras</option>

        <option value="Detox">Detox</option>
        <option value="Energy">Energy Healing</option>
        <option value="Horse">Horse Retreat</option>
     <option value="Men">Men's Retreat</option>
    <option value="Meditation">Meditation</option>
    <option value="Mens Retreat">Mens Retreat</option>
    <option value="Martial Arts">Martial Arts</option>
    <option value="Photography">Photography</option>
    <option value="Plant Medicine">Plant Medicine</option>
  <option value="Shamanic Journey">Shamanic Journey</option>
  <option value="Sound Healing">Sound Healing</option>
    <option value="Spiritual">Spiritual</option>
        <option value="Surfing">Surfing</option>
        <option value="Views">Tourist Guide</option>
    <option value="Vegan">Vegan</option>
    <option value="Yoga">Yoga</option>
    <option value="Womens Retreat">Women's Retreat</option>
    <option value="Writing">Writing</option>
               

              </select>
              <br/>
                  <select className="bg-white p-2 rounded-md" onChange={(e)=>setGuide2(e.target.value)} value={guide2}>
              <option value="">Select Type</option>
    <option value="Adventure">Adventure</option>
    <option value="Art">Art</option>
    <option value="Ayurveda">Ayurveda</option>
    <option value="Breathwork">Breathwork</option>
        <option value="Chakras">Chakras</option>

        <option value="Detox">Detox</option>
        <option value="Energy">Energy Healing</option>
        <option value="Horse">Horse Retreat</option>
     <option value="Men">Men's Retreat</option>
    <option value="Meditation">Meditation</option>
    <option value="Mens Retreat">Mens Retreat</option>
    <option value="Martial Arts">Martial Arts</option>
    <option value="Photography">Photography</option>
    <option value="Plant Medicine">Plant Medicine</option>
  <option value="Shamanic Journey">Shamanic Journey</option>
  <option value="Sound Healing">Sound Healing</option>
    <option value="Spiritual">Spiritual</option>
        <option value="Surfing">Surfing</option>
        <option value="Views">Tourist Guide</option>
    <option value="Vegan">Vegan</option>
    <option value="Yoga">Yoga</option>
    <option value="Womens Retreat">Women's Retreat</option>
    <option value="Writing">Writing</option>
               

              </select>
              <br/>
                  <select className="bg-white p-2 rounded-md" onChange={(e)=>setGuide3(e.target.value)} value={guide3}>
              <option value="">Select Type</option>
    <option value="Adventure">Adventure</option>
    <option value="Art">Art</option>
    <option value="Ayurveda">Ayurveda</option>
    <option value="Breathwork">Breathwork</option>
        <option value="Chakras">Chakras</option>

        <option value="Detox">Detox</option>
        <option value="Energy">Energy Healing</option>
        <option value="Horse">Horse Retreat</option>
     <option value="Men">Men's Retreat</option>
    <option value="Meditation">Meditation</option>
    <option value="Mens Retreat">Mens Retreat</option>
    <option value="Martial Arts">Martial Arts</option>
    <option value="Photography">Photography</option>
    <option value="Plant Medicine">Plant Medicine</option>
  <option value="Shamanic Journey">Shamanic Journey</option>
  <option value="Sound Healing">Sound Healing</option>
    <option value="Spiritual">Spiritual</option>
        <option value="Surfing">Surfing</option>
        <option value="Views">Tourist Guide</option>
    <option value="Vegan">Vegan</option>
    <option value="Yoga">Yoga</option>
    <option value="Womens Retreat">Women's Retreat</option>
    <option value="Writing">Writing</option>
               

              </select><br/>
              
                                         <textarea placeholder="Types of Retreats" value={guideType} onChange={(e)=>setGuideType(e.target.value)} className="mb-2 p-2 border border-gray-300 rounded w-full"/>

             <br/>
             <button onClick={saveChanges} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Save Changes</button>
                
              
           
              
              
      
                </div>
                </Modal>
                                           <Modal isOpen={inquiryModal} onClose={()=>setInquiryModal(false)} >
            <form className="bg-white p-6 rounded shadow-md w-96 mt-20" onSubmit={handleSubmit} ref={form}>
              <h2 className="text-lg font-bold mb-4">Contact {guideFirstName}</h2>
              <label className="block text-gray-700 text-sm font-bold mb-2" >
                Your Email
              </label>
              <Input type="email" name="user_email" required placeholder="Your email address" value={formData.user_email} onChange={handleInputChange} className="w-full p-2 border rounded mb-4" />
              <textarea className="w-full h-32 p-2 border rounded mb-4" name="user_message"   onChange={handleInputChange} value={formData.user_message}  >
              </textarea>
              <input type="submit" value="Send Inquiry" className="bg-lime-700 hover:bg-white hover:text-lime-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" />
            </form>
            </Modal>
                                     <Button className="bg-lime-700 hover:bg-white hover:text-lime-700 lg:w-60 text-center text-white m-2 justify-items: right" onClick={()=>setInquiryModal(true)}>Contact&nbsp;{firstName}</Button>
                               
                              <h2 className='text-2xl font-bold m-2'>{firstName}&nbsp;{lastName}</h2>
                              
                                                            <h2 className='text-xl font-bold m-2'>{guideCity},&nbsp;{guideLocation}</h2>
                                                                                                                        <h2 className='text-xl font-bold m-2'>Username:&nbsp;{guideUsername}</h2>


                                                          <h2 className='text-xl font-bold m-2'>Profession:&nbsp;{guideProfession}</h2>
                                                          <h2 className='text-xl font-bold m-2'>{guideSpecialty[0]},&nbsp;{guideSpecialty[1]},&nbsp;{guideSpecialty[2]},&nbsp;{guideSpecialty[3]}</h2>

                                                          
                                                          

                                                            <p className='container mt-10 text-lg font-bold'>{guideIntroduction}</p>
                                                            

                              {currentUser &&
                              <div className="mb-4 ">
                              
                              <label for="profile-pic">Upload pics</label><br/>
                                      <input type="file" id="profile-pic" className='bg-lime-700 cursor-pointer m-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
                                  
                                    <Button onClick={uploadImage} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Image</Button>
                                  </div>
                                   }
                                  <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:flex  gap-2 w-full m-4 mt-6 justify-center align-center items-center justify-items-center" >

                                      {imageList.length > 0 &&  imageList.map((imageUrl, index) => (
             
                                <Card className="rounded-xl w-60 bg-transparent overflow-hidden hover:shadow-md transition-all retreat-card cursor-pointer justify-center items-center m-2" key={index} onClick={()=>passImageUrl(imageUrl)}>
                                 <img className="w-85 md:w-50 lg:w-full items-center rounded-lg" src={imageUrl} alt="Retreats Around The World" />
                                 {currentUser &&
                              <Button className='bg-lime-700 hover:bg-lime-800 m-4' onClick={(e)=>deleteImage(imageUrl)}>Delete</Button>
                                 }
      
                                      </Card>
    
                                           ))}

                                  
                                  </div>
                                   <ModalImage isOpen={openSomething} onClose={()=>setOpenSomething(false)} >
                                                  <div className="w-90% h-full justify-center items-center bg-transparent">
                                                    <img className="w-full h-full items-center rounded-lg" src={imageUrl} alt="Retreats Around The World" />
                                  
                                                    </div>
                                                    </ModalImage>
                              </div>

  )
}

export default GuideDetails