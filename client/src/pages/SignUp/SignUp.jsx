import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import Input from '../../components/Input/Input'
import { API_URL } from '../../config';
import './SignUp.scss'

function SignUp(props) {

    const [invalid, setInvalid] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [usernameList, setUsernameList] = useState([]);
    const [usernameTaken, setUsernameTaken] = useState(false);

    useEffect(() => {
        axios.get(API_URL + '/users/get-users')
            .then(response => {
                const usernameListArr = [...new Set(response.data.map(item => item.username))]
                setUsernameList(usernameListArr)
            })
    }, [])
    
    const handleSignUp = (e) => {
        e.preventDefault();
        
        // reinitialise for subsequent attempts
        setInvalid(false)
        setPasswordMatch(true)
        setUsernameTaken(false)

        let signupName = e.target.name.value
        let signupUsername = e.target.username.value
        let signupPassword = e.target.password.value
        let signupConfirmPassword = e.target.confirmPassword.value
        let signupCity = e.target.city.value
        let signupCountry = e.target.country.value
        let signupCarbon = e.target.carbon.value

        if (usernameList.find(username => username.toLowerCase() === signupUsername.toLowerCase())) {
            return setUsernameTaken(true)
        }

        if (!signupName || !signupUsername || !signupPassword || !signupCarbon ) {
            return setInvalid(true)
        }

        if (signupPassword !== signupConfirmPassword) {
            return setPasswordMatch(false)
        }
        // console.log(signupName)
        // console.log(signupUsername)
        // console.log(signupPassword)
        // console.log(signupConfirmPassword)
        // console.log(signupCity)
        // console.log(signupCountry)
        // console.log(signupCarbon)

        axios.post(API_URL + '/auth/register', {
            name: signupName,
            username: signupUsername,
            password: signupPassword,
            city: signupCity,
            country: signupCountry,
            carbon: signupCarbon,
        })
        .then(res => {
            let token = res.data.token
            sessionStorage.setItem('authToken', token)
            window.location.href = '/home/profile'
        })
        .catch(error => console.log(error))
    }

    return (
        <>
        <section className="signup">
            <div className="signup__container">
                <h1 className="signup__header">Sign Up</h1>
                <form onSubmit={handleSignUp}>
                    <div className="signup__columns-wrapper">
                        <div className="signup__column">
                            <Input label="Name" name="name" type="text" invalid={invalid} placeholder="Required"/>
                            <Input label="Username" name="username" type="text" invalid={invalid || usernameTaken} placeholder="Required"/>
                            <Input label="Password" name="password" type="password" invalid={invalid || !passwordMatch} placeholder="Required"/>
                            <Input label="Confirm Password" name="confirmPassword" type="password" invalid={invalid || !passwordMatch} placeholder="Required"/>
                        </div>
                        <div className="signup__column">
                            <Input label="Carbon target (kg per year)" name="carbon" type="number" value="10" defaultValue={10000} invalid={invalid} placeholder="Required"/>
                            <Input label="City" name="city" type="text" placeholder="Optional"/>
                            <Input label="Country" name="country" type="text" placeholder="Optional" />
                            {invalid ? <p className="signup__invalid">Please provide all required fields</p> : <></> }
                            {usernameTaken ? <p className="signup__invalid">Username already in use, please provide another</p> : <></> }
                            {passwordMatch ? <></> : <p className="signup__invalid">Passwords did not match</p> }
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
