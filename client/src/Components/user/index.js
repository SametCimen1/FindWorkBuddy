import {Switch, Route} from 'react-router-dom';
import GetUser from './GetUser'
export default function Index(){
    return (
      
      <Switch>
            <Route exact path = "/user/:id" component = {GetUser}/>
      </Switch>
    
    )
}