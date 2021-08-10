import {Helmet} from 'react-helmet'
import '../styles/signupStyle.css'
import {useState} from 'react';
import axios from 'axios';
export default function Signup(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
  

    const submitForm = async(e) =>{
     e.preventDefault();
      const data = await fetch("http://localhost:5000/signup", {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify("name")
      })
      const response = await data.json();
      console.log(response)
    }
    return (
      <form onSubmit = {(e) => submitForm(e)}>
        <div className = "formContainer">
            <label>Name</label>
            <input type = "text"  required value = {name} onChange = {(e)=> setName(e.target.value)}/>
        </div>
        <div className = "formContainer">
            <label>password</label>
            <input type = "password"required  value = {password} onChange = {(e)=> setPassword(e.target.value)}/>
        </div>
        <div className = "email">
            <label>email</label>
            <input type = "text"required  value = {email} onChange = {(e)=> setEmail(e.target.value)}/>
        </div>
        <button type = "submit">Sign up!</button>
      </form>
  )
}