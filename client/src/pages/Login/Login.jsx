import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { API_URL } from '../../config';
import './Login.scss';

function LogIn(props) {

    const handleLogIn = (e) => {
        e.preventDefault();

        axios.post(API_URL + '/auth/login', {
            username: e.target.username.value,
            password: e.target.password.value
        })
        .then(res => {
            let token = res.data.token
            sessionStorage.setItem('authToken', token)
            window.location.href = '/'
        })
    }

    return (
        <section className="login">
            <div className="login__container">
                <h1>Log In</h1>
                <form onSubmit={handleLogIn}>
                    <Input label="Username" name="username" type="text" />
                    <Input label="Password" name="password" type="password" />
                    <div className="login__links">
                        <button className="login__button" type="submit">Log In</button>
                    </div>
                </form>
                <div className="login__signup">
                    <Link className="login__link" to="/signup">Don't have an account? <span className="login__signup-link">Sign Up</span></Link>
                </div>
            </div>
        </section>
    )
}

export default LogIn;