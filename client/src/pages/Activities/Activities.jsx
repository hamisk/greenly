import { Component } from 'react';
import axios from 'axios';

import { localAPI } from '../../utils/apiUtils';
import ActivityCard from '../../components/ActivityCard/ActivityCard';

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
        return (
            <div>
                <ActivityCard />
            </div>
        )
    }
}

export default Activities
