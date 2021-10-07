import styles from '../styles/User.module.css'
import {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
export default function NewComment({id, clickFund}){
    const [comment, setComment] = useState();
    const history = useHistory();
    
    const getComment = async() =>{

        const data = await fetch("http://localhost:5000/post/getcomment",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
              redirect: 'follow',
              credentials: 'include', // Don't forget to specify this if you need cookies
              body:JSON.stringify({id:id})
        })
        const response = await data.json();
        console.log("Comment")
        console.log(response)
        if(response === 'cmUn' || response.text === ''){
            console.log("comment is empty")
        }
        else{
            setComment(response)
            console.log(response)
        }
    }
    
    useEffect(()=>{
        getComment();
    },[])
    console.log("Comment Before return")
    console.log(comment)
    if(typeof comment !== 'undefined'){
    return (
        <div className = {styles.container}>
        <div className = {styles.userBox} onClick = {()=> {history.push(`/user/${comment.userid}`); history.go(0)}}>
            <img className = {styles.userImage} src = {`http://localhost:5000/img/${comment.userimg}`} />
            <p className = {styles.userName}>{comment.username}</p>
        </div>
        <div className = {styles.textContainer}>
            <p>commented {comment.text}</p>
        </div>
        <button className = {styles.okBtn} onClick = {()=> clickFund(id)}>OK</button>
    </div>
    
    )
    }
    else{
        return ('')
    }
}