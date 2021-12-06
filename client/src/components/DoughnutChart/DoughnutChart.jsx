import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { colorPaletteBoth, generateArrayOfColors, groupArrayBy } from '../../utils/utils';
import chroma from 'chroma-js';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ activityData }) {

    const userActsByCat = groupArrayBy(activityData, 'category')
    const categoryArray = [...new Set(activityData.map(activity => activity.category))]
    const categorySums = categoryArray.map(category => userActsByCat[category].reduce((a, b) => ({carbon: Number(a.carbon) + Number(b.carbon)}))).map(object => Number(object.carbon))
    const colors = chroma.scale(['orange', 'red', 'blue', 'green']).colors(categoryArray.length)
    const opacity = colors.map(color => color + '99')
    // const opacity = colors.map(color => chroma(color).alpha(0.2))

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

    // console.log("activityData")
    // console.log(activityData)
    // console.log("userActsByCat")
    // console.log(userActsByCat)
    // console.log("categoryArray")
    // console.log(categoryArray)
    // console.log("categorySums")
    // console.log(categorySums)
    // console.log(colors)
    // console.log(opacity)

    return (
        <div>
            <Doughnut data={chartData} />
        </div>
    )
}

export default DoughnutChart
