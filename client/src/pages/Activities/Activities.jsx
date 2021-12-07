import { Component } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';

import { localAPI } from '../../utils/apiUtils';
import { round, groupArrayBy, getWeekCommencing } from '../../utils/utils'

import SummaryTable from '../../components/SummaryTable/SummaryTable';
import SubNav from '../../components/SubNav/SubNav';
import './Activities.scss';
import Calendar from '../../components/Calendar/Calendar';
import BrowseActivities from '../../components/BrowseActivities/BrowseActivities';
import SearchActivities from '../../components/SearchActivities/SearchActivities';

export class Activities extends Component {

    state = {
        activities: null,
        categories: null,
        weekCommencing: getWeekCommencing(new Date()),
        summary: [],
        token: ''
    }

    componentDidMount = () => {
        let summaryFromSession = JSON.parse(sessionStorage.getItem('summary'))
        console.log(summaryFromSession)
        let token = sessionStorage.getItem('authToken')
        this.setState({
            token: token,
            summary: summaryFromSession || []
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

                this.setState({
                    activities: response1.data,
                    categories: categoriesArray
                }, () => {
                    // console.log(this.state)
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
                return [mapCategory[0], mapCategory[1]]
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
            console.log(this.state.summary)
            sessionStorage.setItem('summary', JSON.stringify(this.state.summary))
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
                this.setState({
                    summary: []
                }, () => {
                    sessionStorage.removeItem('summary')
                })
                console.log("submitted entry")
            })
            .catch(error => console.log(error))
    }

    setStartDate = (date) => {
        let weekCommencing = getWeekCommencing(date)
        this.setState({
            weekCommencing: weekCommencing
        })
    }

    render() {
        if (!this.state.activities) {
            return <p>Loading...</p>
        }
        const tabs = ['search', 'browse']
        return (
            <>
            {/* <SubNav page='activities' tabs={tabs} /> */}
            <section className="activity-page">
                <div className="activity-page__page-wrapper">
                    <Switch>
                        <Route path="/activities/browse">
                            <BrowseActivities
                                activities={groupArrayBy(this.state.activities, 'category')}
                                categories={this.state.categories}
                                toggleCategoryClass={this.toggleCategoryClass}
                                addActivityToSummary={this.addActivityToSummary} />
                        </Route>
                        <Route>
                            <SearchActivities  path='activities/search'
                                activities={this.state.activities}
                                categories={this.state.categories}
                                addActivityToSummary={this.addActivityToSummary}/>
                        </Route>
                    </Switch>
                </div>
                <div className="act-summary">
                    <div className="act-summary__wrapper">
                        <div className="act-summary__header">
                            <p className="act-summary__title">Your carbon diary for</p>
                            <p className="act-summary__date">Week Commencing: </p>
                            <Calendar startDate={this.state.weekCommencing} setStartDate={this.setStartDate} />
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
