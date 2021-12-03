import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Activities from './pages/Activities/Activities';
import Home from './pages/Home/Home';
import LogIn from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import SignUp from './pages/SignUp/SignUp';

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact><Home /></Route>
                    <Route path="/activities"><Activities /></Route>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={LogIn} />
                    <Route></Route>
                    <Route></Route>
                </Switch>
            </BrowserRouter>

        </div>
    );
}

export default App;
