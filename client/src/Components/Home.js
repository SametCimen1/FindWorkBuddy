import {Helmet} from 'react-helmet'
import '../styles/homePageStyle.css'
import {useState, useEffect} from 'react';
import UserExist from './HomeViews/UserExist';
import DoesntExist from './HomeViews/DoesntExist'

export default function Home() {

    const [user, setUser] = useState(undefined);

    const checkIfUserExist = async() =>{
      const data = await fetch("http://localhost:5000/userexist", 
      {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include', // Don't forget to specify this if you need cookies
        })
      .then(res => res.json()).then(res => setUser(res));
    }
   useEffect(()=>{
   console.log(user)
   }, [user])

 
    useEffect(()=>{
      checkIfUserExist();
    },[])
  return(
    <div>
      { user !== 'undefined' &&  user ? <UserExist /> : <DoesntExist/>}
    </div>
)
}