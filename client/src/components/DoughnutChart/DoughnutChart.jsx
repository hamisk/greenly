import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { groupArrayBy } from '../../utils/utils';
import chroma from 'chroma-js';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ activityData }) {

    const userActsByCat = groupArrayBy(activityData, 'category')
    const categoryArray = [...new Set(activityData.map(activity => activity.category))]
    const categorySums = categoryArray.map(category => userActsByCat[category].reduce((a, b) => ({carbon: Number(a.carbon) + Number(b.carbon)}))).map(object => Number(object.carbon))
    const colors = chroma.scale(['red', 'blue', 'green']).colors(categoryArray.length)
    const opacity = colors.map(color => color + '99')

    const chartData = {
        labels: categoryArray,
        datasets: [
            {
                label: 'Dataset 1',
                data: categorySums,
                backgroundColor: opacity,
                hoverBackgroundColor: colors,
                borderColor: colors,
                borderWidth: 2,
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {position: 'right',},
            title: {
                display: true,
                text: 'Total Consumption by Category',
            },
        },
    };

    return (
        <div className="doughnut-chart">
            <Doughnut data={chartData} options={options} />
        </div>
    )
}

export default DoughnutChart
