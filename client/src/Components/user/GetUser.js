import  {useParams} from "react-router-dom";
import {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";

export default function GetUser(){
    let { id } = useParams();
    const num = parseInt(id);
    const history = useHistory();
    const [img, setImg] = useState('');
    const [name,setName] = useState('');



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
                const row = response.row;
                    const get1 = row.split('(');
                    const get2 = get1[1].split(',');
                    const name = get2[0];
                    const seperateLast = get2[get2.length-1];
                    console.log(seperateLast)
                    let img =  ""
                    for(let i =0; i < seperateLast.length-1; i++){
                        img += seperateLast[i];
                    }
            
                    setImg(img);
                    setName(name);
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


    if(name){

        console.log(name)
        return (
            <div>
                <h1>{name}</h1>
                <img src = {img}></img>
            </div>
          )
    }
    else{
    return (
      <h1>Loading</h1>
    )
    }
}
