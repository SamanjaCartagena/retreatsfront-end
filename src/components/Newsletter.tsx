
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { doc, getDoc, collection, query, where, getDocs, addDoc, updateDoc,serverTimestamp } from "firebase/firestore";
import { db, auth,storage} from "../firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


import Modal from "./Modal.js";

import { useState, useEffect } from "react";
export function Newsletter() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [emailSubs, setEmailSubs] = useState("");
  const [userId, setUserId] = useState("");
  const [placeHolderEmail, setPlaceHolderEmail] = useState("");
  const [isSignedInModal, setIsSignedInModal] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setPlaceHolderEmail(user.email);
        setUserId(uid);
        setIsSignedIn(true);
         async () => {
      const q = query(collection(db, "subscribers"), where("email", "==", emailSubs));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setAlreadySubscribed(true);
      } else {
        setAlreadySubscribed(false);
      }
    };
      } else {
        setUserId("");
        setIsSignedIn(false);
      }

    });
  
   
  }, [emailSubs]);

  const subscribed = () => {
    if(!isSignedIn){
      setIsSignedInModal(true);
      return;
    }
    addDoc(collection(db, "subscribers"), {
      email: emailSubs
    }).then(() => {
      setIsSubscribed(true);
      setEmailSubs("");
    });
  };

  return (
    <div className="bg-yellow-100 py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <Modal isOpen={isSignedInModal} onClose={() => setIsSignedInModal(false)}>
            <div className="p-4 mt-20 text-center">
              <h2 className="text-2xl font-serif font-semibold mb-4">
                Please sign in to subscribe to our newsletter!
              </h2>
              </div>
            </Modal>
          <Modal isOpen={alreadySubscribed} onClose={() => setAlreadySubscribed(false)}>
            <div className="p-4 mt-20 text-center">
              <h2 className="text-2xl font-serif font-semibold mb-4">
                You are already subscribed!
              </h2>
              <p className="text-muted-foreground mb-8">
                You will now receive the latest retreat news and exclusive offers in your inbox.
              </p>
              <Button className="bg-retreat-sage hover:bg-retreat-forest" onClick={() => setAlreadySubscribed(false)}>
                Close
              </Button>
            </div>
          </Modal>
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
            Get inspired for your next retreat
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join our newsletter and be the first to discover new retreat experiences, exclusive offers and wellness inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              value={placeHolderEmail || emailSubs}
              className="bg-white"
              onChange={(e) => setEmailSubs(e.target.value)}
            />
            <Button className="bg-retreat-sage hover:bg-retreat-forest whitespace-nowrap" onClick={subscribed}>
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


