import { useHistory } from "react-router-dom";
import axios from 'axios';
import {useEffect, useState} from 'react'
import { GoogleLogin } from 'react-google-login';

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


  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    // refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };
  
  const clientId = '322239845218-556vfpmq4didjpc3s97gtt17f28b390a.apps.googleusercontent.com'
    return (
      <div className = "container">
      <div className ="formAndTextContainer">
        <div className = "signUpText">
        <h2>Sign up <span>findworkbuddy is totally free!</span></h2>
        </div>
        <div className  = "formContainer">
          <form onSubmit = {(e) => login(e)}>
          <div className = "form">
            
            <input type = "text"required className = "input"   placeholder = "Email"  value = {email} onChange = {(e)=> setEmail(e.target.value)}/>
        </div> 
            <div className = "form">
              
                <input type = "password" className = "input"  placeholder = "Password" required  value = {password} onChange = {(e)=> setPassword(e.target.value)}/>
            </div>
            <button className = "btn" type = "submit">Log in</button>
          </form>
           <h3>or sign in with</h3>
                <GoogleLogin
              clientId={clientId}
              buttonText="Login"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              style={{ marginTop: '100px' }}
              isSignedIn={true}
            />
    
         </div>
          
        </div>
        <div className = "imgContainer">
            <img src  ="/signin.png" className = "img"></img>
         </div>
    </div>
    )
  }