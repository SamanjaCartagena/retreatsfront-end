import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, where, getDocs, query } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, listAll, uploadBytes, deleteObject} from "firebase/storage";
import { db, auth,storage} from "../firebase.js";

import React,{useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';

function GuideAdmin() {
    useEffect(()=>{

    },[])
  return (
    <div>GuideAdmin</div>
  )
}

export default GuideAdmin