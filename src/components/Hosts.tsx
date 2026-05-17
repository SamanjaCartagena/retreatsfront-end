import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, listAll, uploadBytes, deleteObject} from "firebase/storage";
import { Card, CardContent } from "@/components/ui/card";
import { List, Star } from "lucide-react";
import { collection, query, getDocs, orderBy, limit, startAfter,  where, and, or, endBefore, limitToLast} from 'firebase/firestore';
import {db} from '../firebase.js';
import ReactPaginate from 'react-paginate';
import ModalHosts from './ModalHost.js';
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
           console.log(doc.id, " => ", doc.data().hostFirstName);
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
                 
                <div key={guide.hostId} >
                
                  <h2>{guide.hostFirstName}</h2>
                   <Card className="rounded-xl overflow-hidden border-none shadow-sm hover:shadow-md transition-all retreat-card cursor-pointer ">
            <div className="aspect-[5/3] overflow-hidden">
              <img
                src={guide.hostProfilePicUrl}
                alt={guide.hostId}
                className="w-full h-full object-cover transition-transform duration-500"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1 text-sm">
                  <Star size={16} fill="currentColor" className="text-retreat-forest" />
                  <h1>{guide.hostFirstName}</h1>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-2">
              </p>
              <div className="flex justify-between items-center mt-1">
            
              </div>
              <div className="mt-3 font-medium">
                <span className="text-lg"></span>
                          <span className="text-lg"></span>
      
                <span className="text-sm text-muted-foreground"> / person</span>
                    <Link to={`/hostdetails/${guide.hostId}`} ><button  className='bg-lime-700 ml-50px  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline align-items-right text-center'>Find Out More</button></Link>
      
              </div>
            </CardContent>
          </Card>
          </div>
            
      )})
  return (
    <div>
      <div className=" py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
            Plan a Retreat!
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
           
  <select className="bg-white p-2 rounded-md" onChange={searchPlace}>
    <option value="">Select Location</option>
    <option value="Everywhere">Everywhere</option>
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
