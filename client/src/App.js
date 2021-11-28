import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Activities from './pages/Activities/Activities';
import Home from './pages/Home/Home';

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact><Home /></Route>
                    <Route path="/activities"><Activities /></Route>
                    <Route></Route>
                    <Route></Route>
                </Switch>
            </BrowserRouter>

        </div>
    );
}

export default App;
