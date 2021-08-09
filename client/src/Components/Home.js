import {Helmet} from 'react-helmet'
import '../styles/homePageStyle.css'

export default function layout() {
    return(
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
     <main class = "homeMain" style = {{backgroundImage:"url(/home.jpg)"}}>
       <div>
        <h1> Find a buddy to collobarete on your project</h1>
        
       </div>
     </main>
   </div>
)
}