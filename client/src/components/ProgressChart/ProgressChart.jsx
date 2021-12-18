
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend);
  
const chartOptions = {
    indexAxis: 'y',
    responsive: true,
    title: {
        display: true,
        text: "This Week's Progress",
    },
    scales: {
      x: { stacked: true, grid: {display:false}, title: {text:"CO2e (kg)", display:true} },
      y: { stacked: true, grid: {display:false} }
    }
};
const labels = ["Usage"]
const green = '#00800099'
const red = '#80000099'
const greener = '#45C04599'



function ProgressChart({ target, total }) {
    let data = {
        labels,
        datasets: [
            {
                label: 'Used',
                data: [total],
                backgroundColor: green,  
            },
            {
                label: 'Remaining',
                data: [target - total],
                backgroundColor: greener,  
            }
        ]
    }
    if (total > target) {
        data = {
            labels,
            datasets: [
                {
                    label: 'Target',
                    data: [target],
                    backgroundColor: green,  
                },
                {
                    label: 'Over By',
                    data: [total - target],
                    backgroundColor: red,  
                }
            ]
        }
    }

    return (
        <div>
            <Bar options={chartOptions} data={data} />
        </div>
    )
}

export default ProgressChart
