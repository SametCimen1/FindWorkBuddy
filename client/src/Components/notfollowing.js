import {useState, useEffect} from 'react';
export default function NotFollowing({myUser}){
  const user = myUser.user;
  const id = myUser.id;
  console.log("NOT FOLLOWING USEr") /*
  about: "Hello I am 16"
followers: 0
following: 0
image: "nhpftybyewramizdayi.jpg"
name: "samet"
ownimg: true
*/
  const followRequest = async() =>{
    const addFriend = await fetch('http://localhost:5000/user/followreq',{
      method:"POST",
      headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include', // Don't forget to specify this if you need cookies
        body:JSON.stringify({id:id})
    })
  }

  useEffect(()=>{
    console.log("myuser")
    console.log(user)
  })


  return(
    <div>
    <img  src  ={`http://localhost:5000/img/${user.user.image}`}/>
        <h2>{user.user.name}</h2>
        <h2>{user.user.email}</h2>
        <h2>{user.user.friendnum}</h2>
        <h2>{user.user.role}</h2>
        <button onClick = {followRequest}>Follow</button>
    </div>
  )
}