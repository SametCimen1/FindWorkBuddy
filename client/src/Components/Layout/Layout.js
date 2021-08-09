import { Link} from 'react-router-dom';
export default function layout({children}) {

    return(
    <div>
     <header >
        <nav class = "navbar">{/* flex */} 
          <div class = "logo">{/* logo and text 50% */} 
              
          </div>
         
            <div class = "links"> {/* logo and text 50% */} 
                <div class = "firstLinks">
                  <ul class = "ulList">
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