import React, {useEffect, useState} from 'react'
import { Button } from "@/components/ui/button";
import pic from '../../assets/bozeman.jpg';
import { useNavigate } from "react-router-dom"; 
import ModalGuides from '../ModalGuides.js';
import chef1 from '../../assets/nic.jpg';
import chef2 from '../../assets/vegan.jpg';
import chef3 from '../../assets/ayurveda.jpg';
import yoga1 from '../../assets/yoga.jpg';
import yoga2 from '../../assets/yoga1.jpg';
import yoga3 from '../../assets/yoga2.jpg';
import tourist1 from '../../assets/guide1.jpg';
import tourist2 from '../../assets/guide2.jpg';
import tourist3 from '../../assets/guide3.jpg';
import tourist4 from '../../assets/guide4.jpg';
import { db, auth, storage } from "../../firebase";
import {v4} from 'uuid';


import { collection, addDoc } from "firebase/firestore"; 
import { getDownloadURL, getStorage, ref, listAll, uploadBytes, deleteObject} from "firebase/storage";


import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,signInWithPopup, signOut, onAuthStateChanged  } from "firebase/auth";
function GuideSignUp() {
    const [modalOpen, setModalOpen]= useState(false);
    const [yogaModalOpen, setYogaModalOpen]= useState(false);
    const [toursistOpen, setToursistOpen]= useState(false);
    const [loadingAI, setLoadingAI]= useState(false);
    const [firstName, setFirstName]= useState('');
    const [lastName, setLastName]= useState('');
    const [profession, setProfession]= useState('');
    const [imageUpload, setImageUpload] = useState(null)
    const [specialty, setSpecialty]= useState('');
    const [guideEmail, setGuideEmail]= useState('');
    const [guideId, setGuideId] = useState('');
    const [imageList, setImageList] = useState([])
    const [guideIntroduction, setGuideIntroduction] = useState("")
    const [guidePhone,setGuidePhone] = useState('')
    const [guideLocation, setGuideLocation] = useState('')
    const [guideCity, setGuideCity] = useState('')
    const [password, setPassword]= useState('');
    const [type1, setType1] = useState('')
    const [type2, setType2] = useState('')
    const [type3, setType3] = useState('')
    const [guideType, setGuideType] = useState('')
    const [confirmPassword, setConfirmPassword]= useState('');
    const [userName, setUserName]= useState('');
    const auth = getAuth();
    useEffect(()=>{
      window.scrollTo(0,0)
onAuthStateChanged(auth, async (user) => {
  if(user){
    console.log(user.uid)
    const userId=user.uid
    setGuideEmail(user.email)
    setGuideId(userId)
  }



})

    },[])
    
    const guideProfile = async() => {
          const type = [type1, type2, type3].concat(guideType).filter(Boolean);

         try{

                                       addDoc(collection(db, "guides"), {
                                       guideId: guideId,
                                       guideFirstName: firstName,
                                       guideLastName: lastName,
                                       guideUserName: userName,
                                       guidePhone:guidePhone,
                                       guideProfession: profession,
                                       guideSpecialty: type,
                                       guideLocation:guideLocation,
                                       guideCity:guideCity,
                                       guideEmail:guideEmail,
                                       guideIntroduction:guideIntroduction,
                                       createdAt: new Date()
                                     });
                                     navigate(`/adminpage/${guideId}/guideadmin`)
                      
                       
     
             
            
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
        Phone
      </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="Phone" onChange={(e) => setGuidePhone(e.target.value)} />
      <br/><br/>
       <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        What kind of Guide are you? Select Type1
      </label>
            <select className="bg-white p-2 rounded-md" onChange={(e)=>setType1(e.target.value)} value={type1}>
              <option value="">Select Type</option>
    <option value="Adventure">Adventure</option>
    <option value="Art">Art</option>
    <option value="Ayurveda">Ayurveda</option>
    <option value="Breathwork">Breathwork</option>
        <option value="Chakras">Chakras</option>

        <option value="Detox">Detox</option>
        <option value="Energy">Energy Healing</option>
        <option value="Horse">Horse Retreat</option>
     <option value="Men">Men's Retreat</option>
    <option value="Meditation">Meditation</option>
    <option value="Mens Retreat">Mens Retreat</option>
    <option value="Martial Arts">Martial Arts</option>
    <option value="Photography">Photography</option>
    <option value="Plant Medicine">Plant Medicine</option>
  <option value="Shamanic Journey">Shamanic Journey</option>
  <option value="Sound Healing">Sound Healing</option>
    <option value="Spiritual">Spiritual</option>
        <option value="Surfing">Surfing</option>
        <option value="Views">Views</option>
    <option value="Vegan">Vegan</option>
    <option value="Yoga">Yoga</option>
    <option value="Womens Retreat">Women's Retreat</option>
    <option value="Writing">Writing</option>
               

              </select>
              </div>
              <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        What kind of Guide are you? Select Type2
      </label>
            <select className="bg-white p-2 rounded-md" onChange={(e)=>setType2(e.target.value)} value={type2}>
              <option value="">Select Type</option>
    <option value="Adventure">Adventure</option>
    <option value="Art">Art</option>
    <option value="Ayurveda">Ayurveda</option>
    <option value="Breathwork">Breathwork</option>
        <option value="Chakras">Chakras</option>

        <option value="Detox">Detox</option>
        <option value="Energy">Energy Healing</option>
        <option value="Horse">Horse Retreat</option>
     <option value="Men">Men's Retreat</option>
    <option value="Meditation">Meditation</option>
    <option value="Mens Retreat">Mens Retreat</option>
    <option value="Martial Arts">Martial Arts</option>
    <option value="Photography">Photography</option>
    <option value="Plant Medicine">Plant Medicine</option>
  <option value="Shamanic Journey">Shamanic Journey</option>
  <option value="Sound Healing">Sound Healing</option>
    <option value="Spiritual">Spiritual</option>
        <option value="Surfing">Surfing</option>
        <option value="Views">Tourist Guide</option>
    <option value="Vegan">Vegan</option>
    <option value="Yoga">Yoga</option>
    <option value="Womens Retreat">Women's Retreat</option>
    <option value="Writing">Writing</option>
               

              </select>
              </div>   
                  <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        What kind of Guide are you? Select Type3
      </label>
            <select className="bg-white p-2 rounded-md" onChange={(e)=>setType3(e.target.value)} value={type3}>
              <option value="">Select Type</option>
    <option value="Adventure">Adventure</option>
    <option value="Art">Art</option>
    <option value="Ayurveda">Ayurveda</option>
    <option value="Breathwork">Breathwork</option>
        <option value="Chakras">Chakras</option>

        <option value="Detox">Detox</option>
        <option value="Energy">Energy Healing</option>
        <option value="Horse">Horse Retreat</option>
     <option value="Men">Men's Retreat</option>
    <option value="Meditation">Meditation</option>
    <option value="Mens Retreat">Mens Retreat</option>
    <option value="Martial Arts">Martial Arts</option>
    <option value="Photography">Photography</option>
    <option value="Plant Medicine">Plant Medicine</option>
  <option value="Shamanic Journey">Shamanic Journey</option>
  <option value="Sound Healing">Sound Healing</option>
    <option value="Spiritual">Spiritual</option>
        <option value="Surfing">Surfing</option>
        <option value="Views">Tourist Guide</option>
    <option value="Vegan">Vegan</option>
    <option value="Yoga">Yoga</option>
    <option value="Womens Retreat">Women's Retreat</option>
    <option value="Writing">Writing</option>
               

              </select>
              </div> 
              <br/>
                <br/><br/>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        What type of help do you offer in a retreat?
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="type" type="text" placeholder="Type of help" onChange={(e) => setGuideType(e.target.value)} />
      <br/><br/>
         
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Location
      </label>
            <select className="bg-white p-4 rounded border-2" onChange={(e)=>setGuideLocation(e.target.value)} value={guideLocation}>
        <option value="">Select Location</option>
    <option value="Afghanistan">Afghanistan</option>
    <option value="Albania">Albania</option>
    <option value="Algeria">Algeria</option>
    <option value="Andorra">Andorra</option>
    <option value="Angola">Angola</option>
    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
    <option value="Argentina">Argentina</option>
    <option value="Armenia">Armenia</option>
    <option value="Australia">Australia</option>
    <option value="Austria">Austria</option>
    <option value="Azerbaijan">Azerbaijan</option>
    <option value="Bahamas">Bahamas</option>
    <option value="Bahrain">Bahrain</option>
    <option value="Bangladesh">Bangladesh</option>
    <option value="Barbados">Barbados</option>
    <option value="Belarus">Belarus</option>
    <option value="Belgium">Belgium</option>
    <option value="Belize">Belize</option>
    <option value="Benin">Benin</option>
    <option value="Bhutan">Bhutan</option>
    <option value="Bolivia">Bolivia</option>
    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
    <option value="Botswana">Botswana</option>
    <option value="Brazil">Brazil</option>
    <option value="Brunei">Brunei</option>
    <option value="Bulgaria">Bulgaria</option>
    <option value="Burkina Faso">Burkina Faso</option>
    <option value="Burundi">Burundi</option>
    <option value="Cabo Verde">Cabo Verde</option>
    <option value="Cambodia">Cambodia</option>
    <option value="Cameroon">Cameroon</option>  
    <option value="Canada">Canada</option>
    <option value="Central African Republic">Central African Republic</option>
    <option value="Chad">Chad</option>
    <option value="Chile">Chile</option>
    <option value="China">China</option>
    <option value="Colombia">Colombia</option>
    <option value="Comoros">Comoros</option>
    <option value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</option>
    <option value="Costa Rica">Costa Rica</option>
    <option value="Croatia">Croatia</option>
    <option value="Cuba">Cuba</option>
    <option value="Cyprus">Cyprus</option>
    <option value="Czechia (Czech Republic)">Czechia (Czech Republic)</option>
    <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>  
    <option value="Denmark">Denmark</option>
    <option value="Djibouti">Djibouti</option>
    <option value="Dominica">Dominica</option>
    <option value="Dominican Republic">Dominican Republic</option>
    <option value="Ecuador">Ecuador</option>
    <option value="Egypt">Egypt</option>
    <option value="El Salvador">El Salvador</option>
    <option value="Equatorial Guinea">Equatorial Guinea</option>
    <option value="Eritrea">Eritrea</option>
    <option value="Estonia">Estonia</option>
    <option value="Ethiopia">Ethiopia</option>
    <option value="Fiji">Fiji</option>
    <option value="Finland">Finland</option>
    <option value="France">France</option>
    <option value="Gabon">Gabon</option>
    <option value="Gambia">Gambia</option>
    <option value="Georgia">Georgia</option>
    <option value="Germany">Germany</option>
    <option value="Ghana">Ghana</option>
    <option value="Greece">Greece</option>
    <option value="Grenada">Grenada</option>
    <option value="Guatemala">Guatemala</option>
    <option value="Guinea">Guinea</option>
    <option value="Guinea-Bissau">Guinea-Bissau</option>
    <option value="Guyana">Guyana</option>
    <option value="Haiti">Haiti</option>
    <option value="Holy See">Holy See</option>
    <option value="Honduras">Honduras</option>
    <option value="Hungary">Hungary</option>
    <option value="Iceland">Iceland</option>
    <option value="India">India</option>
    <option value="Indonesia">Indonesia</option>
    <option value="Iran">Iran</option>
    <option value="Iraq">Iraq</option>
    <option value="Ireland">Ireland</option>
    <option value="Israel">Israel</option>
    <option value="Italy">Italy</option>
    <option value="Jamaica">Jamaica</option>
    <option value="Japan">Japan</option>
    <option value="Jordan">Jordan</option>
    <option value="Kazakhstan">Kazakhstan</option>
    <option value="Kenya">Kenya</option>
    <option value="Kiribati">Kiribati</option>
    <option value="Kuwait">Kuwait</option>
    <option value="Kyrgyzstan">Kyrgyzstan</option>
    <option value="Laos">Laos</option>
    <option value="Latvia">Latvia</option>
    <option value="Lebanon">Lebanon</option>
    <option value="Lesotho">Lesotho</option>
    <option value="Liberia">Liberia</option>
    <option value="Libya">Libya</option>
    <option value="Liechtenstein">Liechtenstein</option>
    <option value="Lithuania">Lithuania</option>
    <option value="Luxembourg">Luxembourg</option>
    <option value="Madagascar">Madagascar</option>
    <option value="Malawi">Malawi</option>
    <option value="Malaysia">Malaysia</option>
    <option value="Maldives">Maldives</option>
    <option value="Mali">Mali</option>
    <option value="Malta">Malta</option>
    <option value="Marshall Islands">Marshall Islands</option>
    <option value="Mauritania">Mauritania</option>
    <option value="Mauritius">Mauritius</option>
    <option value="Mexico">Mexico</option>
    <option value="Micronesia">Micronesia</option>
    <option value="Moldova">Moldova</option>
    <option value="Monaco">Monaco</option>
    <option value="Mongolia">Mongolia</option>
    <option value="Montenegro">Montenegro</option>
    <option value="Morocco">Morocco</option>
    <option value="Mozambique">Mozambique</option>
    <option value="Myanmar (Burma)">Myanmar (Burma)</option>
    <option value="Namibia">Namibia</option>
    <option value="Nauru">Nauru</option>
    <option value="Nepal">Nepal</option>
    <option value="Netherlands">Netherlands</option>
    <option value="New Zealand">New Zealand</option>
    <option value="Nicaragua">Nicaragua</option>
    <option value="Niger">Niger</option>
    <option value="Nigeria">Nigeria</option>
    <option value="North Korea">North Korea</option>
    <option value="North Macedonia">North Macedonia</option>
    <option value="Norway">Norway</option>
    <option value="Oman">Oman</option>
    <option value="Pakistan">Pakistan</option>
    <option value="Palau">Palau</option>
    <option value="Palestine">Palestine</option>
    <option value="Panama">Panama</option>
    <option value="Papua New Guinea">Papua New Guinea</option>
    <option value="Paraguay">Paraguay</option>
    <option value="Peru">Peru</option>
    <option value="Philippines">Philippines</option>
    <option value="Poland">Poland</option>
    <option value="Portugal">Portugal</option>
    <option value="Qatar">Qatar</option>
    <option value="Romania">Romania</option>
    <option value="Russia">Russia</option>
    <option value="Rwanda">Rwanda</option>
    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
    <option value="Saint Lucia">Saint Lucia</option>
    <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>  
    <option value="Samoa">Samoa</option>
    <option value="San Marino">San Marino</option>
    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
    <option value="Saudi Arabia">Saudi Arabia</option>
    <option value="Senegal">Senegal</option>
    <option value="Serbia">Serbia</option>  
    <option value="Seychelles">Seychelles</option>
    <option value="Sierra Leone">Sierra Leone</option>
    <option value="Singapore">Singapore</option>
    <option value="Slovakia">Slovakia</option>
    <option value="Slovenia">Slovenia</option>
    <option value="Solomon Islands">Solomon Islands</option>
    <option value="Somalia">Somalia</option>
    <option value="South Africa">South Africa</option>
    <option value="South Korea">South Korea</option>
    <option value="South Sudan">South Sudan</option>
    <option value="Spain">Spain</option>
    <option value="Sri Lanka">Sri Lanka</option>
    <option value="Sudan">Sudan</option>
    <option value="Suriname">Suriname</option>  
    <option value="Sweden">Sweden</option>
    <option value="Switzerland">Switzerland</option>
    <option value="Syria">Syria</option>
    <option value="Taiwan">Taiwan</option>
    <option value="Tajikistan">Tajikistan</option>
    <option value="Tanzania">Tanzania</option>
    <option value="Thailand">Thailand</option>
    <option value="Timor-Leste">Timor-Leste</option>
    <option value="Togo">Togo</option>
    <option value="Tonga">Tonga</option>
    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
    <option value="Tunisia">Tunisia</option>
    <option value="Turkey">Turkey</option>
    <option value="Turkmenistan">Turkmenistan</option>
    <option value="Tuvalu">Tuvalu</option>
    <option value="Uganda">Uganda</option>
    <option value="Ukraine">Ukraine</option>
    <option value="United Arab Emirates">United Arab Emirates</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="United States of America">United States of America</option>
    <option value="Uruguay">Uruguay</option>
    <option value="Uzbekistan">Uzbekistan</option>
    <option value="Vanuatu">Vanuatu</option>
    <option value="Venezuela">Venezuela</option>
    <option value="Vietnam">Vietnam</option>
    <option value="Yemen">Yemen</option>
    <option value="Zambia">Zambia</option>
    <option value="Zimbabwe">Zimbabwe</option>

    </select>
    <br/>
    <br/>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        City
      </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="specialty" type="text" placeholder="City" onChange={(e)=>setGuideCity(e.target.value)} />
      <br/><br/>
      
       <label className="block text-gray-700 text-sm font-bold mb-2" >
        Introduce yourself
      </label>
                   <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="introduction" placeholder="Introduce yourself" onChange={(e)=>setGuideIntroduction(e.target.value)}></textarea>
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
     
     
   
    <div className="flex items-center justify-between">
      <Button className="bg-lime-700 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={guideProfile} >
        Create a Profile
      </Button>
     </div>
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