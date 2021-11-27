import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Activities from './pages/Activities/Activities';

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact><Activities /></Route>
                    <Route path="/activities"><Activities /></Route>
                    <Route></Route>
                    <Route></Route>
                </Switch>
            </BrowserRouter>

        </div>
    );
}

export default App;
