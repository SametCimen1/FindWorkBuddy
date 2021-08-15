import '../../styles/userExistStyle.css'
import {useState, useEffect} from 'react'

export default function UserExist(){
    const [INwhat, setINwhat] = useState('');
    const [INheader, setINheader] = useState('');
    const [INkey, setINkey] = useState('');
    const [INimg, setINimg] = useState('');
    
    return(
        <div className =  "userExistContainer">
            <div className = "userExistImageContainer" style = {{backgroundImage:'url(/userExist.jpg)'}}>
                 <h1 className = "userExistStart">Start finding friends to work with</h1>
            </div>
            
            
            <h2>Find people, post what you are looking for</h2>
            <div className = "post">
            <input type = "text" className = "INwhat"  placeholder = "What do you want to study"/>
                <div className = "INCONTAINER">
                    <input type  = "text" className = "INheader"  placeholder = "Header"/>
                    <input type = "text" className = "INkey"  placeholder = "Keywords"/>
                    <input type = "file" className = "INimg"   placeholder = "images"/>
                    <button className = "searchBtn">Search</button>
                </div>
          

            </div>
             <h2>Or check what others are looking for</h2>
            <div className = "search">
            <select className="sort">
                <option value="">Sort by</option>
                <option value="dog">Date</option>
                <option value="cat">Populer</option>
            </select>
            <input type = "text" className = "subject"  placeholder = "What subject are you looking for to study"/>
            <button className = "searchBtn">Search</button>

            </div>
        </div>
    )
}
