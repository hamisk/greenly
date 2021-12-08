import axios from 'axios';
import { Component } from 'react'
// import { v4 } from 'uuid';
import './Dashboard.scss';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { epochToMMDDYYYY, epochToYYYYMMDD, getWeekCommencing, groupArrayBy, round } from '../../utils/utils';
import DoughnutChart from '../../components/DoughnutChart/DoughnutChart';
import { API_URL } from '../../config';
import Loading from '../../components/Loading/Loading';
import SummaryTable from '../../components/SummaryTable/SummaryTable';
  
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
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Weekly Consumption',
        },
    },
    scales: {
        x: {
            grid: {
                display:false
                }
            },
        y: {
            grid:{
                display:false
            }
        }
    }
};
  
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [124, 235, 18, 217, 93, 147, 93],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [124, 23, 54, 217, 175, 312, 83],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
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
                    axios.get(API_URL + '/users/get-activities', 
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
                        // console.log(this.state.userActivities)
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
        // console.log(userActsArray)

        // array of unique week_commencing values
        const WCArray = [...new Set(userActsArray.map(activity => activity.week_commencing))]
        // console.log(WCArray)
        const WCChartLabels = WCArray.map(date => date.toString())
        // console.log(WCChartLabels)
        
        // group userActivities by week commencing
        const userActsByWC = groupArrayBy(userActsArray, 'week_commencing')
        // console.log(userActsByWC)

        const carbonSums = WCArray.map(WC => userActsByWC[WC].reduce((a, b) => ({carbon: Number(a.carbon) + Number(b.carbon)}))).map(object => object.carbon)
        // console.log(carbonSums)
        
        const chartData = {
            labels: WCChartLabels,
            datasets: [
                {
                    label: 'Dataset 1',
                    data: carbonSums,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
        console.log(weekCommencing)
        const weekActivities = this.state.userActivities.filter(activity => activity.week_commencing === weekCommencing)
        console.log(weekActivities)
        let weekSummary = []
        weekActivities.forEach(element => weekSummary.push({  
            activity: element.activity,
            carbon: Number(element.carbon_used),
            option: [element.option_used, element.activity_id],
            qty: element.qty_used
        }))
        
        // console.log(weekSummary)

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
    
    render() {
        if (!this.state.chartTwo) {
            return null
        }

        const { isLoading, userActivities, weekSummary } = this.state
        return (
            <>
                {(isLoading || !userActivities.length || !this.state.chartTwo || !weekSummary) ? 
                <section className="dashboard-load">
                    <div className="dashboard-load__loading">
                        <Loading />
                    </div>
                </section>
                :
                (<section className="dashboard">
                    <div className="dashboard__chart">
                        <Bar options={options} data={data} />
                    </div>
                    <div className="dashboard__chart">
                        <SummaryTable summary={this.state.weekSummary} totals={(this.getSummaryTotal())}/>
                    </div>
                    <div className="dashboard__chart">
                        <DoughnutChart activityData={this.state.userActivities}/>
                    </div>
                    <div className="dashboard__chart">
                        <Bar options={options} data={this.state.chartTwo} />
                    </div>
                    
                </section>
                
                )}
            </>
        )
    }
}

export default Dashboard;
