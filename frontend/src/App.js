import logo from './logo.svg';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import { Redirect } from 'react-router';

import Welcome from './components/welcome';
import Keygen from './components/keygenerate';
import SendMsg from './components/sendMsg';
import Decryptor from './components/decryptor';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/welcome" />
        </Route>
        <Route path="/welcome" component={Welcome}></Route>
        <Route path="/key-generator" component={Keygen}></Route>
        <Route path="/send-msg" component={SendMsg}></Route>
        <Route path="/decryptor" component={Decryptor}></Route>
        <Route component={Welcome}></Route>
      </Switch> 
    </Router>
  );
}

export default App;
