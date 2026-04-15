
import { Card, CardContent,  } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { List, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy, limit, startAfter,  where, and, or, endBefore, limitToLast} from 'firebase/firestore';
import {db} from '../firebase.js';
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
      const [searchType, setSearchType] = useState("");
      const [selectedMonth, setSelectedMonth] = useState(dayjs().format('MMMM'));
  const [selectedLocation, setSelectedLocation] = useState("");
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const [selectedPrice, setSelectedPrice] = useState("")
  
  const valueSelected=(e)=>{
  const m=e.format('MMMM')
  setSelectedMonth(m)
 
    

}
  
  useEffect(() => {
      const fetchData = async () => {
      try {
        const retreats = [];
        // Reference the collection
        if (selectedLocation === ""  && selectedPrice === "" && selectedType === "") {
          const q = query(collection(db, "retreats"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().name);
          retreats.push({ ...doc.data() });
        });
        setListOfRetreats(retreats);
        return;

        
        }
        else if ( selectedPrice === "" && selectedType === "" && selectedLocation !== "") {
      
        const q2 = await query(collection(db, "retreats"), (where("location", "==", selectedLocation)));
        getDocs(q2).then((querySnapshot) => {
       

        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().name);
          retreats.push({ ...doc.data() });
          
        console.log(retreats);  
                 setListOfRetreats(retreats);
        })
      });
    }
        else if (selectedLocation === ""  && selectedType === "" && selectedPrice !== "") {  
          const q3 = await query(collection(db, "retreats"), where("price", "<=", selectedPrice));
        getDocs(q3).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().name);
          retreats.push({ ...doc.data() }); 
        });
        setListOfRetreats(retreats);
      });
    }
     else if (selectedLocation === "" && selectedPrice === "" && selectedType !== "" ) {  
          const q3 = await query(collection(db, "retreats"), where("type", "==", selectedType));
        getDocs(q3).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().name);
          retreats.push({ ...doc.data() }); 
        });
        setListOfRetreats(retreats);
      });
    }
       else if (selectedType === "" && selectedLocation !== "" && selectedPrice !== "" ) {  
          const q3 = await query(collection(db, "retreats"),and (where("price", "<=", selectedPrice ), and (where("location", "==", selectedLocation))));
        getDocs(q3).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().name);
          retreats.push({ ...doc.data() }); 
        });
        setListOfRetreats(retreats);
      });
    }
     else if (selectedLocation === "" && selectedPrice !== "" && selectedType !== "" ) {  
          const q3 = await query(collection(db, "retreats"),and (where("price", "<=", selectedPrice ), where("type", "==", selectedType)));
        getDocs(q3).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().name);
          retreats.push({ ...doc.data() }); 
        });
        setListOfRetreats(retreats);
      });
    }
     else if (selectedLocation !== "" && selectedPrice !== "" && selectedType !== "" ) {  
          const q3 = await query(collection(db, "retreats"),and (where("price", "<=", selectedPrice ), where("location", "==", selectedLocation), where("type", "==", selectedType)));
        getDocs(q3).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().name);
          retreats.push({ ...doc.data() }); 
        });
        setListOfRetreats(retreats);
      });
    }
   
      }
      catch (err) {
        console.error("Error fetching data: ", err);
      } 
    };

    fetchData();
    
    
 

 


  
  
  /** 
  const retrMonth = [];
     const q15 =query(collection(db, "retreats"), (where("month", "==",selectedMonth)));

           getDocs(q15).then((snapshot) => {

        snapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().name);
          retrMonth.push({ ...doc.data() });
          
        console.log(retrMonth);  
                 setListOfRetreats(retrMonth);
        });


  });
  **/
  
  }, [selectedLocation, selectedPrice, selectedType]);

  const searchPrice =(v)=>{
    if(v === ""){
      setSelectedPrice("")
      return;
    }
      const valueDoubleFloat = parseFloat(v);

    setSelectedPrice(valueDoubleFloat)
  }
  const [pageNumber, setPageNumber] = useState(0)

  const usersPerPage = 8
  const pagesVisited = pageNumber * usersPerPage
  const displayRetreats = listOfRetreats.slice(pagesVisited, pagesVisited + usersPerPage)
  .map(retreat => {
    return(
           
          <div key={retreat.id} >
          
            <h2>{retreat.name}</h2>
             <Card className="rounded-xl overflow-hidden border-none shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer ">
      <div className="aspect-[5/3] overflow-hidden">
        <img
          src={retreat.imageurl}
          alt={retreat.name}
          className="w-full h-full object-cover transition-transform duration-500"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-serif font-medium text-lg line-clamp-1">{retreat.name}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star size={16} fill="currentColor" className="text-retreat-forest" />
            <span>{retreat.name}</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-2">{retreat.type1},{retreat.type2},{retreat.type3}
        </p>
        <div className="flex justify-between items-center mt-1">
      
        </div>
        <div className="mt-3 font-medium">
          <span className="text-lg">${retreat.price}</span>
                    <span className="text-lg">${retreat.month}</span>

          <span className="text-sm text-muted-foreground"> / person</span>
              <Link to={`/retreatdetails/${retreat.id}`} ><button  className='bg-lime-700 ml-50px  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline align-items-right text-center'>Find Out More</button></Link>

        </div>
      </CardContent>
    </Card>
    </div>
      
)})

  const search=(event) => {
    setSearchType(event.target.value)
    setSelectedType(event.target.value)
    

    
  }
      const searchPlace=(event) => {
    setSelectedLocation(event.target.value)

   
        
                     setSelectedLocation(event.target.value)


  }

 
    const submitRetreats=()=>{
    try{
      const q =query(collection(db, "retreats"), and(where("type1", "==",selectedType), where("location","==",selectedLocation), where("price", "<=",selectedPrice)));
      const querySnapshot = getDocs(q);
      const retreats = [];
      querySnapshot.then((snapshot)=>{
        snapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().name);
          retreats.push({ ...doc.data() });
          
        console.log(retreats);  
          setListOfRetreats(retreats);
        });

             setListOfRetreats(retreats);

  });
}
catch(error){
  console.error("Error fetching retreats: ", error);
  alert("No such retreat found. Please adjust your search criteria and try again.")
}
   
    }
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
    <option value="meditation">Meditation</option>
    <option value="muay thai">Muay Thai</option>
    <option value="vegan">Vegan</option>
    <option value="yoga">Yoga</option>
    <option value="India">India</option>
    <option value="Greece">Greece</option>
    <option value="Peru">Peru</option>
    <option value="Australia">Australia</option>
    </select>
           </div>
           <div>
  <select className="bg-white p-2 rounded-md" onChange={(e)=>setSelectedLocation(e.target.value)} value={selectedLocation}>
        <option value="">Select Location</option>
    <option value="Bali">Bali</option>
    <option value="Thailand">Thailand</option>
    <option value="Costa Rica">Costa Rica</option>
    <option value="Mallaga">Mallaga</option>
    <option value="India">India</option>
    <option value="Greece">Greece</option>
    <option value="Peru">Peru</option>
    <option value="Australia">Australia</option>
    </select>
    </div>
    <div>
    <select className="bg-white p-2 rounded-md" onChange={(e)=>searchPrice(e.target.value)} value={selectedPrice}>
        <option value="">Select Price Range</option>
    <option value="0">Free</option>
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
            <Button className="bg-retreat-sage hover:bg-retreat-forest whitespace-nowrap" onClick={submitRetreats}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
         
   <Separator />
   
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8" >
       {displayRetreats}
       
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
         
    
  
  );

}
