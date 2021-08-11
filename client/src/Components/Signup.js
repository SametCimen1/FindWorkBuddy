import { useHistory } from "react-router-dom";
import {Helmet} from 'react-helmet'
import '../styles/signupStyle.css'
import {useState} from 'react';
import axios from 'axios';
export default function Signup(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [img, setImg] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();

    const submitForm = async(e) =>{
     e.preventDefault();
      const data = await fetch("http://localhost:5000/api/user/signup", {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:name, password:password, email:email, firstName:firstName, lastName:lastName, img:img})
      })
      if(data.status === 404){
        const res = await data.json();
        alert(res)
      }
      else if(data.status === 200){
         history.push("/signin");
       }
       else{
         alert("someting went wrong")
       }
    }
    return (
      <form onSubmit = {(e) => submitForm(e)}>
        <div className = "formContainer">
            <label>first name</label>
            <input type = "text"  required value = {firstName} onChange = {(e)=> setFirstName(e.target.value)}/>
        </div>
        <div className = "formContainer">
            <label>last name</label>
            <input type = "text"  required value = {lastName} onChange = {(e)=> setLastName(e.target.value)}/>
        </div>
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
        <div className = "email">
            <label>img</label>
            <input type = "text"required  value = {img} onChange = {(e)=> setImg(e.target.value)}/>
        </div>
        <button type = "submit">Sign up!</button>
      </form>
  )
}