import React from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, ref, listAll, uploadBytes, deleteObject} from "firebase/storage";
import { doc, getDoc, collection, query, where, getDocs, addDoc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db, auth, storage } from "../firebase";
function Job() {
  
  return (
                         <div className="max-w-full pt-40 mx-auto p-4 grid place-items-center" style={{ backgroundColor:'lightGray', color:'black'}}>
                            <h1 className='text-2xl'>Find a job in the Retreat Industry</h1>
                            </div>

  )
}

export default Job