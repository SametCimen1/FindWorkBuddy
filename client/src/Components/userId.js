import {  useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';

export default function UserId(){
    let { id } = useParams();
    const [user, setUser] = useState();


    const getUser = async() =>{
       const data =  await fetch("http://localhost:5000/getuser", {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include', // Don't forget to specify this if you need cookies
        body:JSON.stringify({id:id})
       })
       const response = await data.json();
       setUser(response)
    }
    useEffect(()=>{
      getUser();
    },[])
    
    if(user){
    return (
      
        <div>
            <img  src  = {user.image}/>
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
            <h2>{user.friendnum}</h2>
            <h2>{user.role}</h2>
            <button>follow</button>
        </div>
    )}
    else{
        return(
            <div>
                <h2>loading</h2>
            </div>
        )
    }
}