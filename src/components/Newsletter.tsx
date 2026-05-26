
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { doc, getDoc, collection, query, where, getDocs, addDoc, updateDoc,serverTimestamp } from "firebase/firestore";
import { db, auth,storage} from "../firebase.js";

import Modal from "./Modal.js";

import { useState } from "react";
export function Newsletter() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [emailSubs, setEmailSubs] = useState("");
  const subscribed = () => {
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
          <Modal isOpen={isSubscribed} onClose={() => setIsSubscribed(false)}>
            <div className="p-4 mt-20 text-center">
              <h2 className="text-2xl font-serif font-semibold mb-4">
                Thank you for subscribing!
              </h2>
              <p className="text-muted-foreground mb-8">
                You will now receive the latest retreat news and exclusive offers in your inbox.
              </p>
              <Button className="bg-retreat-sage hover:bg-retreat-forest" onClick={() => setIsSubscribed(false)}>
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
              placeholder="Your email address"
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
