
import { Card, CardContent,  } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { List, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy, limit, startAfter,  where, and, or, endBefore, limitToLast} from 'firebase/firestore';
import {db} from '../../firebase.js';
import dayjs, { Dayjs } from 'dayjs';

import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router-dom'
import './RetreatCard.css'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { list } from "firebase/storage";
import { setMonth } from "date-fns";
import { get } from "react-hook-form";
export function RetreatCard() {
    const [listOfRetreats, setListOfRetreats] = useState([]);
      const [selectedType, setSelectedType] = useState("")
      const [america, setAmerica] = useState(false)
      const [searchType, setSearchType] = useState("");
      const [selectedMonth, setSelectedMonth] = useState(dayjs().format('MMMM'));
  const [selectedLocation, setSelectedLocation] = useState("");
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const [selectedPrice, setSelectedPrice] = useState(0.0)
  const[isApproved, setIsApproved] = useState(false)
  
  const valueSelected=(e)=>{
  const m=e.format('MMMM')
  setSelectedMonth(m)
 
    

}
  
  useEffect(() => {
    window.scrollTo(0,0)
      const fetchData = async () => {
        
      try {
        const retreats = [];
        // Reference the collection
        if (selectedLocation === ""  && selectedPrice === 0.0 && selectedType === "" ) {
          const q = query(collection(db, "retreats"), where("isDisplayed", "==", true));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          retreats.push({ ...doc.data() });
        });
        setListOfRetreats(retreats);
        return;

        
        }
        else if ( selectedPrice === 0.0 && selectedType === "" && selectedLocation !== "") {
        setListOfRetreats([])
        const retreats1 = [];

        if(selectedLocation=="United States of America"){
          const q2 =  query(collection(db, "retreats"), where("location", "==", selectedLocation), where("isDisplayed", "==", true));
          setAmerica(true)
        getDocs(q2).then((querySnapshot) => {
       

        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().name);
          retreats1.push({ ...doc.data() });
          
          setListOfRetreats(retreats1);
        })
      
      });
    }
    else{
              const q12 = await query(collection(db, "retreats"), where("location", "==", selectedLocation), where("isDisplayed", "==", true));

      getDocs(q12).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().name);
          retreats1.push({ ...doc.data() });
    }
    );
    setListOfRetreats(retreats1);
  });

  }
}
 
        else if (selectedLocation === ""  && selectedType === "" && selectedPrice !== 0.0) {  
          setListOfRetreats([])
          const retreats3=[]
          
          const q3 = query(collection(db, "retreats"), where("price", "<=", selectedPrice));
        getDocs(q3).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().name);
          retreats3.push({ ...doc.data() }); 
        });
        setListOfRetreats(retreats3);
      });
    }
     else if (selectedLocation === "" && selectedPrice === 0.0 && selectedType !== "" ) {  
      setListOfRetreats([])
      const retreats2=[]
          const q3 = await query(collection(db, "retreats"), where("type1", "==", selectedType), where("isDisplayed", "==", true));
        getDocs(q3).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().name);
          retreats2.push({ ...doc.data() }); 
        });
        setListOfRetreats(retreats2);
      });
    }
    else if (selectedLocation !== "" && selectedPrice === 0.0 && selectedType !== "" ) {  
      setListOfRetreats([])
      const retreats2=[]
          const q3 = await query(collection(db, "retreats"), where("type1", "==", selectedType), where("isDisplayed", "==", true), where("location","==",selectedLocation));
        getDocs(q3).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().name);
          retreats2.push({ ...doc.data() }); 
        });
        setListOfRetreats(retreats2);
      });
    }
     else if (selectedLocation !== "" && selectedPrice !== 0.0 && selectedType !== "" ) {  
      setListOfRetreats([])
      const retreats2=[]
          const q3 = await query(collection(db, "retreats"), where("type1", "==", selectedType), where("location","==",selectedLocation), where("price","<=",selectedPrice));
        getDocs(q3).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().name);
          retreats2.push({ ...doc.data() }); 
        });
        setListOfRetreats(retreats2);
      });
    }
      
     

   
      }
      catch (err) {
        console.error("Error fetching data: ", err);
      } 
    };

    fetchData();
    
  
  }, [selectedLocation, selectedPrice, selectedType]);
 

  const searchPrice =(v)=>{
    if(v==""){
      return
    }
      const valueDoubleFloat = parseFloat(v.target.value);

    setSelectedPrice(valueDoubleFloat)
  }
  const [pageNumber, setPageNumber] = useState(0)

  const usersPerPage = 50
  const pagesVisited = pageNumber * usersPerPage
  const displayRetreats = listOfRetreats.slice(pagesVisited, pagesVisited + usersPerPage)
  .map(retreat => {
    return(
           
          <div key={retreat.id} >
          
            <h2 className="text-xl font-bold mb-2">{retreat.name}</h2>

            <Link to={`/retreatdetails/${retreat.id}`} >
             <Card className="rounded-xl h-130 overflow-hidden border-none shadow-lg hover:shadow-md transition-all retreat-card cursor-pointer ">
      <div className="aspect-[5/3] overflow-hidden">
        <img
          src={retreat.pic1}
          alt={retreat.name}
          className="w-full h-full object-cover transition-transform duration-500"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-serif font-medium text-lg line-clamp-1">{retreat.startAt?.toDate()?.toLocaleDateString('en-US')}</h3> -
          <h3 className="font-serif font-medium text-lg line-clamp-1">{retreat.endAt?.toDate()?.toLocaleDateString('en-US')}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star size={16} fill="currentColor" className="text-retreat-forest" />
            <span>{retreat.retreatCenterName}</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-2">{retreat.type1}</p>
                                      <span className="text-md">{retreat.address}, {retreat.location}</span>


       
        <div className="mt-3 font-medium">

          <span className="text-lg">${retreat.price}</span>

          <span className="text-sm text-muted-foreground"> / person</span>
          
              <Link to={`/retreatdetails/${retreat.id}`} ><br/><br/>
              <Button  size="sm" className="text-sm bg-lime-700 hover:bg-white hover:text-lime-700 text-white">Find Out More</Button></Link>
                             <Button  size="sm" className="text-sm bg-lime-700 hover:bg-white hover:text-lime-700 text-white ml-5" onClick={() => window.open('https://www.tripadvisor.com', '_blank')}>Trip Advisor</Button>

        </div>
      </CardContent>
    </Card>
    </Link>
    </div>
      
)})



 

  const pageCount = Math.ceil(listOfRetreats.length/usersPerPage)
