import { useHistory } from "react-router-dom";
import axios from 'axios';
import {useEffect, useState} from 'react'
export default function Signup(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const login = async(e) =>{
    e.preventDefault();
    const data = await fetch("http://localhost:5000/api/user/signin", {  
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    // mode: 'same-origin',
    redirect: 'follow',
    credentials: 'include', // Don't forget to specify this if you need cookies
    body: JSON.stringify({password:password, email:email})
    })
    console.log("TOKEN IN SIGNIN REACT")
    console.log(data)
    if(data.status === 200){
      history.push("/");
      history.go(0);
    }
    else{
      alert("Something went wrong try again")
      history.go(0)
    }

  }
    return (
        <form onSubmit = {(e) => login(e)}>
        <div className = "formContainer">
            <label>email</label>
            <input type = "text" value = {email} onChange = {(e)=> setEmail(e.target.value)} />
        </div>
        <div className = "formContainer">
            <label>password</label>
            <input type = "password" value = {password} onChange = {(e)=> setPassword(e.target.value)}/>
        </div>
        <button type = "submit">Sign up!</button>
      </form>
    )
  }