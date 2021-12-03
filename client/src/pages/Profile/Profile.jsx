import React, { Component } from 'react'

export class Profile extends Component {

    getProfile = () => {
        const token = sessionStorage.authToken;
        axios.get('/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data);
        })
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Profile
