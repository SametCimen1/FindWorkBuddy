import { Link} from 'react-router-dom';
import './styleLayout.css';
import {useState, useEffect} from 'react';

export default function Layout({children}) {
  const [user, setUser] = useState(false);

    const checkIfUserExist = async() =>{
      const data = await fetch("http://localhost:5000/userexist", 
      {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include', // Don't forget to specify this if you need cookies
        })
      .then(res => res.json()).then(res => setUser(res));
    }
 
 
    

    useEffect(()=>{
      checkIfUserExist();
    },[]);
  

    return(
    <div>
     <header >
        <nav className = "navbar">{/* flex */} 
          <div className = "logo">{/* logo and text 50% */} 
              <img src= "/logo.png"></img> {/* add alt and change styling   */}
          </div>
         
            <div className = "links"> {/* logo and text 50% */} 
                <div className = "firstLinks">
                  <ul className = "ulList">
                      { user &&  <li><Link className = "link" to ="/collobarete">Collobarete</Link></li> }
                      { user &&  <li><Link  className = "link"to ="/groups">Groups</Link></li> }
                      <li><Link className = "link" to ="/about">About</Link></li>
                      <li><Link className = "link" to ="/contact">Contact</Link></li>
                  </ul>    
                </div>

                <div className = "btnContainer">
                  {user ?   <Link className = "link" to = "/logout"><button className = "logout">Log out</button></Link> : <><Link  className = "link"  to = "/signup">  <button className = "signup">Sign up</button></Link>
                  <Link  className = "link"  to = "/signin"><button className = "signin">Sign in</button></Link></>}

                </div>
            </div>
         
        </nav>
     </header>
     <main>
         {children}
     </main>
   </div>
)
}