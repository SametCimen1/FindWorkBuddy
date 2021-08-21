import '../../styles/userExistStyle.css'
import {useState, useEffect} from 'react'
import ShortPost from '../ShortPost';
export default function UserExist(){
    const [INwhat, setINwhat] = useState('');
    const [INheader, setINheader] = useState('');
    const [INkey, setINkey] = useState('');
    const [INimg, setINimg] = useState('');



    const [sort, setSort] = useState('');
    const [subject, setSubject] = useState('');


    const [posts, setPosts] = useState([]);


    const submitPost = async() =>{
     const data  = await fetch('http://localhost:5000/newpost', {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include', // Don't forget to specify this if you need cookies
        body:JSON.stringify({image:INimg, header:INheader, paragraph:INwhat, keywords:INkey})
     });
     const response = await data.json();
     if(response){
       alert("successfully added post")
     }
     else{
         alert("error check console")
     }
    }

    const getPosts = async() =>{
        const data = await fetch('http://localhost:5000/getposts', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
              redirect: 'follow',
              credentials: 'include', // Don't forget to specify this if you need cookies
              body:JSON.stringify({sort:sort, subject:subject})
        })
        const response = await data.json();
        console.log("responmse")
        console.log(response);
        setPosts(response)
    }




    return(
        <div className =  "userExistContainer">
            <div className = "userExistImageContainer" style = {{backgroundImage:'url(/userExist.jpg)'}}>
                 <h1 className = "userExistStart">Start finding friends to work with</h1>
            </div>
            
            
            <h2>Find people, post what you are looking for</h2>
            <div className = "searchPost">
            <input type = "text" className = "INwhat" value = {INwhat} onChange = {(e)=> setINwhat(e.target.value)}  placeholder = "What do you want to study"/>
                <div className = "INCONTAINER">
                    <input type  = "text" value = {INheader} onChange = {(e)=> setINheader(e.target.value)} className = "INheader"  placeholder = "Header"/>
                    <input type = "text" value = {INkey} onChange = {(e)=> setINkey(e.target.value)} className = "INkey"  placeholder = "Keywords"/>
                    <input type = "file" value = {INimg} onChange = {(e)=> setINimg(e.target.value)}  className = "INimg"   placeholder = "images"/>
                    <button className = "searchBtn" onClick = {submitPost}>Search</button>
                </div>
          

            </div>
             <h2>Or check what others are looking for</h2>
            <div className = "search">
            <select className="sort" value = {sort} onChange = {(e) => setSort(e.target.value)}>
                <option value="">Sort by</option>
                <option value="date">Date</option>
                <option value="populer">Populer</option>
            </select>
            <input type = "text" value = {subject} onChange = {(e) => setSubject(e.target.value)} className = "subject"  placeholder = "What subject are you looking for to study"/>
            <button className = "searchBtn" onClick = {getPosts}>Search</button>

            </div>
            
                <div className = "posts">
                 {posts.map(post =>  <ShortPost post = {post} key = {post.id}/>)}  
                </div>
            
        </div>
    
    )
}
