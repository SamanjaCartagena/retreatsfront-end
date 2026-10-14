import React,{useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Contact from '@/components/contact/Contact';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, ref, listAll, uploadBytes, deleteObject} from "firebase/storage";
import { doc, getDoc, collection, query, where, getDocs, addDoc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db, auth, storage } from "../../firebase";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { v4 } from 'uuid';
import { Button } from '../ui/button';

function ListAnEvent() {
    const pic="https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/events.png?alt=media&token=efff6256-0532-4aca-b225-a4a853660f49"
    const [eventLocation, setEventLocation] = useState('');
    const navigate=useNavigate()
    const params = useParams()
    const userId= params.userId
    const [eventName, setEventName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [price, setPrice] = useState(0);
    const [imageList, setImageList] = useState([]);
    
    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState<Timestamp | null>(null);
    const [endDate, setEndDate] = useState<Timestamp | null>(null);
    const [value, setValue] = React.useState<Dayjs | null>();
    const [eventKindId, setEventKindId] = useState(Math.floor(Math.random() * 1000000));
       const deleteImage=(url)=>{
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
       if(imageUpload == null){ return;}
       else{
       
       
       const imageRef = ref(storage, `/eventimages/${eventKindId}/${imageUpload.name+v4()}`);
       uploadBytes(imageRef, imageUpload).then((snapshot)=>{
         getDownloadURL(snapshot.ref).then((url)=>{
           setImageList((prev)=>[...prev, url]);
         }
         );
       });
      }
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
    const hostEvent=async(e)=>{
     e.preventDefault()
     await addDoc(collection(db, "events"), {
                                        eventName: eventName,
                                         startDate: startDate,
                                         endDate: endDate,
                                         eventKindId:eventKindId,
                                         address: address,
                                         city: city,
                                         country:eventLocation,
                                         price:price, 
                                         description:description,
                                         hostId:userId,
                                         pic:imageList[0],

      })
      navigate('/events')
    }
  return (
    <div className="justify-center items-center text-center ">
          <div className="relative h-[50vh] min-h-[500px] w-full overflow-hidden">
      
      
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${pic})` }}
      ></div>
  <div className="absolute inset-0 hero-gradient flex flex-col justify-center">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl sm:text-2xl md:pt-6 lg:text-6xl font-serif font-bold tracking-tight text-white mb-6">
                Host an Event!
              </h1>
              </div>
              </div> 
              </div>  
              
              </div>
              <center>
              <div className="justify-center items-center grid align-middle h-auto  w-full overflow-hidden">  
              <div className="container justify-center items-center text-center grid  m-5 p-5 border-2 border-solid border-gray rounded">
                <h1 className="text-2xl font-bold mb-4">Host an Event</h1>
                <form className="grid w-full gap-4 mt-4" onSubmit={hostEvent}>
                    <label>Event Name</label>
                    <input type="text" className="border-2 border-gray-300 rounded p-2" placeholder="Enter event name" onChange={(e) => setEventName(e.target.value)} />
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
                    <label>Event Address</label>
                    <input type="text" className="border-2 border-gray-300 rounded p-2" placeholder="Enter event address" onChange={(e) => setAddress(e.target.value)} />
                    <label>Event City/Region/Village/Town</label>
                    <input type="text" className="border-2 border-gray-300 rounded p-2" placeholder="Enter event city" onChange={(e) => setCity(e.target.value)} />
                    <label>Event Country</label>
                       <select className="bg-white p-2 rounded border-2" onChange={(e)=>setEventLocation(e.target.value)} value={eventLocation}>
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
                    <label>Event Description</label>
                    <textarea placeholder="Enter event description" className="border-2 border-gray-300 rounded p-2" onChange={(e) => setDescription(e.target.value)}></textarea>
                    <label>Price of Event in USD</label>
                    <input type="number" placeholder="Enter event price" className="border-2 border-gray-300 rounded p-2" onChange={pricing} />
                   <div className="m-4">
                   
                   <label for="profile-pic">Upload at least one image of your retreat or plans. Please do not upload flyers</label><br/>
                           <input type="file" id="profile-pic" className='bg-lime-700 cursor-pointer m-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
                       
                         <Button onClick={uploadImage} className='bg-lime-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Upload Image</Button>
                       </div>
                        
                        {imageList.map((url)=>{
                         return <div className='border-2 rounded border-solid border-lime-700  p-4'><img src={url} alt="Uploaded Image" key={url} style={{width:'250px',height:'350px'}}/><br/>
                                         <Button onClick={()=> deleteImage(url)} className='bg-lime-700  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline  text-center'>Delete Image</Button>
                   
                   
                   
                         </div>
                         
                        })}
                    <button type="submit" className="bg-lime-700 w-60 text-white py-2 px-4 rounded hover:bg-lime-600 hover:color-white transition duration-300" >
                        Submit
                    </button>
                </form>

              </div>
              </div>
              </center>
              <Contact/>
    </div>
  )
}

export default ListAnEvent