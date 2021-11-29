import { Component } from 'react';
import axios from 'axios';

import { localAPI } from '../../utils/apiUtils';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import './Activities.scss';
import SummaryTable from '../../components/SummaryTable/SummaryTable';
import GroceryTable from '../../components/GroceryTable/GroceryTable';

export class Activities extends Component {

    state = {
        activities: null,
        groceriesActive: false
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

    toggleClass() {
        console.log(this.state)
        const currentState = this.state.groceriesActive;
        this.setState({ groceriesActive: !currentState });
    };

    render() {
        if (!this.state.activities) {
            return <p>Loading...</p>
        }
        return (
            <section className="activity-page">
                <div className="activities">
                    <h2>Add an activity</h2>
                    <button className={`activities__collapsible ${this.state.groceriesActive ? "activities__active" : ""}`} 
                        onClick={this.toggleClass.bind(this)}>
                        <h2>+ groceries</h2>
                    </button>
                    <div className={this.state.groceriesActive ? "activities__content-expanded" : "activities__content-collapsed"}>
                        <GroceryTable />
                        {/* {this.state.activities.map(activity => 
                        <ActivityCard activity={activity} key={activity.id}/>)} */}
                    </div>
                </div>
                <div className="act-summary">
                    <div className="act-summary__header">
                        <p className="act-summary__title">Activity Summary</p>
                        <p className="act-summary__date">Week Commencing: 11/29/2021</p>
                    </div>
                    <SummaryTable />

                </div>
            </section>
        )
    }
}

export default Activities
