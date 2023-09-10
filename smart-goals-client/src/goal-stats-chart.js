import React, { useRef } from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import { formatDateString } from './utils/parseDate'

ChartJS.register(LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip)

export default function GoalStatsChart({ goal }) {
  const chartRef = useRef(null)

  const data = {
    labels: goal.stats.map((stat) => formatDateString(stat.measurementDate)),
    datasets: [
      {
        type: 'line',
        label: goal.description,
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        data: goal.stats.map((stat) => stat.measurementValue),
      },
      {
        type: 'bar',
        label: goal.description,
        backgroundColor: 'rgb(75, 192, 192)',
        data: goal.stats.map((stat) => stat.measurementValue),
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  }

  return <Chart ref={chartRef} type="bar" data={data} />
}
