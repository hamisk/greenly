import axios from 'axios';
import { Component } from 'react'

class Dashboard extends Component {
    state = {
        isLoading: true,
        userActivities: []
    }

    componentDidMount() {
        let token = sessionStorage.getItem('authToken')

        if (!!token) {
            axios.get('http://localhost:8080/users/get-activities', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res)
                this.setState({
                    userActivities: res.data,
                    isLoading: false
                }, () => {
                    console.log(this.state.userActivities)
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
        const { isLoading, userActivities } = this.state
        return isLoading || !userActivities.length ? 
            <h1>Loading...</h1> 
        :
            (
                <div className="dashboard">
                    <h1>
                        Dashboard
                    </h1>

                    <h2>Welcome! {userActivities[0].id}</h2>
                    {userActivities.map( activity => 
                        <>
                        <p>{activity.id}</p>
                        <p>{activity.user_id}</p>
                        <p>{activity.activity_id}</p>
                        <p>{activity.qty}</p>
                        <p>{activity.created_at}</p>
                        <p>{activity.activity}</p>
                        <p>{activity.category}</p>
                        <p>{activity.unit}</p>
                        <p>{activity.option}</p>
                        <p>{activity.carbon}</p>
                        </>)}

                    <button onClick={this.handleLogOut}>Log Out</button>
                </div>
            )
    }
}

export default Dashboard;