const changePage= ({selected}) => {
  setPageNumber(selected)

}



  return (
    <div>
      <div className=" py-16">
        
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4 text-center">
            Search for the perfect retreat!
          </h2>
             
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
           
            <div>
             <select className="bg-white p-2 rounded-md" onChange={(e)=>setSelectedType(e.target.value)} value={selectedType}>
    <option value="">Select Type</option>
    <option value="Adventure">Adventure</option>
    <option value="Art">Art</option>
    <option value="Ayurveda">Ayurveda</option>
        <option value="Detox">Detox</option>
        <option value="Horse">Horse Retreat</option>
     <option value="Men">Men's Retreat</option>
    <option value="Meditation">Meditation</option>
    <option value="Martial Arts">Martial Arts</option>
    <option value="Spiritual">Spiritual</option>
        <option value="Surfing">Surfing</option>
    <option value="Vegan">Vegan</option>
    <option value="yoga">Yoga</option>
    <option value="Womens">Women's Retreat</option>
    <option value="Writing">Writing</option>
    </select>
           </div>
           <div>
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
    </div>
    <div>
    <select className="bg-white p-2 rounded-md" onChange={searchPrice} value={selectedPrice}>
    <option value="0">Select Price</option>
    <option value="1000">Less than $1000</option>
    <option value="2000">Less than $2000</option>
    <option value="5000">Less than $5000</option>
    <option value="10000">Less than $10000</option>
    <option value="Unlimited">Unlimited</option>
   
    </select>
    </div>
     
          <div>
   {/** 
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={value} onChange={(e)=>valueSelected(e)}/>
    </LocalizationProvider>
  **/}
    </div>
          
          </div>
        </div>
      </div>
    </div>
         
   <Separator />
   
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8" >
       {displayRetreats}
       
    </div>                                           
                                    <div className="flex justify-center items-center gap-4 mb-8 text-black">
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
