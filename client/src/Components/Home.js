import {Helmet} from 'react-helmet'
import '../styles/homePageStyle.css'

export default function layout() {
    return(
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
     <main className = "homeMain" style = {{backgroundImage:"url(/home.jpg)"}}>
       <div className = "homeMainContainer">
          <div className = " move homeMainTextContainer">
             <h1 className = " findBuddy"> Find a buddy to collobarete on your project!</h1>
             <p className = "signUp">Sign up for free!</p>
             <button className = "getStarted">Get Started</button>
             <button className = "whatWeOffer">See What we offer</button>
          </div>
       </div>
     </main>
   </div>
)
}