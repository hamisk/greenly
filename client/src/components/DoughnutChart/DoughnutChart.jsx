import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { colorPaletteBoth, generateArrayOfColors, groupArrayBy } from '../../utils/utils';
import chroma from 'chroma-js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

function DoughnutChart({ activityData }) {

    const userActsByCat = groupArrayBy(activityData, 'category')
    const categoryArray = [...new Set(activityData.map(activity => activity.category))]
    const categorySums = categoryArray.map(category => userActsByCat[category].reduce((a, b) => ({carbon: Number(a.carbon) + Number(b.carbon)}))).map(object => Number(object.carbon))
    const colors = chroma.scale(['orange', 'red', 'blue', 'green']).colors(categoryArray.length)
    const opacity = colors.map(color => color + '99')
    // const opacity = colors.map(color => chroma(color).alpha(0.2))
    
    // const colors = generateArrayOfColors(categoryArray.length)
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

    console.log("activityData")
    console.log(activityData)
    console.log("userActsByCat")
    console.log(userActsByCat)
    console.log("categoryArray")
    console.log(categoryArray)
    console.log("categorySums")
    console.log(categorySums)
    console.log(colors)
    console.log(opacity)



    return (
        <div>
            <Doughnut data={chartData} />
        </div>
    )
}

export default DoughnutChart
