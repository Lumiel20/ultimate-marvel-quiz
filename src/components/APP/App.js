import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../Header';
import Landing from '../Landing';
import Footer from '../Footer';
import Welcome from '../../Welcome';
import Login from '../Login';
import Signup from '../Signup';
import ErrorPage from '../ErrorPage';
import '../../App.css';
import ForgetPassword from '../ForgetPass';
import { IconContext } from 'react-icons'


function App() {

  return (
    <div className="app">
      <Router>
        <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
          <Header />

          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/welcome' component={Welcome} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/forgetpassword' component={ForgetPassword} />
            <Route component={ErrorPage} />
          </Switch>

          <Footer />
        </IconContext.Provider >
      </Router>
    </div>
  );
}

export default App;
