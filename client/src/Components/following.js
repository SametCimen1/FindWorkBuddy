import styles from '../styles/profileStyle.module.css';
import {useState, useEffect} from 'react';
import ShortPost from './ShortPost';
export default function Profile({myUser}){
    const user = myUser.user;
    const [currentItem, setCurrentItem] = useState('profile');
    const [about, setAbout] = useState('');
    const [name, setName] = useState('');
    const [posts, setPosts] = useState();
    const [followReq, setFollowReq] = useState();
    const [followers, setFollowers] = useState();
    const [following, setFollowing] = useState();




    const getPosts = async() =>{
      const data = await fetch('http://localhost:5000/post/getuserposts', {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          credentials: 'include', // Don't forget to specify this if you need cookies
          body:JSON.stringify({userid:myUser.id})
      });
      const response = await data.json();
      setPosts(response);
    }
    
    const getFollowReq = async() =>{
        const data = await fetch('http://localhost:5000/user/getFollows', {
          method:"POST",
          headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            credentials: 'include', // Don't forget to specify this if you need cookies
        });
        const response = await data.json();
        setFollowReq(response.friendreq);
        setFollowers(response.followers);
        setFollowing(response.following);
      }
      const acceptFriend = async(id) =>{
        const data = await fetch('http://localhost:5000/user/acceptFollower', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
              redirect: 'follow',
              credentials: 'include', // Don't forget to specify this if you need cookies
              body:JSON.stringify({id:id})
            });
          const response = await data.json();
          setFollowReq(response);
      }

      const unfollow = async(id) =>{
        const data = await fetch('http://localhost:5000/user/unfollow', {
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
     getPosts();
     getFollowReq();
    },[])
    console.log("IN FOLLOWING")
    console.log(user)
    return(
        <div>
            <div className = {styles.imgContainer}>
              <div className =  {styles.imgAndName} > 
                      {user.user.ownimg ? 
                    <img src = {`http://localhost:5000/img/${user.user.image}`} alt = "profile img  of the user" className = {styles.userimg}/>
                    :
                    <img src = {user.user.image} alt = "profile img  of the user" className = {styles.userimg}/>
                }
               
                <div className = {styles.nameFollowers}>
                   <div className = {styles.nameContainer}>
                       <p>{user.user.name}</p>
                   </div>
                   <div className = {styles.foll}>
                       <p className = {styles.profileOne}>{user.user.followers} followers</p>
                       <span className ={styles.profileDot}></span>
                       <p className = {styles.profileTwo}>{user.user.following} following</p>
                   </div>
                </div>
              </div>
              <div className = {styles.editProfileContainer} >
                    <button className = {styles.editProfileBtn}  onClick = {()=> setCurrentItem('edit')}>Edit Profile</button>
              </div>
            </div>

            <div>
            <ul className =  {styles.profileOptions} >
                <li onClick = {()=> setCurrentItem('profile')} className = {currentItem ==='profile' ? styles.selected  :''}>Profile</li>
                <li onClick = {()=> setCurrentItem('edit')}  className = {currentItem ==='edit' ? styles.selected  :''}>Edit Profile</li>
                <li onClick = {()=> setCurrentItem('notifications')}  className = {currentItem ==='notifications' ? styles.selected  :''}>Notifications</li>
                <li onClick = {()=> setCurrentItem('followers')}  className = {currentItem ==='followers' ? styles.selected  :''}>Followers</li>
                <li onClick = {()=> setCurrentItem('following')}  className = {currentItem ==='following' ? styles.selected  :''}>Following</li>
            </ul>
            </div>

            {currentItem === 'edit' && (
                <div>
                    <form 
      id='uploadForm' 
      action='http://localhost:5000/updateData' 
      method='post' 
      encType="multipart/form-data">
                        <input type = "file" name = "newimg" />
                        <input type = "text" name = "about" value = {about} onChange = {(e)=> setAbout(e.target.value)} placeholder = "about" />
                        <input type = "text" name = "name" value = {name} onChange = {(e)=> setName(e.target.value.toLowerCase())} placeholder = "name" />
                        <input type='submit' value='Upload!' />
                    </form>
                </div> 
            )}

            {currentItem === 'profile' && (
                <div className = {styles.profileContainer}>
                    <div className = {styles.aboutContainer}>
                        <p className = {styles.userName}>About {user.user.name}</p>                   
                        <p className = {styles.about}>{user.user.about}</p>
                    </div>
                    <div className = {styles.followingPosts}>
                        {typeof posts !== 'undefined' ?  posts.map(post =>  <ShortPost post = {post} key = {post.id}/>)   : ''}
                    
                    </div>
                </div>
            )
            }

            {currentItem === 'notifications' && (
                <div>
                    <h1>notifications</h1>
                    {followReq.map(id => (
                    <div>
                       <h1>{id}</h1>
                       <button onClick = {()=> acceptFriend(id)}>Accept</button>
                    </div>
                    ))}
                    {console.log(followReq.friendreq)}
                </div>
            )}


           {currentItem === 'followers' && (
                <div>
                    <h1>followers</h1>
                    {followers.length === 0 ? <h2>Not following anyone</h2> : followers.map(id => {return (
                        <div>
                            <h1>{id}</h1>
                        </div>
                    )})}
                </div>
            )}

            
            
           {currentItem === 'following' && (
                <div>
                    <h1>following</h1>
                    {following.length === 0 ? <h2>Not following anyone</h2> : 
                    following.map(id=>{return (
                    <div>
                       <h1>{id}</h1>
                       <button onClick = {()=> unfollow(id)}>Unfollow</button>
                    </div>
                    )})
                    
                    }
                </div>
            )}

             
        </div>
    )
}