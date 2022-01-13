// modules
import { Component } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

// utils
import { epochToYYYYMMDD, getWeekCommencing, groupArrayBy, round} from '../../utils/utils';
import { API_URL } from '../../config';

// components
import DoughnutChart from '../../components/DoughnutChart/DoughnutChart';
import ProgressChart from '../../components/ProgressChart/ProgressChart';
import SummaryTable from '../../components/SummaryTable/SummaryTable';
import Calendar from '../../components/Calendar/Calendar';
import Loading from '../../components/Loading/Loading';

// styles
import './Dashboard.scss';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.defaults.plugins.title.font.size = 16
ChartJS.defaults.plugins.title.font.weight = 400

export const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: {display:false},
        title: {
            display: true,
            text: 'Weekly Consumption Over Time',
            padding: {bottom: 24},
            font: {weight: 'bold'}  
        },
    },
    scales: {x: {grid: {display:false}, title: {text:"Week Commencing", display:true} },
            y: {grid:{display:false}, title: {text:"CO2e (kg)", display:true}}
    }
};

class Dashboard extends Component {
    state = {
        isLoading: true,
        userActivities: [],
        weekCommencing: getWeekCommencing(new Date()),
        weekSummary: null,
        chartTwo: null,
        chartTwoLabels: [],
        userProfile: '',
        token: null
    }

    componentDidMount() {
        let token = sessionStorage.getItem('authToken')

        if (!!token) {
            axios
                .all([
                    axios.get(API_URL + '/users/get-activities', 
                        {headers: {Authorization: `Bearer ${token}`}}),
                    axios.get(API_URL + '/users/profile', 
                        {headers: {Authorization: `Bearer ${token}`}})
                ])
                .then(axios.spread((response1, response2) => {
                    this.setState({
                        userActivities: response1.data,
                        userProfile: response2.data,
                        isLoading: false,
                        token: token
                    }, () => {
                        this.getData()
                        this.getWeekSummary()
                    })
                }))
                .catch(err => {
                    console.log(err)
                })
        } else {
            this.props.history.push('/login')
        }
    }

    getData() {
        // truncate date on userActivities array
        let userActsArray = this.state.userActivities
        userActsArray.forEach(activity => activity.week_commencing = activity.week_commencing.toString().slice(0,10))

        // array of unique week_commencing values
        const WCArray = [...new Set(userActsArray.map(activity => activity.week_commencing))].sort()
        const WCChartLabels = WCArray.map(date => date.toString())
        
        // group userActivities by week commencing
        const userActsByWC = groupArrayBy(userActsArray, 'week_commencing')

        const carbonSums = WCArray.map(WC => userActsByWC[WC].reduce((a, b) => ({carbon: Number(a.carbon) + Number(b.carbon)}))).map(object => Math.round(object.carbon * 10) / 10)
        
        const chartData = {
            labels: WCChartLabels,
            datasets: [
                {
                    label: 'CO2e',
                    data: carbonSums,
                    backgroundColor: '#2F8D31',
                }
            ]
        }
        
        this.setState({
            chartTwo: chartData,
            chartTwoLabels: WCChartLabels
        })
    }

    getWeekSummary = () => {
        const weekCommencing = epochToYYYYMMDD(this.state.weekCommencing).toString().slice(0,10)
        const weekActivities = this.state.userActivities.filter(activity => activity.week_commencing === weekCommencing)
        let weekSummary = []
        weekActivities.forEach(element => weekSummary.push({  
            activity: element.activity,
            carbon: Number(element.carbon_used),
            option: [element.option_used, element.activity_id],
            qty: element.qty_used,
            userActivityId: element.id
        }))

        this.setState({
            weekSummary: weekSummary,
        })
    }

    getSummaryTotal = () => {
        let summaryArray = this.state.weekSummary
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

    setStartDate = (date) => {
        let weekCommencing = getWeekCommencing(date)
        this.setState({
            weekCommencing: weekCommencing
        }, () => {
            this.getWeekSummary()
        })
    }

    deleteUserActivity = (userActivityId) => {
        axios
            .delete(API_URL + '/users/delete-user-activity/' + userActivityId, {
                headers: {Authorization: `Bearer ${this.state.token}`}
            })
            .then(() => {
                axios
                    .get(API_URL + '/users/get-activities', 
                        {headers: {Authorization: `Bearer ${this.state.token}`}
                        })
                    .then(response => {
                        this.setState({
                            userActivities: response.data
                        }, () => {
                            this.getData()
                            this.getWeekSummary()
                        })
                    })

            })
            .catch(error => console.log(error))
    }

    handleUpdateQty = (event, summaryItem) => {

        let newSummary = this.state.weekSummary
        newSummary.find(summaryActivity => summaryActivity.option[1] === summaryItem.option[1]).qty = event.target.value

        return (this.setState({
            weekSummary: newSummary,
        }))
    }

    updateActivityQtys = () => {
        // submit qty changes to database
        axios
            .put(API_URL + '/users/update-user-activity-qtys', this.state.weekSummary, {
                headers: {Authorization: `Bearer ${this.state.token}`}
            })
            .then(res => {
                console.log(res)
            })
    }
    
    render() {
        if (!this.state.chartTwo) {
            return null
        }

        const { isLoading, userActivities, weekSummary, userProfile } = this.state
        return (
            <>
                {(isLoading || !userActivities.length || !this.state.chartTwo || !weekSummary) ? 
                <section className="dashboard-load">
                    <p>Please log an activity to view your dashboard</p>
                    <div className="dashboard-load__loading">
                        <Loading />
                    </div>
                </section>
                :
                (<section className="dashboard">
                    <div className="dashboard__row">
                        <div className="dashboard__one-week">
                            <div className="dashboard__calendar-wrapper">
                                <p className="dashboard__calendar-text">Carbon Target For Week Commencing</p>
                                <div className="dashboard__calendar">
                                    <Calendar startDate={this.state.weekCommencing} setStartDate={this.setStartDate} />
                                </div>
                            </div>
                            <ProgressChart target={Math.round(userProfile.goal_carbon / 52)} total={Math.round(this.getSummaryTotal()[0])} />
                        </div>
                        <div className="dashboard__table">
                            <p className="dashboard__table-sub">Logged Activities</p>
                            <SummaryTable summary={this.state.weekSummary} 
                                totals={(this.getSummaryTotal())} 
                                handleDelete={this.deleteUserActivity} 
                                handleUpdateQty={this.handleUpdateQty}
                                saveQtyChanges={this.updateActivityQtys}/>
                        </div>
                        
                    </div>
                    <div className="dashboard__row">
                        <div className="dashboard__consumption-over-time">
                            <Bar options={options} data={this.state.chartTwo} />
                        </div>
                        <div className="dashboard__doughnut">
                            <DoughnutChart activityData={this.state.userActivities}/>
                        </div>
                    </div>
                    
                </section>
                
                )}
            </>
        )
    }
}

export default Dashboard;
