import axios from 'axios';
import React from 'react'

class Dashboard extends React.Component {
    state = {
        isLoading: true,
        userInfo: {}
    }

    componentDidMount() {
        let token = sessionStorage.getItem('authToken')

        if (!!token) {
            axios.get('http://localhost:8080/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res)
                this.setState({
                    userInfo: res.data,
                    isLoading: false
                })
            })
        } else {
            this.props.history.push('/login')
        }
    }

    handleLogOut = (e) => {
        e.preventDefault();

        sessionStorage.removeItem('authToken')

        this.props.history.push('/login')
    }

    render() {
        const { isLoading, userInfo } = this.state
        return isLoading ? 
            <h1>Loading...</h1> 
        :
            (
                <div className="dashboard">
                    <h1>
                        Dashboard
                    </h1>

                    <h2>Welcome! {userInfo.name}</h2>

                    <button onClick={this.handleLogOut}>Log Out</button>
                </div>
            )
    }
}

export default Dashboard;
