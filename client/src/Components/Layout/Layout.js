import { Link} from 'react-router-dom';
import './styleLayout.css';
export default function layout({children}) {

    return(
    <div>
     <header >
        <nav className = "navbar">{/* flex */} 
          <div className = "logo">{/* logo and text 50% */} 
              
          </div>
         
            <div className = "links"> {/* logo and text 50% */} 
                <div className = "firstLinks">
                  <ul className = "ulList">
                      <li><Link className = "link" to ="/collobarete">Collobarete</Link></li>
                      <li><Link  className = "link"to ="/groups">Groups</Link></li>
                      <li><Link className = "link" to ="/about">About</Link></li>
                      <li><Link className = "link" to ="/contact">Contact</Link></li>
                  </ul>    
                </div>

                <div className = "btnContainer">
                    <button className = "signup"><Link  className = "link"  to = "/signup">Sign up</Link></button>
                    <button className = "signin"><Link  className = "link"  to = "/signin">Sign in</Link></button>
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