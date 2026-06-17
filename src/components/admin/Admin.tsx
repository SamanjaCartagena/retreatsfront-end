import React from 'react'

export default function Admin() {
  return (
     <div className="justify-center items-center grid h-screen">
      
      <div className="w-full max-w-xs items-center justify-center">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
       Admin Email
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="adminemail" placeholder="Email" />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
      Admin Password
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="adminpassword" type="password" placeholder="******************" />
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" >
        Sign In
      </button>
      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
     
      </div>
      <br/>
       
  </form>
  <p className="text-center text-gray-500 text-xs">
    &copy;2025 World of Bots LLC. All rights reserved.
  </p>
</div>    
    </div>
  )
}
