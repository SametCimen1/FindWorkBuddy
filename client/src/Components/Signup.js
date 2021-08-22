import { useHistory } from "react-router-dom";
import {Helmet} from 'react-helmet'
import '../styles/signupStyle.css'
import {useState, useEffect} from 'react';
import axios from 'axios';
import '../styles/signupStyle.css';
import { GoogleLogin } from 'react-google-login';

export default function Signup(){



  const userExist = async() =>{
    const data = await fetch("http://localhost:5000/userexist",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      credentials: 'include',
    })
    const response = await data.json();
    if(response){
      alert("Already Logged In")
      history.push("/");
    }
  } 
  useEffect(()=>{
    userExist();
  })
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [img, setImg] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();
    const clientId =  process.env.REACT_APP_SECRET;
    const submitForm = async(e) =>{
      let newImg = '';
      if(img === ''){
          newImg = 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
      }
      else{
        newImg = img;
      }
     e.preventDefault();
      const data = await fetch("http://localhost:5000/api/user/signup", {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:name, password:password, email:email, firstName:firstName, lastName:lastName, img:newImg})
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
    console.log(email)
    }

    const onSuccess = async(res) => {
      const password = await prompt('Choose password');
      const email = res.profileObj.email;
      const name = res.profileObj.givenName;
      const img = res.profileObj.imageUrl;

        const data = await fetch('http://localhost:5000/api/user/checkemail', {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:email})
      });
      const response = await data.json();
      
      if(!response){ //doesnt exist
        const data = await fetch('http://localhost:5000/api/user/signup', {
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email:email,name:name,img:img,password:password})
        });
        console.log(data)
        const signin = await fetch('http://localhost:5000/api/user/signin', {
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          credentials: 'include',
          body: JSON.stringify({email:email,password:password})
        })
        history.push('/')
      }
      else{ //exist
        const data = await fetch('http://localhost:5000/api/user/signin', {
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          credentials: 'include',
          body: JSON.stringify({email:email,password:password})
        })
        history.push('/')
      };
    }
  
    const onFailure = (res) => {      
      console.log(`Failed to login.`);
    };

    return (
      <div className = "container">
        <div className ="formAndTextContainer">
          <div className = "signUpText">
          <h2>Sign up <span>findworkbuddy is totally free!</span></h2>
          </div>
          <div className  = "formContainer">
            <form onSubmit = {(e) => submitForm(e)}>
              <div className = "form">
                  <input type = "text" className = "input" placeholder = "Name"  required value = {name} onChange = {(e)=> setName(e.target.value.toLowerCase())}/>
              </div>
              <div className = "form">
                
                  <input type = "password" className = "input"  placeholder = "Password" required  value = {password} onChange = {(e)=> setPassword(e.target.value)}/>
              </div>
              <div className = "form">
              
                  <input type = "text"required className = "input"   placeholder = "Email"  value = {email} onChange = {(e)=> setEmail(e.target.value.toLowerCase())}/>
              </div>
              <div className = "imgForm">
                  <input type = "text" className = "imgInput"  placeholder = "img url"   value = {img} onChange = {(e)=> setImg(e.target.value)}/>
                  <input type = "file" className = "imgInput"  />
              </div>
              <button className = "btn" type = "submit">Sign up!</button>
            </form>
               <GoogleLogin
              clientId={clientId}
              buttonText="Login"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              style={{ marginTop: '100px' }}
              isSignedIn={false}
            />
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