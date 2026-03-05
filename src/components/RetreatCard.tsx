
import { Card, CardContent } from "@/components/ui/card";
import { List, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy, limit, startAfter,  where, and, or, endBefore, limitToLast} from 'firebase/firestore';
import {db} from '../firebase.js';
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";

export function RetreatCard() {
    const [listOfRetreats, setListOfRetreats] = useState([]);
      const [searchType, setSearchType] = useState("");
      const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    const q1 =query(collection(db, "retreats"));
    const q= query(q1, orderBy("id","asc"), limit(5));
    getDocs(q).then((querySnapshot) => {
      const treats = [];
      querySnapshot.forEach((doc) => {
        treats.push({ ...doc.data() });
      });
      console.log(treats.length);
      setListOfRetreats(treats);
      console.log(listOfRetreats);
    }); 

  }, []);
  const fetchPrevious=()=>{
  const firstRetreatId=listOfRetreats[0].id;
  console.log(firstRetreatId-3)
     
    const q1 =query(collection(db, "retreats"))
    const q= query(q1, orderBy("id","asc"),startAfter(firstRetreatId-6), limit(5));
    getDocs(q).then((querySnapshot) => {
      const colors = [];
      
      querySnapshot.forEach((doc) => {
        console.log("Doc ID:", doc.data().id);
        if(doc.data().id>firstRetreatId-6){
          colors.push({ ...doc.data() });
        }
        
      });
      console.log(colors);
      setListOfRetreats(colors);
      
    }); 
  }
    const fetchNext=()=>{
    const lastColorId=listOfRetreats[listOfRetreats.length-1].id;
    console.log("Last Color ID:", lastColorId);
    const q1 =query(collection(db, "retreats"))
    const q= query(q1, orderBy("id","asc"),startAfter(lastColorId), limit(5));
    getDocs(q).then((querySnapshot) => {
      const colors = [];
      
      querySnapshot.forEach((doc) => {
        console.log("Doc ID:", doc.data().id);
        if(doc.data().id>lastColorId){
          colors.push({ ...doc.data() });
        }
        
      });
      console.log(colors);
      setListOfRetreats(colors);
      
    }); 
  }
  const fetchMain=()=>{
    window.location.reload();
  }
  const search=(e) => {
    console.log(e.target.value)
    if(e.target.value==""){
      window.location.reload()
    }
    setSearchType(e.target.value)
    
  }
    const searchPlace=(e) => {
    console.log(e.target.value)
    if(e.target.value==""){
      window.location.reload()
    }
    setSearchLocation(e.target.value)
    
  }
 
    const searchTypesOfRetreats=()=>{
      
      const q =query(collection(db, "retreats"),or (where("type1", "==",searchType), where("location","==",searchLocation), where("type2","==", searchType), where("type3","==",searchType)));
      const querySnapshot = getDocs(q);
      const retreats = [];
      querySnapshot.then((snapshot)=>{
        snapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().name);
          retreats.push({ ...doc.data() });
          
        console.log(retreats);  
          setListOfRetreats(retreats);
        });

   
  });
      
   
    }
  return (
    <div>
      <div className=" py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
            Search for the perfect retreat!
          </h2>
         
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
             <select className="bg-white p-2 rounded-md" onChange={search}>
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
           
  <select className="bg-white p-2 rounded-md" onChange={searchPlace}>
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
    
           
            <Button className="bg-retreat-sage hover:bg-retreat-forest whitespace-nowrap" onClick={searchTypesOfRetreats}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
         
   <Separator />
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
           {listOfRetreats.map((retreat)=>{
             return <div key={retreat.id} >
          
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
          <span className="text-lg">${retreat.name}</span>
          <span className="text-sm text-muted-foreground"> / person</span>
        </div>
      </CardContent>
    </Card>
    
             </div>
           })}

    </div>                                             <div className="flex justify-center items-center gap-4 mb-8">
                                                     <button onClick={fetchPrevious} style={{width:'200px;',height:'60px;', padding:'10px;'}} 
                                                     className="hover:bg-lime-700 hover:text-white p-3 hover:m-2 rounded-md">Previous</button>
                                   <button onClick={fetchMain} style={{width:'200px;',height:'60px;', padding:'10px;'}}
                           
                           className="hover:bg-lime-700 hover:text-white p-3 hover:m-2 rounded-md">Main Page</button>
                           <button onClick={fetchNext} style={{width:'200px;',height:'60px;', padding:'10px;'}}
                           
                           className="hover:bg-lime-700 hover:text-white p-3 hover:m-2 rounded-md">Next</button>
            </div>
            
         </div>   
         
    
  
  );

}
