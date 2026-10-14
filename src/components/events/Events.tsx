import { Card, CardContent } from "@/components/ui/card";
import { List, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy, limit, startAfter,  where, and, or, endBefore, limitToLast} from 'firebase/firestore';
import {db} from '../../firebase.js';
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router-dom'


export default function Events() {
    const [listOfEvents, setListOfEvents] = useState([]);
      const [selectedType, setSelectedType] = useState("")
      const [searchType, setSearchType] = useState("Select Type");
      const [searchLocation, setSearchLocation] = useState('');
        const [selectedLocation, setSelectedLocation] = useState("");
       const [currency, setCurrency]= useState("")
      const [selectedPrice, setSelectedPrice] = useState(0.0)
      const [pic, setPic] = useState("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")
 const details = () => {

 }
  useEffect(() => {
 
        
            
       const fetchData = async () => {
            
          try {
            const retreats = [];
                   // Reference the collection
                   if (selectedLocation === ""  && selectedPrice === 0.0 && selectedType === "" ) {
                     const q = query(collection(db, "events"));
                   const querySnapshot = await getDocs(q);
                   querySnapshot.forEach((doc) => {
                     retreats.push({ ...doc.data() });
                   });
                   setListOfEvents(retreats);
                   return;
           
                   
                   }

      
          else if ( selectedPrice === 0.0 && selectedType === "" && selectedLocation !== "") {
            setListOfEvents([])
            const events1 = [];
    
            if(selectedLocation=="United States of America"){
              const q2 =  query(collection(db, "events"), where("country", "==", selectedLocation));
            getDocs(q2).then((querySnapshot) => {
           
    
            querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data().name);
              events1.push({ ...doc.data() });
              
              setListOfEvents(events1);
            })
          
          });
        }
        else{
          const q2 =  query(collection(db, "events"), where("country", "==", selectedLocation));
            getDocs(q2).then((querySnapshot) => {
              
            querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data().name);
              events1.push({ ...doc.data() });
              
              setListOfEvents(events1);
            })
          });
        }
       
       
      }
    
     
            else if (selectedLocation === ""  && selectedType === "" && selectedPrice !== 0.0) {  
              setListOfEvents([])
              const retreats3=[]
              
              const q3 = query(collection(db, "events"), where("price", "<=", selectedPrice));
            getDocs(q3).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data().name);
              retreats3.push({ ...doc.data() }); 
            });
            setListOfEvents(retreats3);
          });
        }
        

         else if (selectedLocation !== "" && selectedPrice !== 0.0 && selectedType !== "" ) {  
          setListOfEvents([])
          const events2=[]
              const q3 = await query(collection(db, "events"), where("type1", "==", selectedType), where("country","==",selectedLocation), where("price","<=",selectedPrice));
            getDocs(q3).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data().name);
              events2.push({ ...doc.data() }); 
            });
            setListOfEvents(events2);

          });
        }
          
         
      }catch (error) {
        console.error("Error fetching data: ", error);
      }
       
          }
          
        
    
        fetchData();
  }, [selectedLocation, selectedType, selectedPrice]);

  const searchPrice =(event)=>{
      const valueDoubleFloat = parseFloat(event.target.value);

    setSelectedPrice(valueDoubleFloat)
  }
  const [pageNumber, setPageNumber] = useState(0)

  const usersPerPage = 10
  const pagesVisited = pageNumber * usersPerPage
  const displayEvents = listOfEvents.slice(pagesVisited, pagesVisited + usersPerPage)
  .map(retreat => {
    return(
           
          <div key={retreat.id} >
          
            <h2>{retreat.name}</h2>
            <Link to={`/retreatcenterdetails/${retreat.id}`} >
             <Card className="rounded-xl overflow-hidden border-none shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer ">
      <div className="aspect-[5/3] overflow-hidden">
        <img
          src={pic}
          alt={retreat.name}
          className="w-full h-full object-cover transition-transform duration-500"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-serif font-medium text-lg line-clamp-1">{retreat.eventName}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star size={16} fill="currentColor" className="text-retreat-forest" />
            <span>{retreat.country}</span>
          </div>
        </div>
       
        <div className="flex justify-between items-center mt-1">
      <p className="text-muted-foreground text-sm mb-2">{retreat.country}
        </p>
        </div>
        <div className="mt-3 font-medium">
          <span className="text-lg">{retreat.price}</span>
          <span className="text-sm text-muted-foreground"> / night</span>
          <br/>
              <Button className='bg-lime-700 ml-50px  text-white font-bold py-2  px-2 mt-2rounded focus:outline-none focus:shadow-outline align-items-right text-center' onClick={details}>Find More</Button>

        </div>
      </CardContent>
    </Card>
    </Link>
    </div>
      
)})

 
  const search=(event) => {
    setSearchType(event.target.value)
    setSelectedType(event.target.value)

    
  }
    const searchPlace=(event) => {
    setSelectedLocation(event.target.value)
    setSearchLocation(event.target.value)
 
                 

  }
 
    const searchTypesOfRetreats=()=>{

      const q =query(collection(db, "centers"),or (where("type1", "==",searchType), where("location","==",searchLocation), where("price", "<=",selectedPrice)));
      const querySnapshot = getDocs(q);
      const retreats = [];
      querySnapshot.then((snapshot)=>{
        snapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().name);
          retreats.push({ ...doc.data() });
          
        console.log(retreats);  
          setListOfEvents(retreats);
        });

             setListOfEvents(retreats);

  });
      
   
    }
  const pageCount = Math.ceil(listOfEvents.length/usersPerPage)
const changePage= ({selected}) => {
  setPageNumber(selected)

}
  return (
    <div>
        <div>
        <div className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
   
    <div className="justify-center items-center grid h-screen absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pic})` }}>
      
      <div className="w-full max-w-xs items-center justify-center">
        
      
  

 
</div>


</div>
    </div>
      <div className=" py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
            Search for the perfect Retreat Center!
          </h2>
         
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
             <select className="bg-white p-2 rounded-md" onChange={(e)=>setSelectedType(e.target.value)} value={selectedType}>
    <option value="">Select Type</option>
    <option value="meditation">Meditation</option>
    <option value="muay thai">Muay Thai</option>
    <option value="vegan">Vegan</option>
   
    </select>
           
    <select className="bg-white p-2 rounded-md" onChange={(e)=>setSelectedLocation(e.target.value)} value={selectedLocation}>
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
    <select className="bg-white p-2 rounded-md" onChange={searchPrice} value={selectedPrice}>
    <option value="0">Free</option>
    <option value="100">Less than $100 /night</option>
    <option value="200">Less than $200 /night</option>
    <option value="300">Less than $300 /night</option>
    <option value="500">Less than $500 /night</option>
    <option value="Unlimited">Unlimited</option>
   
    </select>
           
            <Button className="bg-retreat-sage hover:bg-retreat-forest whitespace-nowrap" onClick={searchTypesOfRetreats}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
         
   <Separator />
   
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8" >
       {displayEvents}
       
    </div>                                             <div className="flex justify-center items-center gap-4 mb-8">
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
         
    </div>
  
  );

}
