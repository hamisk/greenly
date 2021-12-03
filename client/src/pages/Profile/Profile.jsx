import axios from 'axios';
import React, { Component } from 'react'

export class Profile extends Component {

    state = {
        profile : ""
    }

    getProfile = () => {
        const token = sessionStorage.authToken;
        axios.get('/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data);
            this.setState({
                profile: response.data
            })
        })
    }

    render() {
        return (
            <div>
                <h2>profile page</h2>
                <p>{this.state.profile}</p>
            </div>
        )
    }
}

export default Profile
