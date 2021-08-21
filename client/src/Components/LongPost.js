import {  useParams} from 'react-router-dom';
import {useState, useEffect} from 'react'
import '../styles/longStyle.css';
export default function LongPost(){
    let { id } = useParams();
    

    useEffect(()=>{
     getPost();
    },[])
  

    const [like, setLike] = useState(false);
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');
    useEffect(()=>{
        if(post !== null) getTime();
    },[post])

    const getPost = async() =>{
        const data = await fetch('http://localhost:5000/post/getpost', {
            method:"POST",
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include',
            body: JSON.stringify({id:id})
          });
        const response = await data.json();
        setPost(response);
    }
    const [time, setTime] = useState(0);
    const [timeUnit, setTimeUnit] = useState('');
    const getTime = () =>{
           console.log(post)
            const date = new Date(post.uploadtime);
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
        const data = await fetch('http://localhost:5000/post/didlike',{
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
            const data = await fetch('http://localhost:5000/post/unlikepost',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                  redirect: 'follow',
                  credentials: 'include', // Don't forget to specify this if you need cookies
                  body:JSON.stringify({id:post.id})
            });
            const response = await data.json();
            setPost(response)
        }
        else{
            console.log('liking')
            const data = await fetch('http://localhost:5000/post/likepost',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                  redirect: 'follow',
                  credentials: 'include', // Don't forget to specify this if you need cookies
                  body:JSON.stringify({id:post.id})
            });
            const response = await data.json();
            setPost(response)
        }
        setLike(prev => !prev)
    }

    const newComment = async() =>{
        const data = await fetch('http://localhost:5000/post/newcomment', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
              redirect: 'follow',
              credentials: 'include', // Don't forget to specify this if you need cookies
              body:JSON.stringify({postId:post.id, comment:comment})
        })
        
    
    }



    useEffect(()=>{
        if(post !== null){
        getComments();
        }
    },[post])
    
    const getComments = async() =>{
        if(post !== null){
        post.commentby.forEach((id) => {
            getComment(id);
        })
        }
    }

   const[comments, setComments] = useState([{}]);
   const getComment = async(commentId) =>{       
     const data = await fetch('http://localhost:5000/post/getcomment', {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          credentials: 'include', // Don't forget to specify this if you need cookies
          body:JSON.stringify({id:commentId})
     })
     const response = await data.json();
     setComments(oldArray  => [...oldArray, response]);
   };


    if(post !== null){
        return(
            <div className = "LongPost">
             <div className = "userInfo">
                       <div className = "imgAndNameContainer">
                            <img src = {post.image} className = "userImage"/>
                            <div className = "nameContainer">
                                <p className = "userName">Samet</p>
                                <p>{time} {timeUnit} ago</p>
                            </div>
                            
                        </div>
                        {/* <div className = "dots">
                          <div className="dropdown"  onClick = {()=> setPopup(prev => !prev)}>
                                <div className = "dot"></div>
                                <div className = "dot"></div>
                                <div className = "dot"></div>
                          </div>
                        <div className = {popup ? "pupopvisible" :"popupinvisible"}>
                          <div className = "popupContainer">
                            <h1>Edit post</h1>
                            <h1>share post</h1>
                          </div>
                        </div>
                        </div> */}
             </div>
             <div className = "longTexts"> 
                <h1 className = "longUserHeader "  >{post.header}</h1>
                <p className = "longUserParagraph " >{post.paragraph}</p>
             </div>
             {/* <button onClick = {likePost}>Like</button> */}
             <div className = "postInfo">
                <div className = "viewComment">
                    <p>0 views</p>
                    <p className = "longPost">0 Comments</p>
                </div>
                <div className = "heartContainer">
                    <p>{post.likes}</p>
                   <div className={like? 'heart heartactive': 'heart' } onClick = {likePost}></div>
                </div>
             </div>

             <div> {/* Replies */}
                 <h1>Replies</h1>
                 <input type = "text" value = {comment} onChange = {(e)=> setComment(e.target.value)}></input>
                 <button onClick = {newComment}>Comment</button>
                 <div>
                   {comments.map(element => {return(
                       <h1>{element.text}</h1>
                   )})}
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