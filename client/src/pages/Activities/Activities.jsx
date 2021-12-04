import { Component } from 'react';
import axios from 'axios';

import { localAPI } from '../../utils/apiUtils';
import { round } from '../../utils/utils'
// import ActivityCard from '../../components/ActivityCard/ActivityCard';
import './Activities.scss';
import SummaryTable from '../../components/SummaryTable/SummaryTable';
import GroceryTable from '../../components/GroceryTable/GroceryTable';
import ActivityTable from '../../components/ActivityTable/ActivityTable';
import SubNav from '../../components/SubNav/SubNav';

export class Activities extends Component {

    state = {
        groceries: null,
        activities: null,
        categories: null,
        groceriesActive: false,
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
                axios.get(localAPI + "groceries"),
                axios.get(localAPI + "activities")
            ])
            // .get(localAPI + "footprints")
            .then(axios.spread((response1, response2) => {
                // console.log(response2.data)

                // array of unique category names to generate category buttons
                const categoryNames = [...new Set(response2.data.map(item => item.category))]
                // intialising button toggle to false for each category
                categoryNames.sort()
                const categoriesArray = categoryNames.map(category => [category, false])
                
                // console.log(categoriesArray)

                let groupedActivities = this.groupBy(response2.data, 'category')
                // console.log(groupedActivities)

                this.setState({
                    groceries: response1.data,
                    activities: groupedActivities,
                    categories: categoriesArray
                })
            }))
    }

    groupBy = (objectArray, property) => {
        return objectArray.reduce(function (acc, obj) {
            let key = obj[property]
            if (!acc[key]) {
                acc[key] = []
            }
            acc[key].push(obj)
            return acc
        }, {})
    }
    

    toggleClass = () => {
        const currentState = this.state.groceriesActive;
        this.setState({ groceriesActive: !currentState });
    };

    toggleCategoryClass = (category) => {
        const currentState = this.state.categories
        // finding toggle state of selected category and setting to opposite 
        const newState = currentState.map((mapCategory) => {
            if (mapCategory === category) {
                return [category[0], !category[1]]
            } else {
                return [mapCategory[0], false]
            }
        });
        this.setState({ categories: newState });
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

    addActivityToSummary = (activity, qty, option) => {
        let activityItem = {};
        // console.log(activity, qty, option)
        activityItem.activity = activity.activity
        activityItem.option = option
        activityItem.qty = qty
        
        // console.log(activity)
        activityItem.carbon = qty * activity.carbon[activity.option.findIndex(findOption => findOption[0] === option[0])]

        this.setState({
            summary: [...this.state.summary, activityItem]
        }, () => {
            // console.log(this.state.summary)
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

    submitEntry = () => {
        // console.log(this.state.summary)
        const token = this.state.token
        console.log(token)
        let summaryArr = this.state.summary

        summaryArr.map(activity => 
            activity.weekCommencing = this.state.weekCommencing)
        
        console.log(summaryArr)
        axios
            .post(localAPI + 'users/add-entry', summaryArr, {
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

                    <button className={`activities__collapsible ${this.state.groceriesActive ? "activities__active" : ""}`} 
                        onClick={this.toggleClass}>
                        <h2>+ groceries</h2>
                    </button>
                    <div className={this.state.groceriesActive ? "activities__content-expanded" : "activities__content-collapsed"}>
                        <GroceryTable groceries={this.state.groceries} addToSummary={this.addToSummary}/>
                    </div>

                    {this.state.categories.map(mapCategory =>
                    <div key={mapCategory[0]}>
                    {/* <button className={`activities__collapsible ${this.state.categories.find(findCategory => findCategory === mapCategory)[1] ? "activities__active" : ""}`}  */}
                    <button className={`activities__collapsible ${mapCategory[1] ? "activities__active" : ""}`} 
                    onClick={() => {
                        this.toggleCategoryClass(mapCategory)}}>
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
