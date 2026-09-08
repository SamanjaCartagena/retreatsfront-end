import { Card, CardContent,  } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { List, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy, limit, startAfter,  where, and, or, endBefore, limitToLast, startAt} from 'firebase/firestore';
import {db} from '../../firebase.js';
import dayjs, { Dayjs } from 'dayjs';
import sea from '../../assets/sea.png'
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
function RightNow() {
    const [listOfRetreats, setListOfRetreats] = useState([]);
    const [selectedType, setSelectedType] = useState("")
    const [state, setState] = useState("")
    const [searchType, setSearchType] = useState("");
    const [happening, setHappening] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState(dayjs().format('MMMM'));
    const [selectedYear, setSelectedYear] = useState(dayjs().format('YYYY'))
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());
    
     useEffect(() => {
        
        console.log(selectedMonth)
        console.log(selectedYear)
              const fetchData = async () => {

        const retreats=[]
         const q =  query(collection(db, "retreats"), and(where("month", "==", selectedMonth), where("year", "==", selectedYear) ))
                const querySnapshot = await getDocs(q);
                if(!querySnapshot.empty){
                setHappening(true)
                querySnapshot.forEach((doc) => {

                  retreats.push({ ...doc.data() });
                });
                setListOfRetreats(retreats);
              }
              else{
                setHappening(false)
              }
              }
              fetchData()
      }, [value]);
    const displayRetreats = listOfRetreats.slice(0,4)
      .map(retreat => {
        return(
               
              <div key={retreat.id} className="retreat-card-container border rounded-xl border-gray-2">
              
                <h2 className="text-xl font-bold  p-5" >{retreat.name}</h2>
    
                <Link to={`/retreatdetails/${retreat.id}`} >
                 <Card className="rounded-xl h-130 overflow-hidden  shadow-lg hover:shadow-md transition-all text-black border border-gray-2 retreat-card cursor-pointer  shadow-md shadow-white/40 ">
          <div className="aspect-[5/3] overflow-hidden">
            <img
              src={retreat.pic1}
              alt={retreat.name}
              className="w-full h-full object-cover transition-transform duration-500"
            />
          </div>
          <CardContent className="p-4 text-black ">
            <div className="flex justify-between items-start text-black">
              <h3 className="font-serif font-medium text-lg line-clamp-1 text-black">{retreat.startAt?.toDate()?.toLocaleDateString('en-US')}</h3> -
              <h3 className="font-serif font-medium text-lg line-clamp-1 text-black">{retreat.endAt?.toDate()?.toLocaleDateString('en-US')}</h3>
              <div className="flex items-center gap-1 text-sm">
                <Star size={16} fill="currentColor" className="text-retreat-forest" />
                <span className="text-black">{retreat.retreatCenterName}</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-2">{Object.values(retreat.type1).join(", ")}</p>
                                          <span className="text-md">{retreat.address}, {retreat.location}</span>
    
    
           
            <div className="mt-3 font-medium">
    
              <span className="text-lg">{retreat.currency}&nbsp;{retreat.price}</span>
    
              <span className="text-sm text-muted-foreground"> / person</span>&nbsp;
                        <span className="text-sm text-muted-foreground"><strong>Flight included: {retreat.flightIncluded},</strong></span>&nbsp;
                                            <span className="text-sm text-muted-foreground"><strong>Airport pickup: {retreat.airportPickup}</strong></span>
    
    
    
    
    
            </div>
          </CardContent>
        </Card>
        </Link>
        </div>
          
    )})
     
  return (
    <div className='container'>
    {happening &&
    <div>
    <h2 className="text-2xl text-black justify-center align-center font-serif font-semibold">
       Happening Right Now!
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-white text-black text-underline " >
       {displayRetreats}
       
    </div>
    </div>
}
    </div>
  )
}

export default RightNow