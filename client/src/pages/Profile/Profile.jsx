import axios from 'axios';
import React, { Component } from 'react'
import { localAPI } from '../../utils/apiUtils';
import { epochToMMDDYYYY } from '../../utils/utils';
import Input from '../../components/Input/Input'
import './Profile.scss';
import treeIcon from '../../assets/icons/icons8-tree-100-2.png'

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
                    axios.get(localAPI + 'users/profile', {
                        headers: {Authorization: `Bearer ${token}`}})
                    ])
                .then(axios.spread(response1 => {
                    this.setState({
                        userProfile: response1.data,
                        isLoading: false
                    }, () => {
                        // console.log(this.state.userProfile)
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
        const { userProfile } = this.state
        const nameArray = userProfile.name.split(' ')

        return (
            <>
                <section className="profile">
                    <div className="profile__container">
                        <h1 className="profile__header">{nameArray[0]}'s profile page</h1>
                        <div className="profile__weekly-target-wrapper">
                            <div className="profile__weekly-target-text">
                                <h2 className="profile__weekly-target">weekly CO2e target: {Math.round(userProfile.goal_carbon / 52)}kg</h2>
                                <img src={treeIcon} alt="tree icon" className="profile__target-image" />
                                <h2 className="profile__weekly-target">based on a yearly target of {userProfile.goal_carbon}kg</h2>
                            </div>
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
