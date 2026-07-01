import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, listAll, uploadBytes, deleteObject} from "firebase/storage";
import { Card, CardContent } from "@/components/ui/card";
import { List, Star } from "lucide-react";
import { collection, query, getDocs, orderBy, limit, startAfter,  where, and, or, endBefore, limitToLast} from 'firebase/firestore';
import {db} from '../../firebase.js';
import ReactPaginate from 'react-paginate';
import ModalHosts from '../ModalHost.js';
import { Separator } from "@radix-ui/react-separator";

export default function Hosts() {
    const [listOfGuides, setListOfGuides] = useState([]);
    const [listOfHosts, setListOfHosts] = useState([]);
      const [selectedType, setSelectedType] = useState("");
      const [searchLocation, setSearchLocation] = useState("");
       const navigate=useNavigate()
    
 useEffect(() => {
       const fetchData = async () => {
       try {
         const guides = [];
         // Reference the collection
         if (searchLocation ===  "" && selectedType === "") {
           const q = query(collection(db, "hosts"));
         const querySnapshot = await getDocs(q);
         querySnapshot.forEach((doc) => {
           guides.push({ ...doc.data() });
         });
         setListOfGuides(guides);
         return;
 
         
         }
         else if (  selectedType === "" && searchLocation !== "") {
          setListOfGuides([])
       const guides1 = [];
         const q2 = await query(collection(db, "hosts"), (where("location", "==", searchLocation)));
         getDocs(q2).then((querySnapshot) => {
        
 
         querySnapshot.forEach((doc) => {
           console.log(doc.id, " => ", doc.data().hostFirstName);
           guides1.push({ ...doc.data() });
           
         console.log(guides1);  
                  setListOfGuides(guides1);
         })
       });
     }
       else if (  selectedType !== "" && searchLocation == "") {
          setListOfGuides([])
       const guides1 = [];
       const q2 =query(collection(db, "hosts"),or (where("type1", "==",selectedType), where("type2","==",selectedType), where("type3","==", selectedType), where("type4","==",selectedType)));

       getDocs(q2).then((querySnapshot) => {
        
 
         querySnapshot.forEach((doc) => {
           console.log(doc.id, " => ", doc.data().hostFirstName);
           guides1.push({ ...doc.data() });
           
         console.log(guides1);  
                  setListOfGuides(guides1);
         })
       });
     }
   
      
  
    
       }
       catch (err) {
         console.error("Error fetching data: ", err);
       } 
     };
 
     fetchData();
     
     
  
 
  
 
 
  
   
   }, [selectedType, searchLocation]);
 

  

 
  const search=(e) => {
    console.log(e.target.value)
    if(e.target.value==""){
      window.location.reload()
    }
    setSelectedType(e.target.value)
    
  }
    const searchPlace=(e) => {
    console.log(e.target.value)
    if(e.target.value==""){
      window.location.reload()
    }
    setSearchLocation(e.target.value)
    
  }
 
   


    const [pageNumber, setPageNumber] = useState(0)
    
      const usersPerPage = 8
      const pagesVisited = pageNumber * usersPerPage
      const pageCount = Math.ceil(listOfGuides.length/usersPerPage)
      const changePage= ({selected}) => {
          setPageNumber(selected)

      }
      const displayHosts = listOfGuides.slice(pagesVisited, pagesVisited + usersPerPage)
       .map(guide => {
          return(
                  <div key={guide.id} >

                           <h2 className="text-xl font-bold mb-2">{guide.name}</h2>
                            <Link to={`${guide.hostId}`}>
                            <Card className="rounded-xl overflow-hidden border-none shadow-lg hover:shadow-md transition-all retreat-card cursor-pointer " >
                     <div className="aspect-[5/3] overflow-hidden">
                       <img
                         src={`${guide.hostProfilePicUrl}`}
                         alt={guide.hostFirstname}
                         className="w-full h-full object-cover transition-transform duration-500"
                       />
                     </div>
                     <CardContent className="p-4">
                      
               
               
                      
                       <div className="mt-3 font-medium">
               
               
                         <span className="text-sm text-muted-foreground"><strong>{guide.hostFirstName}&nbsp;&nbsp;&nbsp;{guide.hostLastName}</strong></span><br/>
                                                  <span className="text-sm text-muted-foreground">{guide.hostRetreatDetails.slice(0,150)}....</span>

                         
                            
                                            
               
                       </div>
                     </CardContent>
                   </Card>
                   </Link>
                   </div>
          
            
      )})
  return (
    <div>
      <div className=" py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
            Meet our Hosts!
          </h2>
         
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
             <select className="bg-white p-2 rounded-md" onChange={(e)=>setSelectedType(e.target.value)} value={selectedType}>
    <option value="">Select Type</option>
    <option value="Meditation">Meditation</option>
    <option value="Vegan">Vegan</option>
    <option value="Sound Healing">Sound Healing</option>
    <option value="Yoga">Yoga</option>
    <option value="Alchemistry">Alchemistry</option>
    <option value="Forest">Forest Healing</option>
    <option value="Workout">Workout</option>
    <option value="Hiking">Hiking</option>
    <option value="Womens">Women's Retreat</option>

    </select>
           
  
    <select className="bg-white p-2 rounded-md" onChange={searchPlace} >
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
    
           
           
          </div>
        </div>
      </div>
    </div>
         
   <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8" >
       {displayHosts}
       
    </div> 
     <div className="flex justify-center items-center gap-4 mb-8">
                                                    <ReactPaginate
                                                          previousLabel={"Previous"}
                                                           nextLabel={"Next"}
                                                          pageCount={pageCount}
                                                          onPageChange={changePage}
                                                          containerClassName={"paginationBttns"}
                                                       previousLinkClassName={"previousBttn"}

                                                          />
                                                         </div>   
            
         </div>   
         
    
  
  );

}
