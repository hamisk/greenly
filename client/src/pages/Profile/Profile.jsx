import axios from 'axios';
import React, { Component } from 'react'

import Input from '../../components/Input/Input'
import treeIcon from '../../assets/icons/icons8-tree-100-2.png'

import { epochToMMDDYYYY } from '../../utils/utils';
import { API_URL } from '../../config';

import './Profile.scss';

export class Profile extends Component {

    state = {
        userProfile : "",
        usernameList: [],
        isLoading: true,
        invalid: false,
        usernameTaken: false
    }

    componentDidMount() {
        let token = sessionStorage.getItem('authToken')

        if (!!token) {
            axios
                .all([
                    axios.get(API_URL + '/users/profile', {
                        headers: {Authorization: `Bearer ${token}`}}),
                        axios.get(API_URL + '/users/get-users')
                    ])
                    
                .then(axios.spread((response1, response2) => {
                    const usernameListArr = [...new Set(response2.data.map(item => item.username))]
                    this.setState({
                        userProfile: response1.data,
                        isLoading: false,
                        usernameList: usernameListArr
                    })
                }))
        } else {
            this.props.history.push('/login')
        }
    }

    updateProfile = (e) => {
        let token = sessionStorage.getItem('authToken')
        e.preventDefault();
        
        // reinitialise for subsequent attempts
        this.setState({
            invalid: false,
            usernameTaken: false
        })

        let updateName = e.target.name.value
        let updateUsername = e.target.username.value
        let updateCity = e.target.city.value
        let updateCountry = e.target.country.value
        let updateCarbon = e.target.carbon.value

        let usernameListArray = this.state.usernameList.filter(username => username !== this.state.userProfile.username)

        if (usernameListArray.find(username => username === updateUsername)) {
            return this.setState({usernameTaken: true})
        }

        if (!updateName || !updateUsername || !updateCarbon ) {
            return this.setState({invalid: true})
        }

        axios.put(API_URL + '/users/update', {
            name: updateName,
            username: updateUsername,
            city: updateCity,
            country: updateCountry,
            carbon: updateCarbon,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            let token = res.data.token
            sessionStorage.setItem('authToken', token)
        })
    }

    render() {
        if(this.state.isLoading) {
            return <h1>loading</h1>
        }
        const { userProfile, invalid, usernameTaken } = this.state
        const nameArray = userProfile.name.split(' ')

        return (
            <>
                <section className="profile">
                    <div className="profile__container">
                        <h1 className="profile__header">{nameArray[0]}'s Profile Page</h1>
                        <div className="profile__target-wrapper">
                            <p className="profile__target-text">weekly CO2e target:</p>
                            <div className="profile__weekly-target-wrapper">
                                <img src={treeIcon} alt="tree icon" className="profile__target-image" />
                                <h1 className="profile__weekly-target">{Math.round(userProfile.goal_carbon / 52)}kg</h1>
                                <img src={treeIcon} alt="tree icon" className="profile__target-image" />
                            </div>
                            <p className="profile__target-text">based on your yearly target of {Number(userProfile.goal_carbon).toLocaleString()}kg</p>
                        </div>
                        <form onSubmit={this.updateProfile}>
                            <div className="profile__columns-wrapper">
                                <div className="profile__column">
                                    <Input label="Name" name="name" type="text" defaultValue={userProfile.name} invalid={invalid}/>
                                    <Input label="Username" name="username" type="text" defaultValue={userProfile.username} invalid={invalid}/>
                                    <Input label="Carbon target (kg per year)" name="carbon" type="number" defaultValue={userProfile.goal_carbon} invalid={invalid}/>
                                </div>
                                <div className="profile__column">
                                    <Input label="City" name="city" type="text" defaultValue={userProfile.city}/>
                                    <Input label="Country" name="country" type="text" defaultValue={userProfile.country}/>
                                    {invalid ? <p className="signup__invalid">Please provide all required fields</p> : <></> }
                                    {usernameTaken ? <p className="signup__invalid">Username already in use, please provide another</p> : <></> }
                                </div>
                            </div>
                            <div className="profile__links">
                                <p className="profile__text">Member since: {epochToMMDDYYYY(userProfile.created_at)}</p>
                                <button className="profile__button" type="submit">Update Profile</button>
                            </div>
                        </form>
                    </div>
                </section>
            </>
        )
    }
}

export default Profile
