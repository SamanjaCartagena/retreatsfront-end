
import { Card, CardContent } from "@/components/ui/card";
import { List, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy, limit, startAfter } from 'firebase/firestore';
import {db} from '../firebase.js';


export function RetreatCard() {
    const [listOfRetreats, setListOfRetreats] = useState([]);
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
    const fetchMore=()=>{
    const lastColorId=listOfRetreats[listOfRetreats.length-1].id;
    console.log("Last Color ID:", lastColorId);
    const q1 =query(collection(db, "retreats"))
    const q= query(q1, orderBy("id","asc"),startAfter(lastColorId), limit(3));
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
  return (
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
        <p className="text-muted-foreground text-sm mb-2">
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
                       <button onClick={fetchMore}>Load More...</button>

    </div>
            
         
    
  
  );

}
