// modules
import { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

// components
import SummaryTable from '../../components/SummaryTable/SummaryTable';
import Calendar from '../../components/Calendar/Calendar';
import BrowseActivities from '../../components/BrowseActivities/BrowseActivities';
import Loading from '../../components/Loading/Loading';

// utils
import { round, getWeekCommencing, epochToYYYYMMDD } from '../../utils/utils'
import { API_URL } from '../../config';

// styling
import './Activities.scss';

export class Activities extends Component {

    state = {
        activities: null,
        activitiesToDisplay: null,
        categories: null,
        weekCommencing: getWeekCommencing(new Date()),
        summary: [],
        token: null,
        loginPrompt: false,
        submitted: false,
    }

    componentDidMount = () => {
        // summary store in session storage, in case user not logged in
        let summaryFromSession = JSON.parse(sessionStorage.getItem('summary'))
        let token = sessionStorage.getItem('authToken')
        this.setState({
            token: token,
            summary: summaryFromSession || []
        })
        
        axios
            .all([
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
        activitiesToDisplayArr = this.state.activities.filter(activity => selectedCategories.includes(activity.category))

        this.setState({ 
            categories: newCategoryStates,
            activitiesToDisplay: activitiesToDisplayArr
        });
    };

    addActivityToSummary = (activity, qty, option) => {
        let activityItem = {};
        activityItem.activity = activity.activity
        // activity id stored in option array, used to identify correct record in db 
        activityItem.option = option
        activityItem.qty = qty

        // identify carbon emissions per unit for specific option (index in activity carbon array corresponds to index of option)
        activityItem.carbon = Number(activity.carbon[activity.option.findIndex(findOption => findOption[0] === option[0])])

        // check if activity already in summary, add quantity if so
        if (this.state.summary.find(summaryActivity => summaryActivity.option[1] === option[1])) {
            let newSummary = this.state.summary
            newSummary.find(summaryActivity => summaryActivity.option[1] === option[1]).qty += qty

            return (this.setState({
                summary: newSummary,
                submitted: false
            }, () => {
                // store summary in session storage in case user needs to log in, or browses away
                sessionStorage.setItem('summary', JSON.stringify(this.state.summary))
            }))
        }

        this.setState({
            summary: [...this.state.summary, activityItem],
            submitted: false
        }, () => {
            // store summary in session storage in case user needs to log in, or browses away
            sessionStorage.setItem('summary', JSON.stringify(this.state.summary))
        })
    }

    getSummaryTotal = () => {
        let summaryArray = this.state.summary
        let co2Total = 0;

        if (summaryArray.length) {
            summaryArray.forEach(activity => {
                co2Total += round(activity.qty * activity.carbon);
            })
            return [co2Total]
        } else {
            return [0]
        }
    }

    submitEntry = () => {
        const token = this.state.token
        if (!token) {
            return this.setState({
                loginPrompt: true
            })
        }

        let summaryArray = this.state.summary
        summaryArray.map(activity => 
            activity.weekCommencing = epochToYYYYMMDD(this.state.weekCommencing))
        
        axios
            .post(API_URL + '/users/add-entry', summaryArray, {
                headers: {Authorization: `Bearer ${token}`}
            })
            .then(() => {
                this.setState({
                    summary: [],
                    submitted: true
                }, () => {
                    sessionStorage.removeItem('summary')
                    console.log("Successfully submitted entry")
                })
            })
            .catch(error => console.log(error))
    }

    setStartDate = (date) => {
        let weekCommencing = getWeekCommencing(date)
        this.setState({
            weekCommencing: weekCommencing
        })
    }

    deleteFromSummary = (activityId) => {
        let newSummary = this.state.summary.filter(summaryItem => summaryItem.option[1] !== activityId)
        this.setState({
            summary: newSummary
        })
    }

    handleUpdateQty = (event, summaryItem) => {
        let newSummary = this.state.summary
 
        newSummary.find(summaryActivity => summaryActivity.option[1] === summaryItem.option[1]).qty = event.target.value

        return (this.setState({
            summary: newSummary,
            submitted: false
        }, () => {
            // store summary in session storage in case user needs to log in, or browses away
            sessionStorage.setItem('summary', JSON.stringify(this.state.summary))
        }))
    }

    // no extra functionality required for summary table on activities page
    saveQtyChanges = () => {}

    render() {
        if (!this.state.activities) {
            return (
                <section className="activity-page">
                    <div className="activity-page__loading-wrapper">
                        <div className="activity-page__loading">
                            <Loading />
                        </div>
                    </div>
                </section>
        )}

        return (
            <>
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
                                <button className="act-summary__add-entry" onClick={this.submitEntry}>Submit Entry</button>
                                {this.state.loginPrompt ? <p className="act-summary__login-prompt">please log in to submit an entry</p>
                                : <></> }
                            </div>
                        </div>
                        <div className="act-summary__summary-list-container">
                            <SummaryTable summary={this.state.summary} 
                                totals={this.getSummaryTotal()} 
                                handleDelete={this.deleteFromSummary} 
                                handleUpdateQty={this.handleUpdateQty}
                                saveQtyChanges={this.saveQtyChanges}/>
                            {this.state.submitted ? 
                            <div className="act-summary__submitted">
                                <p className="act-summary__submitted-text">entry submitted!</p>
                                <p className="act-summary__submitted-text">view in your <Link to="/"><span className="act-summary__link">dashboard</span></Link></p>
                                <p className="act-summary__submitted-text">or add an activity to submit another entry</p>
                            </div>
                            : <></> }
                        </div>
                    </div>
                </div>
            </section>
        </>
        )
    }
}

export default Activities
