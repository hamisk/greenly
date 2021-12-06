import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import './App.scss';
import Header from './components/Header/Header';
import Activities from './pages/Activities/Activities';
import Home from './pages/Home/Home';
import LogIn from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import SignUp from './pages/SignUp/SignUp';
import { Component } from 'react';
import Groceries from './pages/Groceries/Groceries';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import About from './pages/About/About';
import SideNav from './components/SideNav/SideNav';
const HeaderWithRouter = withRouter(Header)
const SideNavWithRouter = withRouter(SideNav)

class App extends Component {
    
    render() {
        return (
            <div className="app">
                <BrowserRouter>
                    <SideNavWithRouter />
                    <div class="main">
                        {/* <HeaderWithRouter /> */}
                        <Switch>
                            <Route path="/" exact><Home /></Route>
                            <Route path="/activities" component={Activities} />
                            <Route path="/groceries" component={Groceries} />
                            <Route path="/about" component={About} />
                            <Route path="/signup" component={SignUp} />
                            <Route path="/login" component={LogIn} />
                            <PrivateRoute path="/home/dashboard" component={Dashboard} />
                            <PrivateRoute path="/home/profile" component={Profile} />
                            <Route></Route>
                            <Route></Route>
                        </Switch>
                    </div>
                </BrowserRouter>

            </div>
        );
    }
}

export default App;
