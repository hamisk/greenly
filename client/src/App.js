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
import axios from 'axios';
import Groceries from './pages/Groceries/Groceries';
import Dashboard from './pages/Dashboard/Dashboard';
const HeaderWithRouter = withRouter(Header)

class App extends Component {

    state = {
        userInfo: {},
        isLoading: true,
        isLoggedIn: false,
        token: ""
    }

    componentDidMount() {
        let token = sessionStorage.getItem('authToken')

        if (!!token) {
            axios.get('http://localhost:8080/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                // console.log(res)
                this.setState({
                    userInfo: res.data,
                    isLoading: false,
                    isLoggedIn: true,
                    token: token
                })
            })
        } else {
            // history.push('/login')
        }
    }
    
    render() {
        return (
            <div className="app">
                <BrowserRouter>
                    <HeaderWithRouter isLoggedIn={this.state.isLoggedIn} userInfo={this.state.userInfo}/>
                    <Switch>
                        <Route path="/" exact><Home /></Route>
                        <Route path="/activities"><Activities token={this.state.token}/></Route>
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/groceries" component={Groceries} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/login" component={LogIn} />
                        <Route></Route>
                        <Route></Route>
                    </Switch>
                </BrowserRouter>

            </div>
        );
    }
}

export default App;
