import '../styles/profileStyle.css';
import {useState} from 'react';

export default function Profile({user}){
    const [edit, setEdit] = useState(false);
    const [about, setAbout] = useState('');
    const [name, setName] = useState('');
    console.log("IN FOLLOWING")
    console.log(user)
    return(
        <div>
            <div className = "imgContainer">
              <div className = "imgAndName">
                  {user.user.ownimg ? 
                    <img src = {`http://localhost:5000/img/${user.user.image}`} alt = "profile img  of the user" className = "userimg"/>
                    :
                    <img src = {user.image} alt = "profile img  of the user" className = "userimg"/>
                }
               
                <div className = "nameFollowers">
                   <div className = "nameContainer">
                       <p>{user.user.name}</p>
                   </div>
                   <div className = "foll">
                       <p className = "profileOne">{user.user.followers} followers</p>
                       <span className = "profileDot"></span>
                       <p className = "profileTwo">{user.user.following} following</p>
                   </div>
                </div>
              </div>
              <div className = "editProfileContainer">
                    <button className ="editProfileBtn"  onClick = {()=> setEdit(prev => !prev)}>Edit Profile</button>
              </div>
            </div>
            {edit && (
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
        </div>
    )
}