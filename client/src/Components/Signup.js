import {Helmet} from 'react-helmet'
import '../styles/signupStyle.css'
import {useState} from 'react';
export default function Signup(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
  

    const submitForm = (e) =>{
     e.preventDefault();
     console.log(name)
     console.log(password)
     console.log(email)
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