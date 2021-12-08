import { Component } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';

import { localAPI } from '../../utils/apiUtils';
import { round, groupArrayBy, getWeekCommencing } from '../../utils/utils'

import SummaryTable from '../../components/SummaryTable/SummaryTable';
import SubNav from '../../components/SubNav/SubNav';
import Calendar from '../../components/Calendar/Calendar';
import BrowseActivities from '../../components/BrowseActivities/BrowseActivities';
import SearchActivities from '../../components/SearchActivities/SearchActivities';
import { API_URL } from '../../config';
import './Activities.scss';

export class Activities extends Component {

    state = {
        activities: null,
        activitiesToDisplay: null,
        categories: null,
        weekCommencing: getWeekCommencing(new Date()),
        summary: [],
        token: null,
        loginPrompt: false
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
                // axios.get(localAPI + "activities")
                axios.get(API_URL + "/activities")
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

        let activitiesToDisplayArr = []
        const currentCategoryStates = this.state.categories
        const newCategoryStates = currentCategoryStates.map((mapCategory) => {
            if (mapCategory === category) {
                // find toggle state of selected category and setting to opposite 
                return [category[0], !category[1]]
            } else {
                return [mapCategory[0], mapCategory[1]]
            }
        });
        const selectedCategories = newCategoryStates.filter(category => category[1]).map(category => category[0])
        // console.log(selectedCategories)
        activitiesToDisplayArr = this.state.activities.filter(activity => selectedCategories.includes(activity.category))
        // console.log(activitiesToDisplayArr)
        this.setState({ 
            categories: newCategoryStates,
            activitiesToDisplay: activitiesToDisplayArr
        });
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
        console.log(token)
        if (!token) {
            return this.setState({
                loginPrompt: true
            })
        }

        let summaryArray = this.state.summary

        summaryArray.map(activity => 
            activity.weekCommencing = this.state.weekCommencing)
        
        axios
            // .post(localAPI + 'users/add-entry', summaryArray, {
            .post(API_URL + '/users/add-entry', summaryArray, {
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
                        <Route path="/activities">
                            <BrowseActivities
                                activities={this.state.activitiesToDisplay}
                                categories={this.state.categories}
                                toggleCategoryClass={this.toggleCategoryClass}
                                addActivityToSummary={this.addActivityToSummary} />
                        </Route>
                    </Switch>
                </div>
                <div className="activity-page__page-wrapper">
                    <div className="act-summary">
                        <div className="act-summary__left-wrapper">
                            <h3 className="act-summary__title">Activity summary</h3>
                            <div className="act-summary__calendar-submit-wrapper">
                                <div className="act-summary__calendar-wrapper">
                                    <p className="act-summary__calendar-text">Week Commencing:</p>
                                    <div className="act-summary__calendar">
                                        <Calendar startDate={this.state.weekCommencing} setStartDate={this.setStartDate} />
                                    </div>
                                </div>
                                <button className="act-summary__add-entry" onClick={this.submitEntry}>submit entry</button>
                                {this.state.loginPrompt ? <p className="act-summary__login-prompt">please log in to submit an entry</p>
                                : <></> }
                            </div>
                        </div>
                        <div className="act-summary__summary-list-container">
                            <SummaryTable summary={this.state.summary} totals={this.getSummaryTotal()}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
        )
    }
}

export default Activities
