import { Component } from 'react';
import axios from 'axios';

import { localAPI } from '../../utils/apiUtils';
import { round } from '../../utils/utils'
// import ActivityCard from '../../components/ActivityCard/ActivityCard';
import './Activities.scss';
import SummaryTable from '../../components/SummaryTable/SummaryTable';
import GroceryTable from '../../components/GroceryTable/GroceryTable';

export class Activities extends Component {

    state = {
        groceries: null,
        activities: null,
        groceriesActive: false,
        summary: []
    }

    componentDidMount = () => {
        axios
            .all([
                axios.get(localAPI + "groceries"),
                axios.get(localAPI + "activities")
            ])
            // .get(localAPI + "footprints")
            .then(axios.spread((response1, response2) => {
                // console.log(response)
                this.setState({
                    groceries: response1.data,
                    activities: response2.data
                })
            }))
    }

    toggleClass = () => {
        const currentState = this.state.groceriesActive;
        this.setState({ groceriesActive: !currentState });
    };

    addToSummary = (grocery, qty) => {

        let groceryItem = {};
        groceryItem.food = grocery.food
        groceryItem.carbon = grocery.carbon * qty
        groceryItem.land = grocery.land * qty
        groceryItem.water = grocery.water * qty
        groceryItem.pollutants = grocery.pollutants * qty

        this.setState({
            summary: [...this.state.summary, groceryItem]
        }, () => {
            console.log(this.state.summary)
        })
    }

    getSummaryTotal = () => {
        let summaryArray = this.state.summary
        let co2Total = 0;
        let landTotal = 0;
        let waterTotal = 0;
        let pollutantTotal = 0;

        if (summaryArray.length) {
            summaryArray.forEach(activity => {
                co2Total += round(activity.carbon);
                landTotal += round(activity.land);
                waterTotal += round(activity.water);
                pollutantTotal += round(activity.pollutants);
            })
            return [co2Total, landTotal, waterTotal, pollutantTotal]
        } else {
            return [0,0,0,0]
        }
    }

    render() {
        if (!this.state.activities) {
            return <p>Loading...</p>
        }
        return (
            <section className="activity-page">
                <div className="activities">
                    <h2>Add an activity</h2>
                    <button className={`activities__collapsible ${this.state.groceriesActive ? "activities__active" : ""}`} 
                        onClick={this.toggleClass}>
                        <h2>+ groceries</h2>
                    </button>
                    <div className={this.state.groceriesActive ? "activities__content-expanded" : "activities__content-collapsed"}>
                        <GroceryTable groceries={this.state.groceries} addToSummary={this.addToSummary}/>
                        {/* {this.state.activities.map(activity => 
                        <ActivityCard activity={activity} key={activity.id}/>)} */}
                    </div>
                </div>
                <div className="act-summary">
                    <div className="act-summary__header">
                        <p className="act-summary__title">Activity Summary</p>
                        <p className="act-summary__date">Week Commencing: 11/29/2021</p>
                    </div>
                    <SummaryTable summary={this.state.summary} totals={this.getSummaryTotal()}/>

                </div>
            </section>
        )
    }
}

export default Activities
