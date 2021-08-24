import {  useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Following from './following';
import NotFollowing from './notfollowing';


export default function UserId(){
    let { id } = useParams();
    const [user, setUser] = useState();
    const history = useHistory();

    const getUser = async() =>{
       const data =  await fetch("http://localhost:5000/getbyid", {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include', // Don't forget to specify this if you need cookies
        body:JSON.stringify({id:id})
       })
       const response = await data.json();
       setUser(response);
    }
    useEffect(()=>{
      getUser();
    },[])
    
    if(user){
    if(user.friend){
        return <Following user = {user}/>}
    else{
        return <NotFollowing user = {user}/>
    }
    }
    else{
        return(
            <div>
                <h2>loading</h2>
            </div>
        )
    }
}