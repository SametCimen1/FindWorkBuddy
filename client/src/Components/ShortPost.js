import {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import '../styles/postStyle.css';
export default function Post({post}){
    const history = useHistory();
     
     
    useEffect(()=>{
       setMyPost(post)
       isLiked()     
    },[])

    




    const [like, setLike] = useState(false);

   
    const [myPost, setMyPost] = useState(null);
    useEffect(()=>{
        if(myPost !== null) getTime();
    },[myPost])


    const [time, setTime] = useState(0);
    const [timeUnit, setTimeUnit] = useState('');
    const getTime = () =>{
           console.log(myPost)
            const date = new Date(myPost.uploadtime);
            const currentTime = new Date();
            const difference =  (currentTime - date);
            const minutes = Math.floor((difference/1000)/60);
            if(minutes > 60){
                const hours = Math.floor(minutes/60);
                setTime(hours)
                setTimeUnit("hours")
            }
            else{
                setTime(minutes);
                setTimeUnit("minutes")
            }
    }

    
    const [didLike, setDidLike] = useState(null);
    const isLiked = async() =>{
        const data = await fetch('http://localhost:5000/didlike',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
              redirect: 'follow',
              credentials: 'include', // Don't forget to specify this if you need cookies
              body:JSON.stringify({id:post.id})
        });
        const response = await data.json();
        setDidLike(response);
    }
  
    const likePost = async() =>{
        if(like){// liked now unlike it 
            console.log('unliking')
            const data = await fetch('http://localhost:5000/unlikepost',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                  redirect: 'follow',
                  credentials: 'include', // Don't forget to specify this if you need cookies
                  body:JSON.stringify({id:post.id})
            });
            const response = await data.json();
            setMyPost(response)
        }
        else{
            console.log('liking')
            const data = await fetch('http://localhost:5000/likepost',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                  redirect: 'follow',
                  credentials: 'include', // Don't forget to specify this if you need cookies
                  body:JSON.stringify({id:post.id})
            });
            const response = await data.json();
            setMyPost(response)
        }
        setLike(prev => !prev)
    }
    const longPost = () =>{
        history.push(`/post/${post.id}`);
    }

    const [popup, setPopup] = useState(false);
    useEffect(()=>{
console.log(popup)
    },popup)
    if(myPost !== null){
    return(
        <div className = "post">
         <div className = "userInfo">
                   <div className = "imgAndNameContainer">
                        <img src = {myPost.image} className = "userImage"/>
                        <div className = "nameContainer">
                            <p className = "userName">Samet</p>
                            <p>{time} {timeUnit} ago</p>
                        </div>
                        
                    </div>
                    <div className = "dots">
                      <div className="dropdown"  onClick = {()=> setPopup(prev => !prev)}>
                            <div className = "dot"></div>
                            <div className = "dot"></div>
                            <div className = "dot"></div>
                      </div>
                    <div className = {popup ? "pupopvisible" :"popupinvisible"}>
                      <h1>Edit post</h1>
                      <h1>share post</h1>
                    </div>
                </div>
         </div>
         <div className = "texts"> 
            <h1 className = "userHeader "  onClick={longPost}>{myPost.header}</h1>
            <p className = "userParagraph " onClick={longPost}>{myPost.paragraph}</p>
         </div>
         {/* <button onClick = {likePost}>Like</button> */}
         <div className = "postInfo">
            <div className = "viewComment">
                <p>0 views</p>
                <p className = "longPost" onClick={longPost}>0 Comments</p>
            </div>
            <div className = "heartContainer">
                <p>{myPost.likes}</p>
               <div className={like? 'heart heartactive': 'heart' } onClick = {likePost}></div>
            </div>
         </div>
        </div>
    )}
    else{
        return (
            <h1>myPost is null</h1>
        )
    }
}