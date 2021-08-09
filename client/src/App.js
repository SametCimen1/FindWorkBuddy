import {Helmet} from 'react-helmet'

import {Switch, Route} from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home'
import Collobarete from './Components/Collobarete'
import Contact from './Components/Contact'
import Groups from './Components/Groups'
import About from './Components/About'
import Signin from './Components/Signin'
import Signup from './Components/Signup'

function App() {
  return (
    <Layout>
     <Switch>
       <Route exact path ="/" component = {Home}/>
       <Route exact path ="/collobarete" component = {Collobarete}/>
       <Route exact path ="/about" component = {About}/>
       <Route exact path ="/contact" component = {Contact}/>
       <Route exact path ="/groups" component = {Groups}/>
       <Route exact path ="/signup" component = {Signup}/>
       <Route exact path ="/signin" component = {Signin}/>
     </Switch>
    </Layout>
  );
}

export default App;


//check if user exist here