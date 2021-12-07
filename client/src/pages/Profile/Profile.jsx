import axios from 'axios';
import React, { Component } from 'react'
import { localAPI } from '../../utils/apiUtils';
import { epochToMMDDYYYY } from '../../utils/utils';
import './Profile.scss';

export class Profile extends Component {

    state = {
        userActivities: [],
        userProfile : "",
        isLoading: true
    }

    componentDidMount() {
        let token = sessionStorage.getItem('authToken')

        if (!!token) {
            axios
                .all([
                    axios.get('http://localhost:8080/users/get-activities', {
                        headers: {Authorization: `Bearer ${token}`}}),
                    axios.get(localAPI + 'users/profile', {
                        headers: {Authorization: `Bearer ${token}`}})
                    ])
                .then(axios.spread((response1, response2) => {
                    this.setState({
                        userActivities: response1.data,
                        userProfile: response2.data,
                        isLoading: false
                    }, () => {
                        console.log(this.state.userActivities)
                        console.log(this.state.userProfile)
                    })
                    })
                )
        } else {
            this.props.history.push('/login')
        }
    }

    updateProfile = (event) => {
        event.preventDefault()
        console.log(event)
    }

    render() {
        if(this.state.isLoading) {
            return <h1>loading</h1>
        }
        const { userProfile, userActivities } = this.state
        const nameArray = userProfile.name.split(' ')

        return (
            <div className="profile__container">
                <h2>{nameArray[0]}'s profile page</h2>
                <div className="profile__columns-wrapper">
                    <div className="profile__column-left">
                        <form className="profile__form" onSubmit={(event) => {this.updateProfile(event)}}>
                            <div className="profile__input-wrapper">
                                <label className="profile__subheading">Name <br/>
                                    <input className="profile__name-input" type="text" name="first-name" placeholder="first name" defaultValue={userProfile.name}></input><br/>
                                </label>
                                <label className="profile__subheading">Username <br/>
                                    <input className="profile__name-input" type="text" name="username" placeholder="username" defaultValue={userProfile.username}></input><br/>
                                </label>
                            </div>
                            <div className="profile__input-wrapper">
                                <label className="profile__subheading">New Password <br/>
                                    <input className="profile__name-input" type="password" name="new-password" placeholder="new password"></input><br/>
                                </label>
                                <label className="profile__subheading">Confirm Password <br/>
                                    <input className="profile__name-input" type="password" name="confirm-password" placeholder="confirm password"></input><br/>
                                </label>
                            </div>
                            <div className="profile__input-wrapper">
                                <label className="profile__subheading">City <br/>
                                    <input className="profile__name-input" type="text" name="city" placeholder="city" defaultValue={userProfile.city}></input><br/>
                                </label>
                                <label className="profile__subheading">Country <br/>
                                    <input className="profile__name-input" type="text" name="country" placeholder="country" defaultValue={userProfile.country}></input><br/>
                                </label>
                            </div>
                            <label className="profile__subheading">Carbon Target (per year) <br/>
                                <input className="profile__name-input" type="text" name="carbon-target" placeholder="carbon target" defaultValue={userProfile.goal_carbon}></input><br/>
                            </label>
                            <div className="profile__links-wrapper">
                                <button>update profile</button>
                            </div>
                        </form>
                        <p className="profile__text">Member since: {epochToMMDDYYYY(userProfile.created_at)}</p>
                    </div>
                    <div className="profile__column-right">

                    </div>

                </div>
            </div>
        )
    }
}

export default Profile
