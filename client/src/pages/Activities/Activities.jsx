import { Component } from 'react';
import axios from 'axios';

import { localAPI } from '../../utils/apiUtils';
import { round, groupArrayBy } from '../../utils/utils'

import SummaryTable from '../../components/SummaryTable/SummaryTable';
import ActivityTable from '../../components/ActivityTable/ActivityTable';
import SubNav from '../../components/SubNav/SubNav';
import './Activities.scss';

export class Activities extends Component {

    state = {
        activities: null,
        categories: null,
        weekCommencing: "11/29/2021",
        summary: [],
        token: ''
    }

    componentDidMount = () => {

        let token = sessionStorage.getItem('authToken')
        this.setState({
            token: token
        })
        
        axios
            .all([
                axios.get(localAPI + "activities")
            ])
            .then(axios.spread((response1) => {
                // array of unique category names to generate category buttons
                const categoryNames = [...new Set(response1.data.map(item => item.category))]
                
                // intialising button toggle to false for each category
                categoryNames.sort()
                const categoriesArray = categoryNames.map(category => [category, false])

                let groupedActivities = groupArrayBy(response1.data, 'category')

                this.setState({
                    groceries: response1.data,
                    activities: groupedActivities,
                    categories: categoriesArray
                })
            }))
    }

    toggleCategoryClass = (category) => {
        const currentState = this.state.categories
        const newState = currentState.map((mapCategory) => {
            if (mapCategory === category) {
                // find toggle state of selected category and setting to opposite 
                return [category[0], !category[1]]
            } else {
                // set all other categories to false - ensures only one category expanded at one time
                return [mapCategory[0], false]
            }
        });
        this.setState({ categories: newState });
    };

    addActivityToSummary = (activity, qty, option) => {
        let activityItem = {};
        activityItem.activity = activity.activity
        activityItem.option = option
        activityItem.qty = qty

        // identify carbon emissions per unit for specific option (index in activity carbon array corresponds to index of option)
        activityItem.carbon = qty * activity.carbon[activity.option.findIndex(findOption => findOption[0] === option[0])]

        this.setState({
            summary: [...this.state.summary, activityItem]
        }, () => {
            // callback to do something with state
            // console.log(this.state.summary)
        })
    }

    getSummaryTotal = () => {
        let summaryArray = this.state.summary
        let co2Total = 0;

        if (summaryArray.length) {
            summaryArray.forEach(activity => {
                co2Total += round(activity.carbon);
            })
            return [co2Total]
        } else {
            return [0]
        }
    }

    submitEntry = () => {
        const token = this.state.token
        let summaryArray = this.state.summary

        summaryArray.map(activity => 
            activity.weekCommencing = this.state.weekCommencing)
        
        axios
            .post(localAPI + 'users/add-entry', summaryArray, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                console.log("submitted entry")
            })
            .catch(error => console.log(error))
    }

    render() {
        if (!this.state.activities) {
            return <p>Loading...</p>
        }
        const tabs = ['search', 'browse']
        return (
            <>
            <SubNav tabs={tabs} />
            <section className="activity-page">
                <div className="activities">
                    <h2>Add an activity</h2>
                    {this.state.categories.map(mapCategory =>
                    <div key={mapCategory[0]}>
                        <button className={`activities__collapsible ${mapCategory[1] ? "activities__active" : ""}`} 
                            onClick={() => {this.toggleCategoryClass(mapCategory)}}>
                            <h2>+ {mapCategory[0]}</h2>
                        </button>
                        <div className={mapCategory[1] ? "activities__content-expanded" : "activities__content-collapsed"}>
                            <ActivityTable activities={this.state.activities[mapCategory[0]]} addToSummary={this.addActivityToSummary}/>
                        </div>
                    </div>)}
                </div>
                <div className="act-summary">
                    <div className="act-summary__wrapper">
                        <div className="act-summary__header">
                            <p className="act-summary__title">Your carbon diary for</p>
                            <p className="act-summary__date">Week Commencing: 11/29/2021</p>
                        </div>
                        <SummaryTable summary={this.state.summary} totals={this.getSummaryTotal()}/>
                    </div>
                    <button className="act-summary__add-entry" onClick={this.submitEntry}>add entry</button>
                </div>
            </section>
        </>
        )
    }
}

export default Activities
