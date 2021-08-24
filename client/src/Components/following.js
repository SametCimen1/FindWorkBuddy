import '../styles/profileStyle.css';
import {useState} from 'react';

export default function Profile({user}){
    const [edit, setEdit] = useState(false);
    return(
        <div>
            <div className = "imgContainer">
              <div className = "imgAndName">
                <img src = "https://lh3.googleusercontent.com/a-/AOh14Ggv80087eqtAP7L7ul9j4KiwWKn2F42w6TEjCa1zg=s96-c" alt = "profile img  of the user" className = "userimg"/>
                <div className = "nameFollowers">
                   <div className = "nameContainer">
                       <p>samet</p>
                   </div>
                   <div className = "foll">
                       <p className = "profileOne">0 followers</p>
                       <span className = "profileDot"></span>
                       <p className = "profileTwo">0 Following</p>
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
      action='http://localhost:5000/uploadimg' 
      method='post' 
      encType="multipart/form-data">
                        <input type = "file" name = "newimg" />
                        <input type='submit' value='Upload!' />
                    </form>
                </div> 
            )}
        </div>
    )
}