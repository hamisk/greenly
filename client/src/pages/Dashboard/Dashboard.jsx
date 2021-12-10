import axios from 'axios';
import { Component } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { epochToYYYYMMDD, getWeekCommencing, groupArrayBy, round} from '../../utils/utils';
import DoughnutChart from '../../components/DoughnutChart/DoughnutChart';
import { API_URL } from '../../config';
import Loading from '../../components/Loading/Loading';
import SummaryTable from '../../components/SummaryTable/SummaryTable';
import ProgressChart from '../../components/ProgressChart/ProgressChart';
import './Dashboard.scss';
import Calendar from '../../components/Calendar/Calendar';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
  
export const options = {
    responsive: true,
    plugins: {
        legend: {position: 'top',},
        title: {
            display: true,
            text: 'Weekly Consumption Over Time',
        },
    },
    scales: {x: {grid: {display:false}},
            y: {grid:{display:false}}
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
        userProfile: ''
    }

    componentDidMount() {
        let token = sessionStorage.getItem('authToken')

        if (!!token) {
            axios
                .all([
                    axios.get(API_URL + '/users/get-activities', 
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }),
                    axios.get(API_URL + '/users/profile', 
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                ])
                .then(axios.spread((response1, response2) => {
                    this.setState({
                        userActivities: response1.data,
                        userProfile: response2.data,
                        isLoading: false
                    }, () => {
                        this.getData()
                        this.getWeekSummary()
                    })
                }))
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

        const carbonSums = WCArray.map(WC => userActsByWC[WC].reduce((a, b) => ({carbon: Number(a.carbon) + Number(b.carbon)}))).map(object => object.carbon)
        
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
            qty: element.qty_used
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
                co2Total += round(activity.carbon);
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

    deleteUserActivity = () => {}
    
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
                                <p className="dashboard__calendar-text">Week Commencing:</p>
                                <div className="dashboard__calendar">
                                    <Calendar startDate={this.state.weekCommencing} setStartDate={this.setStartDate} />
                                </div>
                            </div>
                            <ProgressChart target={Math.round(userProfile.goal_carbon / 52)} total={(this.getSummaryTotal())} />
                        </div>
                        <div className="dashboard__table">
                            <SummaryTable summary={this.state.weekSummary} totals={(this.getSummaryTotal())} delete={this.deleteUserActivity}/>
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
