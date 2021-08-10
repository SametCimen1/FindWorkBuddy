import axios from 'axios';
import {useEffect} from 'react'
export default function Signup(){
    
   
  const login = async(e) =>{
    e.preventDefault();
    const data = await fetch("http://localhost:5000/signin", {method:"POST"})
    const response = await data.json();
    console.log(response)

  }
    return (
        <form onSubmit = {(e) => login(e)}>
        <div className = "formContainer">
            <label>Name</label>
            <input type = "text" />
        </div>
        <div className = "formContainer">
            <label>password</label>
            <input type = "password" />
        </div>
        <button type = "submit">Sign up!</button>
      </form>
    )
  }