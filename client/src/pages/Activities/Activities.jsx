import { Component } from 'react';
import axios from 'axios';

import { localAPI } from '../../utils/apiUtils';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import './Activities.scss';

export class Activities extends Component {

    state = {
        activities: null
    }

    componentDidMount() {
        axios
            .get(localAPI + "footprints")
            .then(response => {
                console.log(response)
                this.setState({
                    activities: response.data
                })
            })
    }

    render() {
        if (!this.state.activities) {
            return <p>Loading...</p>
        }
        return (
            <div className="activities__container">
                {this.state.activities.map(activity => 
                    <ActivityCard activity={activity} key={activity.id}/>)}
            </div>
        )
    }
}

export default Activities
