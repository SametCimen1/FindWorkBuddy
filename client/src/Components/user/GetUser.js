import  {useParams} from "react-router-dom";
import {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";

export default function GetUser(){
    let { id } = useParams();
    const num = parseInt(id);
    const history = useHistory();
   


    const getUser = async() =>{
        try {
          
            const data = await fetch('http://localhost:5000/getuser', {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                  redirect: 'follow',
                  credentials: 'include',
                body: JSON.stringify({id:num})
            });
            console.log(data)
            if(data.status === 401){
                history.push("/signin");
            }
            if(data.status === 404){
                alert("user doesnt exist")
            }
            else{
            const response = await data.json();  
            console.log(response)
            }     

        } catch (error) {
            console.log(error)
        }


    } 
    useEffect(()=>{
     
       
        if(isNaN(num)){
            history.push("/404");
        }
        else{
            getUser();
        }
    
    },[])

    return (
      <h1>Heldddlo</h1>
    )
}
