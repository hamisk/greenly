import axios from 'axios';
import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import Input from '../../components/Input/Input'
import { API_URL } from '../../config';
import './SignUp.scss'

function SignUp(props) {

    const [valid, setValid] = useState(true);
    
    const handleSignUp = (e) => {
        e.preventDefault();


        let signupName = e.target.name.value
        let signupUsername = e.target.username.value
        let signupPassword = e.target.password.value
        let signupConfirmPassword = e.target.confirmPassword.value
        let signupCity = e.target.city.value
        let signupCountry = e.target.country.value
        let signupCarbon = e.target.carbon.value

        if (!signupName || !signupUsername || !signupPassword || !signupCarbon ) {
            return setValid(false)
        }

        axios.post(API_URL + '/auth/register', {
            name: e.target.name.value,
            username: e.target.username.value,
            password: e.target.password.value,
            city: e.target.city.value,
            country: e.target.country.value,
            carbon: e.target.carbon.value,
        })
        .then(res => {
            let token = res.data.token
            sessionStorage.setItem('authToken', token)
            window.location.href = '/home/profile'
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
                            <Input label="Name" name="name" type="text" valid={valid}/>
                            <Input label="Username" name="username" type="text" valid={valid}/>
                            <Input label="Password" name="password" type="password" valid={valid}/>
                            <Input label="Confirm Password" name="confirmPassword" type="password" valid={valid}/>
                        </div>
                        <div className="signup__column">
                            <Input label="City" name="city" type="text" />
                            <Input label="Country" name="country" type="text" />
                            <Input label="Carbon target (kg per year)" name="carbon" type="number" value="10" defaultValue={10000} valid={valid}/>
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
