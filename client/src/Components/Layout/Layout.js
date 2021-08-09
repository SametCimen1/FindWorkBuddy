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
                      <li><Link to ="/collobarete">Collobarete</Link></li>
                      <li><Link to ="/groups">Groups</Link></li>
                      <li><Link to ="/about">About</Link></li>
                      <li><Link to ="/contact">Contact</Link></li>
                  </ul>    
                </div>

                <div>
                    <button>Sign up</button>
                    <button>Sign in</button>
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