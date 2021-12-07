import axios from 'axios';
import React from 'react'
import {Link} from 'react-router-dom';
import Input from '../../components/Input/Input'
import { localAPI } from '../../utils/apiUtils';
import './SignUp.scss'

function SignUp(props) {
    const handleSignUp = (e) => {
        e.preventDefault();
        console.log({
            name: e.target.name.value,
            username: e.target.username.value,
            password: e.target.password.value,
            city: e.target.city.value,
            country: e.target.country.value,
            carbon: e.target.carbon.value,
        })

        axios.post(localAPI + 'auth/register', {
            name: e.target.name.value,
            username: e.target.username.value,
            password: e.target.password.value,
            city: e.target.city.value,
            country: e.target.country.value,
            carbon: e.target.carbon.value,
        })
        .then(res => {
            console.log(res)
            let token = res.data.token
            sessionStorage.setItem('authToken', token)
            props.history.push('/home/profile')
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
                            <Input label="Carbon target (kg per year)" name="carbon" type="number" value="10" placeholder={10} />
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
