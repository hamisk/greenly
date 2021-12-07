import axios from 'axios';
import React from 'react'
import {Link} from 'react-router-dom';
import Input from '../../components/Input/Input'
import './SignUp.scss'

function SignUp(props) {
    const handleSignUp = (e) => {
        e.preventDefault();
        console.log({
            name: e.target.name.value,
            username: e.target.username.value,
            password: e.target.password.value
        })

        axios.post('http://localhost:8080/users/register', {
            name: e.target.name.value,
            username: e.target.username.value,
            password: e.target.password.value
        })
        .then(res => {
            console.log(res)
            props.history.push('/login')
        })
    }

    return (
        <>
        <section className="signup">
            <div className="signup__container">
                <h1 className="signup__header">Sign Up</h1>
                <form onSubmit={handleSignUp}>
                    <div className="signup__columns-wrapper">
                        <div className="signup__column">
                            <Input label="Name" name="name" type="text" />
                            <Input label="Username" name="username" type="text" />
                            <Input label="Password" name="password" type="password" />
                        </div>
                        <div className="signup__column">
                            <Input label="City" name="city" type="text" />
                            <Input label="Country" name="country" type="text" />
                            <Input label="Carbon target (tonnes per year)" name="carbon" type="number" value="10" placeholder={10} />
                        </div>
                    </div>
                    <div className="signup__links">
                        <button className="signup__button" type="submit">Sign Up</button>
                    </div>
                </form>
                <div className="signup__login">
                    <Link className="signup__link" to="/login">Already have an account? <span className="signup__login-link">Log In</span></Link>
                </div>
            </div>
        </section>
        </>
    )
}

export default SignUp
