import React, { useState, useRef } from "react";
import { Button } from "../ui/button"
import emailjs from '@emailjs/browser';
import { useToast } from "@/hooks/use-toast";



const Contact = () => {

  const form = useRef(null);

     const { toast } = useToast();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
   
  const [formData, setFormData] = useState({
        user_name:"",
        user_email:"",
        user_message:""
       })
  
  const handleSubmit=(e: React.FormEvent)=>{
    e.preventDefault();

    emailjs
      .sendForm('service_9u700we', 'template_slv7qow', form.current, {
        publicKey: 'iYI6t4bT28fP2liFc',
      })
      .then(
        () => {

          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
          toast({
      title: "Inquiry Submitted",
      description: `Thank you for your interest. I will get back to you as soon as possible.` ,
    });
    // Reset form
    setFormData({
      user_name: "",
      user_email: "",
      user_message: ""
    });
  };
  return (
    <div className="container mx-auto p-6 border rounded-lg shadow-md bg-white text-black m-4">
      <h1 className="text-2xl font-bold mb-4">Contact Me For Consultation</h1>
      <p>Hi My name is Samanja. I am the founder of Retreats Around The World! A company dedicated to providing unique retreat experiences and transformative event management around the globe.</p>
      <p>For consultations and business inquiries fill out the form:</p>
    
<form className="contact-form grid grid-cols-1 gap-4 "  method="POST" onSubmit={handleSubmit} ref={form}>
    <input type="text" placeholder="Name" value={formData.user_name} onChange={handleInputChange} className="border rounded-lg p-2 mt-4" name="user_name" required />
    <input type="email" placeholder="Email" value={formData.user_email} onChange={handleInputChange} className="border rounded-lg p-2 m-2" name="user_email" required />
    <textarea placeholder="Message" value={formData.user_message} onChange={handleInputChange} className="border rounded-lg p-2 m-2" name="user_message" required></textarea>
    <Button className="bg-lime-700 hover:bg-lime-900 w-40 text-white font-bold py-2 px-4 rounded" type="submit">Send</Button>

</form>

    </div>
  )
}

export default Contact