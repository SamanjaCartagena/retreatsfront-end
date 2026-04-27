import React, {useEffect, useState} from 'react'
import { Button } from "@/components/ui/button";
import pic from '../assets/bozeman.jpg';
import { useNavigate } from "react-router-dom"; 
import ModalGuides from './ModalGuides';
import chef1 from '../assets/nic.jpg';
import chef2 from '../assets/vegan.jpg';
import chef3 from '../assets/ayurveda.jpg';
import yoga1 from '../assets/yoga.jpg';
import yoga2 from '../assets/yoga1.jpg';
import yoga3 from '../assets/yoga2.jpg';
import tourist1 from '../assets/guide1.jpg';
import tourist2 from '../assets/guide2.jpg';
import tourist3 from '../assets/guide3.jpg';
import tourist4 from '../assets/guide4.jpg';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebase.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,signInWithPopup, signOut  } from "firebase/auth";
function GuideSignUp() {
    const [modalOpen, setModalOpen]= useState(false);
    const [yogaModalOpen, setYogaModalOpen]= useState(false);
    const [toursistOpen, setToursistOpen]= useState(false);
    const [loadingAI, setLoadingAI]= useState(false);
    const [firstName, setFirstName]= useState('');
    const [lastName, setLastName]= useState('');
    const [profession, setProfession]= useState('');
    const [specialty, setSpecialty]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [confirmPassword, setConfirmPassword]= useState('');
    const [userName, setUserName]= useState('');
    const auth = getAuth();
    const guideProfile = async() => {
         try{

             if(password===confirmPassword){
                       await createUserWithEmailAndPassword(auth,email,confirmPassword)
                       .then((userCredential)=>{
                         const user = userCredential.user;
                         console.log('User created:', user.uid);
                                       addDoc(collection(db, "guides"), {
                                       id: user.uid,
                                       firstName: firstName,
                                       lastName: lastName,
                                       userName: userName,
                                       email: email,
                                       profession: profession,
                                       specialty: specialty,

                                       createdAt: new Date()
                                     });
                       })
                       .catch((error)=>{
                         console.error('Error creating user:', error);
                       });
                       
     
             }
            
             }catch(error){
                console.error('Error creating guide profile:', error);
              }
            }


  
    const navigate=useNavigate()
    const openModal =()=>{
      setModalOpen(true);
    }
    const closeModal =() => {
        setModalOpen(false);
    }
    const openYoga =()=>{
      setYogaModalOpen(true);
    }
    const openTourist =()=>{
        setToursistOpen(true);
    }
    
  return (
     <>
     <div className="relative h-[80vh] min-h-[700px] w-full overflow-hidden">
      
      
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${pic})` }}
      >
      <ModalGuides isOpen={modalOpen} onClose={closeModal} >
        <div className="p-6 justify-center items-center text-center  h-[700px]">
            <br/>
            <br/>
            <br/>
            <h2 className="text-2xl font-bold mb-4">How to be a great retreat chef?</h2>
            
            <p className="mb-4">Being a successful retreat chef goes far beyond simply cooking good food. In a retreat setting, food is often a core component of the guests' healing, relaxation, and overall experience. A retreat chef must act as a culinary artist, a logistician, and a nurturing presence all at once.</p>
           <img src={chef1} alt="Chef" style={{width:'full', height:'200px',borderRadius:'10px', position:'relative', top:'10px', left:'50%', transform:'translateX(-50%)'}}/>
      <br/>
      <p className="mb-4">
<strong>1. Aligned and Inclusive Menu Design</strong><br/>
A retreat menu must be deeply intentional and cater to a diverse array of needs without sacrificing quality or flavor.

Hyper-Personalization: You must seamlessly accommodate complex dietary restrictions (vegan, gluten-free, dairy-free, nut allergies, FODMAP) while making every guest feel equally cared for, rather than an afterthought.

Thematic Alignment: The food should mirror the purpose of the retreat. A high-intensity fitness retreat requires protein-dense, macro-balanced meals, while a restorative yoga or meditation retreat might call for lighter, Ayurvedic, or plant-based detox menus.

Nutritional Integrity: Guests expect to leave feeling better than when they arrived. Providing whole, unprocessed, and deeply nourishing ingredients is non-negotiable.
           <img src={chef2} alt="Retreats Around The World" style={{width:'full', height:'200px',borderRadius:'10px', position:'relative', top:'10px', left:'50%', transform:'translateX(-50%)'}}/>
        <br/>
<strong>2. Seamless Logistics and Adaptability</strong><br/>
Retreats are dynamic, and the kitchen is the engine that keeps the schedule running on time.

Impeccable Timing: Meals must be ready exactly when scheduled, coordinating perfectly with classes, workshops, and excursions.

Resource Management: You are responsible for complex provisioning, often in remote locations where popping out to the grocery store isn't an option. This requires accurate budgeting, precise ordering, and mindful waste management.

Flexibility: Schedules change, activities run late, or the weather shifts. A successful retreat chef pivots easily, keeping food warm or adjusting prep times without letting stress bleed into the guest experience.
           <img src={chef3} alt="Retreats Around The World" style={{width:'full', height:'200px',borderRadius:'10px', position:'relative', top:'10px', left:'50%', transform:'translateX(-50%)'}}/>
        <br/>

<strong>3. The Energetic and Experiential Element</strong><br/>
The kitchen's energy directly impacts the vibe of the entire retreat.

Nurturing Presence: A great retreat chef provides "food as medicine" and brings a calm, grounding energy. Guests often wander into the kitchen or dining area seeking comfort or conversation; a welcoming demeanor is essential.

Visual Appeal: We eat with our eyes first. High-level plating and beautiful buffet presentations elevate the perceived value of the retreat and make guests feel pampered.

Spotless Environment: Maintaining a clean, safe, and highly organized kitchen is critical, not just for food safety, but to maintain the sanctuary-like feel of the retreat venue.

The Takeaway: The ultimate deliverable of a retreat chef is trust. When guests and retreat leaders trust that the food will be safe, nourishing, on time, and delicious, it allows everyone to fully surrender to the retreat experience.
</p>
           
         
                
            <Button onClick={closeModal} className="bg-retreat-forest text-white hover:bg-retreat-cream hover:text-retreat-forest mb-4 mr-4">
                Sign Up as a Guide
            </Button>
            </div>
        </ModalGuides>
         <ModalGuides isOpen={yogaModalOpen} onClose={() => setYogaModalOpen(false)} >
        <div className="p-6 justify-center items-center text-center  h-[700px]">
            <br/>
            <br/>
            <br/>
            <h2 className="text-2xl font-bold mb-4">How to be a great retreat yoga teacher?</h2>
            A yoga teacher is often the heartbeat of a retreat, providing much more than just physical movement classes. Their contributions span across physical instruction, emotional support, and overall event facilitation.
           <img src={yoga1} alt="Retreats Around The World" style={{width:'full', height:'200px', borderRadius:'10px', position:'relative', top:'10px', left:'50%', transform:'translateX(-50%)'}}/>

           <br/>
             <p className="mb-4">
          <strong>Core Instruction & Practice</strong><br/>
             Leading Physical Asana: Designing and guiding daily yoga practices tailored to the retreat's theme. This often includes an energizing morning practice (like Vinyasa or Ashtanga) and a grounding evening practice (like Yin or Restorative).

Facilitating Meditation and Breathwork: Guiding participants through mindfulness practices, pranayama (breathwork), and guided meditations to deepen their mental relaxation and focus.

Skill Workshops: Offering specialized, deeper-dive sessions focusing on specific aspects of yoga, such as philosophy, arm balances, inversion clinics, or anatomical alignment.
</p>
           <img src={yoga2} alt="Retreats Around The World" style={{width:'full', height:'200px', borderRadius:'10px', position:'relative', top:'10px', left:'50%', transform:'translateX(-50%)'}}/>
      <br/>
      <p className="mb-4">
<strong>Emotional & Energetic Support</strong><br/>
Holding Space: Creating a safe, non-judgmental environment. Retreats can often bring up unexpected emotions for attendees, and an experienced teacher knows how to manage the group's energy and support emotional releases.

One-on-One Guidance: Being available for individual check-ins, answering questions, or providing private modifications to help attendees with specific injuries, personal goals, or physical roadblocks.

Community Building: Fostering a sense of connection among attendees. Teachers often lead sharing circles, facilitate introductions, and naturally bridge the gap between strangers to build a cohesive group dynamic.

Logistics & Retreat Enhancement
Thematic Weaving: Integrating the retreat’s core intention (e.g., a digital detox, a manifestation workshop, or a stress-relief weekend) into the daily schedules, discussions, and physical practices.
</p>
           <img src={yoga3} alt="Retreats Around The World" style={{width:'full', height:'200px', borderRadius:'10px', position:'relative', top:'10px', left:'50%', transform:'translateX(-50%)'}}/>
           <br/>
<p className="mb-4">
<strong>Excursion Facilitation</strong>: Assisting with or leading off-site activities like mindful nature walks, hiking, beach clean-ups, or cultural tours.
<br/>
<strong>Operational Support</strong>: Acting as a co-host to the main organizer. This can include helping with daily logistics, timekeeping, managing the physical practice space (setting up and cleaning mats, blocks, and bolsters), and coordinating seamlessly with venue staff.
         </p>
         <Button onClick={()=>setYogaModalOpen(false)} className="bg-retreat-forest text-white hover:bg-retreat-cream hover:text-retreat-forest mb-4 mr-4">
                Sign Up as a Guide
            </Button>
            </div>
        </ModalGuides>
        <ModalGuides isOpen={toursistOpen} onClose={() => setToursistOpen(false)} >
        <div className="p-6 justify-center items-center text-center  h-[700px]">

            <br/>
            <br/>
            <br/>
            A tourist guide manages the external experience, ensuring that the retreat’s setting becomes a source of inspiration rather than a source of stress.
            <br/>
             <img src={tourist1} alt="Retreats Around The World" style={{width:'full', height:'200px', borderRadius:'10px', position:'relative', top:'10px', left:'50%', transform:'translateX(-50%)'}}/>
      <br/>
      <p className="mb-4">
            <strong>Expert Navigation & Logistics</strong>
Seamless Transportation: Managing the "heavy lifting" of travel, such as coordinating airport transfers, navigating local transit, and ensuring the group moves between locations on schedule without getting lost.

Access & VIP Entry: Utilizing local connections to secure reservations at busy restaurants, skip-the-line access at cultural sites, or entry into exclusive areas that an independent group might not find.

Safety & Risk Management: Providing a safety net by knowing which areas are safe, understanding local emergency protocols, and managing the physical well-being of the group during outdoor excursions.
</p>
             <img src={tourist2} alt="Retreats Around The World" style={{width:'full', height:'200px', borderRadius:'10px', position:'relative', top:'10px', left:'50%', transform:'translateX(-50%)'}}/>
<br/>
<strong>
Cultural & Educational Enrichment</strong><br/>
Contextual Storytelling: Bringing the destination to life by sharing the history, folklore, and cultural significance of the retreat location. This adds a layer of intellectual depth that complements the spiritual or physical work of the retreat.

Language Translation: Acting as the primary bridge between the retreat group and the local community, facilitating meaningful interactions and ensuring participants feel comfortable in a foreign environment.

Local Customs & Etiquette: Educating the group on local norms—such as tipping culture, appropriate dress for temples, and social cues—to ensure the retreat remains respectful and harmonious with the host culture.
             <img src={tourist3} alt="Retreats Around The World" style={{width:'full', height:'200px', borderRadius:'10px', position:'relative', top:'10px', left:'50%', transform:'translateX(-50%)'}}/>
<br/>
<strong>Experience Curation </strong><br/>
Hidden Gems: Stepping beyond the standard tourist path to lead the group to quiet vistas, private waterfalls, or local artisans that align with the retreat’s theme of discovery and peace.

Activity Coordination: Overseeing the logistics of day trips, such as boat charters, guided hikes, or visits to sacred sites, allowing the retreat leader to focus entirely on the participants' emotional or physical needs.

Spontaneous Problem Solving: Handling the inevitable "hiccups" of travel—like sudden weather changes or closed venues—by quickly pivoting to high-quality backup plans without disrupting the retreat’s flow.
           <img src={tourist4} alt="Retreats Around The World" style={{width:'full', height:'200px', borderRadius:'10px', position:'relative', top:'10px', left:'50%', transform:'translateX(-50%)'}}/>
<br/>
<strong>Group Facilitation</strong><br/>
Energy Management: Monitoring the physical fatigue of the group and adjusting the pace of activities to ensure participants don't return to the retreat center feeling drained.

Guest Relations: Acting as a "concierge" for participants, handling individual requests regarding local shopping, dietary preferences at local eateries, or personal errands.
        <br/>
        <Button onClick={()=>setToursistOpen(false)} className="bg-retreat-forest text-white hover:bg-retreat-cream hover:text-retreat-forest mb-4 mt-4 mr-4">
                Sign Up as a Guide
            </Button>
        </div>
        </ModalGuides>
        <div className="absolute inset-0 hero-gradient flex flex-col justify-center">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl sm:text-2xl md:pt-6 lg:text-6xl font-serif font-bold tracking-tight text-white mb-6">
                Help hosts create unforgettable experiences. 
              </h1>
             
             

              <p className="text-xl text-white/90 mb-8 max-w-2xl">
               Set out on a journey to Heal, Renew and Transform someone. 
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" onClick={openModal}>
                 Chefs
                </Button>
                <Button variant="outline" className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" onClick={openYoga}>
                 Yoga Teachers
                </Button>
                <Button variant="outline" className="bg-white text-retreat-forest hover:bg-retreat-cream hover:text-retreat-forest font-medium text-base px-8 py-6" onClick={openTourist}>
                 Tourist Guides
                </Button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
   
        <div className="justify-center items-center grid h-auto">
           <h2 className="text-2xl md:text-3xl font-serif font-semibold m-10 text-center">
            Create your profile as a Guide!
          </h2>
        <div className="max-w-xl">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
    <br/>
    <div className="mb-4">
       <label className="block text-gray-700 text-sm font-bold mb-2" >
        First Name
      </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
            <br/>
            <br/>
          
        <label className="block text-gray-700 text-sm font-bold mb-2" >
        Last Name
      </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
      <br/><br/>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Profession
      </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="profession" type="text" placeholder="Profession" onChange={(e) => setProfession(e.target.value)} />
      <br/><br/>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Specialty
      </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="specialty" type="text" placeholder="What are you specialized in?" onChange={(e)=>setSpecialty(e.target.value)} />
      <br/><br/>
     <label className="block text-gray-700 text-sm font-bold mb-2" >
        Tell us how you can benefit people attending retreats...
      </label>
                   <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="introduction" placeholder="Tell us something about yourself"></textarea>
         <br/><br/>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Username
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
      <br/><br/>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Email
      </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value) }/>
     <br/><br/>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Create Password
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={(e)=>setPassword(e.target.value)} />
      <p className="text-red-500 text-xs italic">Please choose a password.</p>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Confirm Password
      </label>
            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirmPassword" type="password" placeholder="******************" onChange={(e)=>setConfirmPassword(e.target.value)} />
       <label className="block text-gray-700 text-sm font-bold mb-2" >
       What kind of retreats can you help? Check all that apply.</label>
      <br/>
      <input type="checkbox" id="veganretreat" />
      <label >&nbsp;Vegan Retreat</label>
      <br/>
      <input type="checkbox" id="hypnoretreat" />
      <label  >&nbsp;Hypnotherapy</label>
      <br/>
      <input type="checkbox" id="meditationretreat" />
      <label >&nbsp;Meditation Retreat</label><br/>
      <input type="checkbox" id="corporateretreat" />
      <label >&nbsp;Corporate Retreat</label><br/>
      <input type="checkbox" id="healthretreat" />
      
      <label >&nbsp;Health Retreat</label>
      <br/>
         <input type="checkbox" id="yogaretreat" />
      
      <label >&nbsp;Yoga Retreat</label>
      <br/>
        <input type="checkbox" id="recreationretreat" />
      
      <label>&nbsp;Recreation Retreat</label>
      <br/>
      <input type="checkbox" id="others" />
            <label >&nbsp;Others</label>
            <br/>
            <br/>
                   <label className="block text-gray-700 text-sm font-bold mb-2" >
            How can you help retreats...</label>
                   <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="details" placeholder="Tell us in details what kind of retreats you would love to host....." ></textarea>
       </div>

    </div>
    <div className="flex items-center justify-between">
      <button className="bg-lime-700 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={guideProfile} >
        Create a Profile
      </button>
     
     </div>
      
      <br/>
      
  </form>
  <p className="text-center text-gray-500 text-xs">
    &copy;2025 World of Bots LLC. All rights reserved.
  </p>
  </div>
</div>  
    
    </>
  )
}

export default GuideSignUp