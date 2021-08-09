import {Helmet} from 'react-helmet'
import '../styles/homePageStyle.css'
import { InView } from 'react-intersection-observer'
import {useState} from 'react';

export default function Home() {
    const [isInView, setIsInView] = useState([{name:"first", t:false}, {name:"second", t:false}, {name:"third", t:false}, {name:"fourth", t:false}, {name:"fifth", t:false}, {name:"sixth", t:false}, {name:"seventh", t:false}])
    console.log(isInView)

    const changeView = (myType) =>{
      if(typeof isInView !== 'undefined'){   
        const newArr = isInView.filter(elem =>  elem.name !== myType);
        setIsInView([...newArr, {name:myType, t:true}]);
      }
      else{
      }
    }
    
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
         
          {/* <InView onChange={(inView)=>{changeView('first')}}> */}
          <InView onChange={(inView)=> {if(inView)changeView('first')}}>
          {({ ref, inView }) => ( 
          <div ref = {ref} className = "cardContainer">
            <div  className = {isInView.some(element => element.name === 'first' && element.t===true) ? "card inView" : "card"}>
              <span ref = {ref}  className = "stick"></span>
              <img src = "https://media.discordapp.net/attachments/761233693293019187/874351949397524541/unknown.png" />
              <h3>Free: It is always free! <br></br> Find random people to work with!</h3>
            </div> 

            <div  className = {isInView.some(element => element.name === 'first' && element.t===true) ? "card inView" : "card"}>
              <span ref = {ref}  className = "stick"></span>
              <img src = "https://media.discordapp.net/attachments/761233693293019187/874351949397524541/unknown.png" />
              <h3>Easy to sign up and start working!</h3>
            </div> 


            <div  className = {isInView.some(element => element.name === 'first' && element.t===true) ? "card inView" : "card"}>
              <span ref = {ref}  className = "stick"></span>
              <img src = "https://media.discordapp.net/attachments/761233693293019187/874351949397524541/unknown.png" />
              <h3>Collaborate with anyone you like!</h3>
            </div> 

            <div  className = {isInView.some(element => element.name === 'first' && element.t===true) ? "card inView" : "card"}>
              <span ref = {ref}  className = "stick"></span>
              <img src = "https://media.discordapp.net/attachments/761233693293019187/874351949397524541/unknown.png" />
              <h3>work in groups and easy to share projects!</h3>
            </div> 
        </div>
          )}
            </InView>
          
          
       </div>
     </main>
   </div>
)
}