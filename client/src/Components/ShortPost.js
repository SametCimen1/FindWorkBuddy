import {useState, useEffect} from 'react';
import '../styles/postStyle.css';
export default function Post({post}){
     
     
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
    const getTime = () =>{
           console.log(myPost)
            const date = new Date(myPost.uploadtime);
            const currentTime = new Date();
            const difference =  (currentTime - date);
            const minutes = Math.floor((difference/1000)/60);
            setTime(minutes);
        
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
    
    if(myPost !== null){
    return(
        <div className = "post">
         <div className = "userInfo">
                   <div className = "imgAndNameContainer">
                        <img src = {myPost.image} className = "userImage"/>
                        <div className = "nameContainer">
                            <p className = "userName">Samet</p>
                        </div>
                    </div>
                    <div className = "dots">
                      <div className="dropdown">
                            <div className = "dot"></div>
                            <div className = "dot"></div>
                            <div className = "dot"></div>
                      </div>
                    <div className = "popup">
                      <h1>Edit post</h1>
                      <h1>share post</h1>
                    </div>
                </div>
         </div>
         <p>{time} min ago</p>
         <h1 className = "userHeader"  onClick={()=>console.log('clicked to the header')}>{myPost.header}</h1>
         <h2 className = "userParagraph">{myPost.paragraph}</h2>

         {/* <button onClick = {likePost}>Like</button> */}
         <div className = "postInfo">
            <div className = "viewComment">
                <p>0 views</p>
                <p>0 Comments</p>
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