import React,{useState} from 'react'
import pic from '../assets/yoga2.jpg'
import { useNavigate, Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

export default function Guides() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const forgot = async() => {
    await sendPasswordResetEmail(auth, email)
  .then(() => {
    alert('Password reset email sent!');
  })
  .catch((error) => {
    alert('Error sending password reset email');  
  });
  }
  const signin = async() => {
    try{
      await signInWithEmailAndPassword(auth, email, password);
      alert('Sign In Successful');
      navigate(`/`);
      window.location.reload();
    
  } catch (error) {
    alert('Sign In Failed');  

  }
  }
  const create =() => {
    navigate('/guidesignup');
  }
  return (
     <div>
        <div className="relative h-[80vh] min-h-[700px] w-full overflow-hidden">
   
    <div className="justify-center items-center grid h-screen absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pic})` }}>
      
      <div className="w-full max-w-xs items-center justify-center">
        <form className="bg-white/90 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className='font-bold'>Sign in as a Guide</h1>
        <br/>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email"> 
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={(e)=>setPassword(e.target.value)} />
          </div>  
          <div className="flex items-center justify-between">
            <button className="bg-lime-700 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={signin}>
              Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-lime-700 hover:text-lime-800" href="#" onClick={forgot}>
              Forgot Password?
            </a>
          </div>
          <br/>
           <div className="grid items-center justify-between">
             <p className="inline-block align-baseline font-bold text-sm text-gray-700">
              Don't have an account?
            </p>
              <br/>
           <Link className="inline-block align-baseline font-bold text-sm text-lime-700 hover:text-lime-800" to="/guidesignup">
              Create Account
            </Link>
            </div>
            </form>

        </div>
    </div>
  </div>
     </div>
  )
}
