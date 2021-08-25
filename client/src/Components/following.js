import styles from '../styles/profileStyle.module.css';
import {useState} from 'react';

export default function Profile({user}){
    const [currentItem, setCurrentItem] = useState('profile');

    const [about, setAbout] = useState('');
    const [name, setName] = useState('');
    console.log("IN FOLLOWING")
    console.log(user)
    return(
        <div>
            <div className = {styles.imgContainer}>
              <div className =  {styles.imgAndName} > 
                      {user.user.ownimg ? 
                    <img src = {`http://localhost:5000/img/${user.user.image}`} alt = "profile img  of the user" className = {styles.userimg}/>
                    :
                    <img src = {user.image} alt = "profile img  of the user" className = {styles.userimg}/>
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
                <li onClick = {()=> setCurrentItem('posts')}  className = {currentItem ==='posts' ? styles.selected :''}>Posts</li>
                <li onClick = {()=> setCurrentItem('edit')}  className = {currentItem ==='edit' ? styles.selected  :''}>Edit Profile</li>
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
                <div>
                    <h3>About</h3>
                    {user.user.about}
                </div>
            )
            }

          { currentItem === 'posts' && (
                <h1>Posts</h1>
            )
            }
        </div>
    )
}