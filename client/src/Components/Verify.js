import {  useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
export default function Verify(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { url } = useParams();
    const history = useHistory();


    const submitForm = async() =>{
        if(email !== '' && password !== ''){
            const data = await fetch('http://localhost:3000/verify', {
                method:"POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                redirect: 'follow',
                credentials: 'include', // Don't forget to specify this if you need cookies
                body:JSON.stringify({email:email, password:password, url:url})
            });
            const response = await data.json();
            if(response === 'ok' && data.status === 200){
               history.push('/signin')
            }
        }
        else{
            alert("You have to enter all the fields")
        }
        
    }
    return(
        <div>
            <input placeholder = "email" type = "text" value = {email} onChange = {(e)=> setEmail(e.target.value.toLowerCase())}></input>
            <input placeholder = "email" type = "text" value = {password}  onChange = {(e)=> setPassword(e.target.value)}></input>
            <button onClick = {submitForm}>Submit</button>
        </div>
    )
}