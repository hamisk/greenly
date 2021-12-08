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
        isLoading: true
    }

    componentDidMount() {
        let token = sessionStorage.getItem('authToken')

        if (!!token) {
            axios
                .all([
                    axios.get(API_URL + '/users/profile', {
                        headers: {Authorization: `Bearer ${token}`}})
                    ])
                .then(axios.spread(response1 => {
                    this.setState({
                        userProfile: response1.data,
                        isLoading: false
                    })
                }))
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
        const { userProfile } = this.state
        const nameArray = userProfile.name.split(' ')

        return (
            <>
                <section className="profile">
                    <div className="profile__container">
                        <h1 className="profile__header">{nameArray[0]}'s profile page</h1>
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
                                    <Input label="Name" name="name" type="text" defaultValue={userProfile.name} />
                                    <Input label="Username" name="username" type="text" defaultValue={userProfile.username} />
                                    <Input label="Password" name="password" type="password" />
                                    <Input label="Carbon target (kg per year)" name="carbon" type="number" defaultValue={userProfile.goal_carbon} />
                                </div>
                                <div className="profile__column">
                                    <Input label="City" name="city" type="text" defaultValue={userProfile.city}/>
                                    <Input label="Country" name="country" type="text" defaultValue={userProfile.country}/>
                                    <Input label="Confirm password" name="confirmPassword" type="password" />
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
