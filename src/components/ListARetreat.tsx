import React,{useState, useEffect} from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, ref, listAll, uploadBytes, deleteObject} from "firebase/storage";
import { doc, getDoc, collection, query, where, getDocs, addDoc, updateDoc,serverTimestamp, Timestamp} from "firebase/firestore";
import { db, auth,storage} from "../firebase.js";

import { useParams, useNavigate } from 'react-router-dom';
import {v4} from 'uuid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import pic from '../assets/form.png';
import { Button } from './ui/button.js';
import Modal from './Modal.js';
import nodemailer from 'nodemailer';
function ListARetreat() {
   const [retreatName, setRetreatName] = useState("")
   const[retreatCenterName, setRetreatCenterName]= useState("")
   const[retreatType, setRetreatType] = useState("")
   const[address,setAddress] = useState("")
   const[country,setCountry] = useState("")
   const [startDate, setStartDate] = useState(null)
   const [endDate, setEndDate] = useState(null)
   const [state, setState] = useState("")
   const [currency, setCurrency] = useState("USD");
   const[price,setPrice] = useState(0.00)
  const [value, setValue] = React.useState<Dayjs | null>();
      const [selectedMonth, setSelectedMonth] = useState(dayjs().format('MM/DD/YYYY'));
   const [kind,setKind] = useState("")
   const[isTerms, setIsTerms] = useState(false)
   const [documentId,setDocumentId] = useState("")
   const [hostFirstName, setHostFirstName] = useState("")
   const [hostEmail, setHostEmail] = useState("")
   const [hostLastName, setHostLastName] = useState("")
   const [imageUpload, setImageUpload] = useState(null);
   const [avatarUrl, setAvatarUrl] = useState("");
   const [imageList, setImageList] = useState([]);
   const [retreatId, setRetreatId] = useState(Math.floor(Math.random() * 1000000));
   const params = useParams();
   const userId = params.userId;
   const navigate= useNavigate()
    const imageListRef = ref(storage, `/retreatimages/${userId}/${retreatId}/`);
    const deleteImage=(url)=>{
       alert("Are you sure you want to delete this image?"+url);
        const imageRef = ref(storage, url);
        deleteObject(imageRef).then(() => {
          setImageList((prev)=>prev.filter((imageUrl)=>imageUrl!==url));
        }).catch((error) => {
          console.error("Error deleting image: ", error);
        });
     }
    const uploadImage=(e)=>{
        e.preventDefault();
       // Create a root reference
       console.log("Upload Image");
       if(imageUpload == null) return;
       
       
       const imageRef = ref(storage, `/retreatimages/${userId}/${retreatId}/${imageUpload.name+v4()}`);
       uploadBytes(imageRef, imageUpload).then((snapshot)=>{
         getDownloadURL(snapshot.ref).then((url)=>{
           setImageList((prev)=>[...prev, url]);
         }
         );
       });
       console.log("imageList", imageList);
   
     }
   const pricing =(event)=>{
    const doubleValueFloat = parseFloat(event.target.value);
    setPrice(doubleValueFloat)

   }

     const startAtDate=(e)=>{
    const timestamp = Timestamp.fromDate(new Date(e));
    setStartDate(timestamp)
  


}
const endAtDate=(e)=>{
  const timestamp1 = Timestamp.fromDate(new Date(e));
 setEndDate(timestamp1)
}

 


   const host =() => {

      
         addDoc(collection(db, "retreats"), {
                                         name: retreatName,
                                         type1: retreatType,
                                         retreatCenterName: retreatCenterName,
                                         address: address,
                                         location: country,
                                         state: state,
                                         price:price, 
                                         retreatId: retreatId,
                                         id:v4()+userId,
                                         hostId:userId,
                                         hostFirstName:hostFirstName,
                                         hostEmail:hostEmail,
                                         hostLastName:hostLastName,
                                         isDisplayed: true,
                                         startAt: startDate,
                                         endAt: endDate,
                                         kind: kind,
                                         currency: currency,
                                         createdAt: serverTimestamp(),
                                         pic1: imageList[0],
                                        
                                         

         }).then(async ()=>{
          
       await  fetch('https://retreatsaroundtheworld.net/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body:JSON.stringify({ name: hostFirstName, email: hostEmail, content: "Thank you for hosting your retreat with us! We will review your submission and get back to you soon." }), // Convert JS object to JSON string
    });
          navigate('/')

  })
      
      
      

      
      

          }
   useEffect(()=>{
    console.log(userId)
       onAuthStateChanged(auth, async (user) => {
         if (user)  {
           // User is signed in
           console.log("host Id is: ", userId)
     
          const q =query(collection(db, "hosts"), where("hostId", "==", userId));
           const querySnapshot = await getDocs(q);
               querySnapshot.forEach((doc) => {

         setDocumentId(doc.id)
         setHostFirstName(doc.data().hostFirstName)
         setHostLastName(doc.data().hostLastName)
         setHostEmail(doc.data().hostEmail)
         console.log(doc.data().hostFirstName)
               })
              }
                  listAll(imageListRef).then((res)=>{
                    res.items.forEach((item)=>{
                      getDownloadURL(item).then((url)=>{
                        setImageList((prev)=>[...prev, url]);
              
                      });
                    });
                  });
                  const retreatQuery = query(collection(db, "retreats"), where("hostId", "==", userId));
                          const retreatQuerySnapshot = await getDocs(retreatQuery);
                                    setRetreatId(retreatQuerySnapshot.size + 1);

 
         
            })
  
            
   },[userId])
  return (
    <div >
     <div className="relative h-[600px] min-h-[600px] w-full overflow-hidden">
      <Modal isOpen={isTerms} onClose={()=>setIsTerms(false)}>
         <div className="p-6 justify-center items-center text-center  h-[700px]">
            <br/>
            <br/>
            <br/>
            <h2 className="text-2xl font-bold mb-4">Please read the terms and conditions</h2>
            <p className="mb-4">
              This PDF includes sections dedicated to:<br/>

<strong>Good Faith Agreements:</strong> Establishing a foundation of honesty, transparency, and fair dealing.<br/>

<strong>Host Responsibilities:</strong> Covering listing accuracy, operational delivery, and legal/safety compliance.<br/>

<strong>Professional Standards:</strong> Guidelines for communication and service quality.<br/>

<strong>Financial Obligations:</strong> Clarity on pricing and booking integrity.<br/>
            </p>
          <Button onClick={()=>window.open('https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/Retreats_Around_The_World_Host_Terms.pdf?alt=media&token=d21b1566-82b2-49cc-b0b5-0b4f225e3e77', '_blank')} className="bg-retreat-forest text-white hover:bg-retreat-cream hover:text-retreat-forest" >
            Open PDF
          </Button>
        </div>
      </Modal>
      
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${pic})` }}
      ></div>
          <div className="absolute inset-0 hero-gradient flex flex-col justify-center">
                 <div className="container mx-auto max-w-3xl px-4 md:px-6">
                   <div className="animate-fade-in">
                     <h1 className="text-3xl md:text-3xl sm:text-2xl md:pt-6 lg:text-3xl font-serif font-bold tracking-tight text-white mb-6">
                       Before you host a retreat, please read through our policies and guidelines. 
                     </h1>
                    
                    
       
                    
       
                     <div className="flex flex-col sm:flex-row gap-4">
                       <Button className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" onClick={()=>setIsTerms(true)}>
                        Terms and Conditions
                       </Button>
                       <Button variant="outline" className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" >
                       Cancellation Policy
                       </Button>
                       <Button variant="outline" className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" >
                        Funds and Payouts
                       </Button>
                      
                     </div>
                   </div>
                 </div>
               </div>
      </div>
      <div className="grid justify-center  items-center " >
      <form className="bg-white max-w-full min-w-xs shadow-md rounded px-8 pt-6 pb-8  mt-4" >
        <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Name of Retreat
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstname" type="text" placeholder="Name of Retreat" onChange={(e)=>setRetreatName(e.target.value)}/>
    </div>
         <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Type of Retreat
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="text" placeholder="Type of Retreat" onChange={(e)=>setRetreatType(e.target.value)}/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Name of Retreat Center/Hotel/Place
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="center" type="text" placeholder="Name of Retreat Center/Hotel/Place" onChange={(e)=>setRetreatCenterName(e.target.value)}/>
    </div>
     <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Address of Retreat
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="text" placeholder="Address of Retreat" onChange={(e)=>setAddress(e.target.value)}/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Country of Retreat
      </label>
      <select className="bg-white p-2 rounded-md" onChange={(e)=>setCountry(e.target.value)} value={country}>
        <option value="">Select Location</option>
    <option value="Afghanistan">Afghanistan</option>
    <option value="Albania">Albania</option>
    <option value="Algeria">Algeria</option>
    <option value="Andorra">Andorra</option>
    <option value="Angola">Angola</option>
    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
    <option value="Argentina">Argentina</option>
    <option value="Armenia">Armenia</option>
    <option value="Australia">Australia</option>
    <option value="Austria">Austria</option>
    <option value="Azerbaijan">Azerbaijan</option>
    <option value="Bahamas">Bahamas</option>
    <option value="Bahrain">Bahrain</option>
    <option value="Bangladesh">Bangladesh</option>
    <option value="Barbados">Barbados</option>
    <option value="Belarus">Belarus</option>
    <option value="Belgium">Belgium</option>
    <option value="Belize">Belize</option>
    <option value="Benin">Benin</option>
    <option value="Bhutan">Bhutan</option>
    <option value="Bolivia">Bolivia</option>
    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
    <option value="Botswana">Botswana</option>
    <option value="Brazil">Brazil</option>
    <option value="Brunei">Brunei</option>
    <option value="Bulgaria">Bulgaria</option>
    <option value="Burkina Faso">Burkina Faso</option>
    <option value="Burundi">Burundi</option>
    <option value="Cabo Verde">Cabo Verde</option>
    <option value="Cambodia">Cambodia</option>
    <option value="Cameroon">Cameroon</option>  
    <option value="Canada">Canada</option>
    <option value="Central African Republic">Central African Republic</option>
    <option value="Chad">Chad</option>
    <option value="Chile">Chile</option>
    <option value="China">China</option>
    <option value="Colombia">Colombia</option>
    <option value="Comoros">Comoros</option>
    <option value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</option>
    <option value="Costa Rica">Costa Rica</option>
    <option value="Croatia">Croatia</option>
    <option value="Cuba">Cuba</option>
    <option value="Cyprus">Cyprus</option>
    <option value="Czechia (Czech Republic)">Czechia (Czech Republic)</option>
    <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>  
    <option value="Denmark">Denmark</option>
    <option value="Djibouti">Djibouti</option>
    <option value="Dominica">Dominica</option>
    <option value="Dominican Republic">Dominican Republic</option>
    <option value="Ecuador">Ecuador</option>
    <option value="Egypt">Egypt</option>
    <option value="El Salvador">El Salvador</option>
    <option value="Equatorial Guinea">Equatorial Guinea</option>
    <option value="Eritrea">Eritrea</option>
    <option value="Estonia">Estonia</option>
    <option value="Ethiopia">Ethiopia</option>
    <option value="Fiji">Fiji</option>
    <option value="Finland">Finland</option>
    <option value="France">France</option>
    <option value="Gabon">Gabon</option>
    <option value="Gambia">Gambia</option>
    <option value="Georgia">Georgia</option>
    <option value="Germany">Germany</option>
    <option value="Ghana">Ghana</option>
    <option value="Greece">Greece</option>
    <option value="Grenada">Grenada</option>
    <option value="Guatemala">Guatemala</option>
    <option value="Guinea">Guinea</option>
    <option value="Guinea-Bissau">Guinea-Bissau</option>
    <option value="Guyana">Guyana</option>
    <option value="Haiti">Haiti</option>
    <option value="Holy See">Holy See</option>
    <option value="Honduras">Honduras</option>
    <option value="Hungary">Hungary</option>
    <option value="Iceland">Iceland</option>
    <option value="India">India</option>
    <option value="Indonesia">Indonesia</option>
    <option value="Iran">Iran</option>
    <option value="Iraq">Iraq</option>
    <option value="Ireland">Ireland</option>
    <option value="Israel">Israel</option>
    <option value="Italy">Italy</option>
    <option value="Jamaica">Jamaica</option>
    <option value="Japan">Japan</option>
    <option value="Jordan">Jordan</option>
    <option value="Kazakhstan">Kazakhstan</option>
    <option value="Kenya">Kenya</option>
    <option value="Kiribati">Kiribati</option>
    <option value="Kuwait">Kuwait</option>
    <option value="Kyrgyzstan">Kyrgyzstan</option>
    <option value="Laos">Laos</option>
    <option value="Latvia">Latvia</option>
    <option value="Lebanon">Lebanon</option>
    <option value="Lesotho">Lesotho</option>
    <option value="Liberia">Liberia</option>
    <option value="Libya">Libya</option>
    <option value="Liechtenstein">Liechtenstein</option>
    <option value="Lithuania">Lithuania</option>
    <option value="Luxembourg">Luxembourg</option>
    <option value="Madagascar">Madagascar</option>
    <option value="Malawi">Malawi</option>
    <option value="Malaysia">Malaysia</option>
    <option value="Maldives">Maldives</option>
    <option value="Mali">Mali</option>
    <option value="Malta">Malta</option>
    <option value="Marshall Islands">Marshall Islands</option>
    <option value="Mauritania">Mauritania</option>
    <option value="Mauritius">Mauritius</option>
    <option value="Mexico">Mexico</option>
    <option value="Micronesia">Micronesia</option>
    <option value="Moldova">Moldova</option>
    <option value="Monaco">Monaco</option>
    <option value="Mongolia">Mongolia</option>
    <option value="Montenegro">Montenegro</option>
    <option value="Morocco">Morocco</option>
    <option value="Mozambique">Mozambique</option>
    <option value="Myanmar (Burma)">Myanmar (Burma)</option>
    <option value="Namibia">Namibia</option>
    <option value="Nauru">Nauru</option>
    <option value="Nepal">Nepal</option>
    <option value="Netherlands">Netherlands</option>
    <option value="New Zealand">New Zealand</option>
    <option value="Nicaragua">Nicaragua</option>
    <option value="Niger">Niger</option>
    <option value="Nigeria">Nigeria</option>
    <option value="North Korea">North Korea</option>
    <option value="North Macedonia">North Macedonia</option>
    <option value="Norway">Norway</option>
    <option value="Oman">Oman</option>
    <option value="Pakistan">Pakistan</option>
    <option value="Palau">Palau</option>
    <option value="Palestine">Palestine</option>
    <option value="Panama">Panama</option>
    <option value="Papua New Guinea">Papua New Guinea</option>
    <option value="Paraguay">Paraguay</option>
    <option value="Peru">Peru</option>
    <option value="Philippines">Philippines</option>
    <option value="Poland">Poland</option>
    <option value="Portugal">Portugal</option>
    <option value="Qatar">Qatar</option>
    <option value="Romania">Romania</option>
    <option value="Russia">Russia</option>
    <option value="Rwanda">Rwanda</option>
    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
    <option value="Saint Lucia">Saint Lucia</option>
    <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>  
    <option value="Samoa">Samoa</option>
    <option value="San Marino">San Marino</option>
    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
    <option value="Saudi Arabia">Saudi Arabia</option>
    <option value="Senegal">Senegal</option>
    <option value="Serbia">Serbia</option>  
    <option value="Seychelles">Seychelles</option>
    <option value="Sierra Leone">Sierra Leone</option>
    <option value="Singapore">Singapore</option>
    <option value="Slovakia">Slovakia</option>
    <option value="Slovenia">Slovenia</option>
    <option value="Solomon Islands">Solomon Islands</option>
    <option value="Somalia">Somalia</option>
    <option value="South Africa">South Africa</option>
    <option value="South Korea">South Korea</option>
    <option value="South Sudan">South Sudan</option>
    <option value="Spain">Spain</option>
    <option value="Sri Lanka">Sri Lanka</option>
    <option value="Sudan">Sudan</option>
    <option value="Suriname">Suriname</option>  
    <option value="Sweden">Sweden</option>
    <option value="Switzerland">Switzerland</option>
    <option value="Syria">Syria</option>
    <option value="Taiwan">Taiwan</option>
    <option value="Tajikistan">Tajikistan</option>
    <option value="Tanzania">Tanzania</option>
    <option value="Thailand">Thailand</option>
    <option value="Timor-Leste">Timor-Leste</option>
    <option value="Togo">Togo</option>
    <option value="Tonga">Tonga</option>
    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
    <option value="Tunisia">Tunisia</option>
    <option value="Turkey">Turkey</option>
    <option value="Turkmenistan">Turkmenistan</option>
    <option value="Tuvalu">Tuvalu</option>
    <option value="Uganda">Uganda</option>
    <option value="Ukraine">Ukraine</option>
    <option value="United Arab Emirates">United Arab Emirates</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="United States of America">United States of America</option>
    <option value="Uruguay">Uruguay</option>
    <option value="Uzbekistan">Uzbekistan</option>
    <option value="Vanuatu">Vanuatu</option>
    <option value="Venezuela">Venezuela</option>
    <option value="Vietnam">Vietnam</option>
    <option value="Yemen">Yemen</option>
    <option value="Zambia">Zambia</option>
    <option value="Zimbabwe">Zimbabwe</option>

    </select>
    <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" >
       State of Retreat (if in the US)
      </label>
    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setState(e.target.value)} value={state}>
      <option value="">Select US State</option>

      <option value="Alabama">Alabama</option>
      <option value="Alaska">Alaska</option>
      <option value="Arizona">Arizona</option>
      <option value="Arkansas">Arkansas</option>
      <option value="California">California</option>
      <option value="Colorado">Colorado</option>
      <option value="Connecticut">Connecticut</option>
      <option value="Delaware">Delaware</option>
      <option value="Florida">Florida</option>
      <option value="Georgia">Georgia</option>
      <option value="Hawaii">Hawaii</option>
      <option value="Idaho">Idaho</option>
      <option value="Illinois">Illinois</option>
      <option value="Indiana">Indiana</option>
      <option value="Iowa">Iowa</option>
      <option value="Kansas">Kansas</option>
      <option value="Kentucky">Kentucky</option>  
      <option value="Louisiana">Louisiana</option>
      <option value="Maine">Maine</option>
      <option value="Maryland">Maryland</option>
      <option value="Massachusetts">Massachusetts</option>
      <option value="Michigan">Michigan</option>
      <option value="Minnesota">Minnesota</option>
      <option value="Mississippi">Mississippi</option>
      <option value="Missouri">Missouri</option>
      <option value="Montana">Montana</option>
      <option value="Nebraska">Nebraska</option>
      <option value="Nevada">Nevada</option>
      <option value="New Hampshire">New Hampshire</option>
      <option value="New Jersey">New Jersey</option>
      <option value="New Mexico">New Mexico</option>
      <option value="New York">New York</option>
      <option value="North Carolina">North Carolina</option>
      <option value="North Dakota">North Dakota</option>
      <option value="Ohio">Ohio</option>
      <option value="Oklahoma">Oklahoma</option>
      <option value="Oregon">Oregon</option>
      <option value="Pennsylvania">Pennsylvania</option>
      <option value="Rhode Island">Rhode Island</option>
      <option value="South Carolina">South Carolina</option>
      <option value="South Dakota">South Dakota</option>
      <option value="Tennessee">Tennessee</option>
      <option value="Texas">Texas</option>
      <option value="Utah">Utah</option>
      <option value="Vermont">Vermont</option>
      <option value="Virginia">Virginia</option>
      <option value="Washington">Washington</option>
      <option value="West Virginia">West Virginia</option>
      <option value="Wisconsin">Wisconsin</option>
      <option value="Wyoming">Wyoming</option>
    </select>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Price of Retreat
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="Price" onChange={pricing}/>
      <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" >
       Currency
      </label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setCurrency(e.target.value)} value={currency}> 
        <option value="">Select Currency</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="AUD">AUD</option>
        <option value="CAD">CAD</option>
        <option value="RP">RP</option>
        <option value="IDR">IDR</option>         
      </select>
    </div>
    
    <div className="mb-4 flex gap-4">
      <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Start Date of Retreat
      </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={value} onChange={(e)=>startAtDate(e)}/>
    </LocalizationProvider>
    </div>
    <div>
    <label className="block text-gray-700 text-sm font-bold mb-2" >
       End Date of Retreat
      </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={value} onChange={(e)=>endAtDate(e)}/>
        
    </LocalizationProvider>

    </div>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Tell us something about the Retreat
      </label>
           <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e)=>setKind(e.target.value)}></textarea>
   
    </div>
        

    <div className="mb-4">

<label for="profile-pic">Upload at least one image</label><br/>

          <input type="file" id="profile-pic" className='bg-lime-700 cursor-pointer m-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
                   <Button onClick={uploadImage} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Image</Button>

          </div>
     {imageList.map((url)=>{
      return <div className='border-2 rounded border-solid border-lime-700  p-4'><img src={url} alt="Uploaded Image" key={url} style={{width:'250px',height:'350px;'}}/><br/>
                      <Button onClick={()=> deleteImage(url)} className='bg-lime-700  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline  text-center'>Delete Image</Button>



      </div>
      
     })}
        
    <Button className="bg-lime-700 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={host}>
        Host a Retreat
      </Button>
      </form>
      </div>
    </div> 
  )
}

export default ListARetreat