// modules
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Component } from 'react';

// components
import Activities from './pages/Activities/Activities';
import LogIn from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import About from './pages/About/About';
import SideNav from './components/SideNav/SideNav';
import AddNewActivity from './pages/AddNewActivity/AddNewActivity';

// styling
import './App.scss';

const SideNavWithRouter = withRouter(SideNav)

class App extends Component {
    
    render() {
        return (
            <div className="app">
                <BrowserRouter>
                    <SideNavWithRouter />
                    <div className="main">
                        <Switch>
                            <PrivateRoute path="/" exact component={Dashboard} />
                            <PrivateRoute path="/home/profile" component={Profile} />
                            <PrivateRoute path="/new-activity" component={AddNewActivity} />
                            <Route path="/activities" component={Activities} />
                            <Route path="/about" component={About} />
                            <Route path="/signup" component={SignUp} />
                            <Route path="/login" component={LogIn} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
