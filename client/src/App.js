import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route></Route>
                    <Route></Route>
                    <Route></Route>
                </Switch>
            </BrowserRouter>

        </div>
    );
}

export default App;
