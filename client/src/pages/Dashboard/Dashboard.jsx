import axios from 'axios';
import { Component } from 'react'
import SubNav from '../../components/SubNav/SubNav';
import { v4 } from 'uuid';

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

    render() {
        const { isLoading, userActivities } = this.state
        const tabs = ['dashboard', 'profile']
        return (
            <>
                <SubNav page='home' tabs={tabs} />
                {(isLoading || !userActivities.length) ? 
                    <h1>Loading...</h1> 
                :
                    (<div className="dashboard"></div>
                )}
            </>
        )
    }
}

export default Dashboard;
