import { useHistory } from "react-router-dom";
import {Helmet} from 'react-helmet'
import '../styles/signupStyle.css'
import {useState} from 'react';
import axios from 'axios';
import '../styles/signupStyle.css';

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
      <div className = "container">
        <div className ="formAndTextContainer">
          <div className = "signUpText">
          <h2>Sign up <span>findworkbuddy is totally free!</span></h2>
          </div>
          <div className  = "formContainer">
            <form onSubmit = {(e) => submitForm(e)}>
              <div className = "form">
                  <input type = "text" className = "input" placeholder = "Name"  required value = {name} onChange = {(e)=> setName(e.target.value)}/>
              </div>
              <div className = "form">
                
                  <input type = "password" className = "input"  placeholder = "Password" required  value = {password} onChange = {(e)=> setPassword(e.target.value)}/>
              </div>
              <div className = "form">
              
                  <input type = "text"required className = "input"   placeholder = "Email"  value = {email} onChange = {(e)=> setEmail(e.target.value)}/>
              </div>
              <div className = "imgForm">
                  <input type = "text"required className = "imgInput"  placeholder = "img url"   value = {img} onChange = {(e)=> setImg(e.target.value)}/>
                  <input type = "file" className = "imgInput"  />
              </div>
              <button className = "btn" type = "submit">Sign up!</button>
            </form>
              <div className = "haveAccountContainer">
              <p className = "haveAccount" onClick = {()=> history.push('/signin')}>Already have an account? <span>Log In</span></p>
              </div>
           </div>
        
          </div>
          <div className = "imgContainer">
              <img src  ="/signin.png" className = "img"></img>
           </div>
      </div>
  )
}