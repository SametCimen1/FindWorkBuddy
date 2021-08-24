import {useState, useEffect} from 'react'
export default function Getimg(){

    
    const request = async() =>{
        const signin = await fetch('http://localhost:5000/getimg', {
            method:"GET",
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
          })     
    }
    useEffect(()=>{
      request()
    },[])
    return (
     <h1>getimg</h1>   
    )
}