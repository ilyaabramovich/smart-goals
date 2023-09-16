import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'
import React, { useRef } from 'react'
import { Chart } from 'react-chartjs-2'
import { formatDate } from '../utils/formatDate'

ChartJS.register(LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip)

export default function GoalStatsChart({ goal }) {
  const chartRef = useRef(null)

  const data = {
    labels: goal.measuredStats.map((stat) => formatDate(stat.measurementDate)),
    datasets: [
      {
        type: 'bar',
        label: goal.description,
        backgroundColor: 'rgb(75, 192, 192)',
        data: goal.measuredStats.map((stat) => stat.measurementValue),
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  }

  return <Chart ref={chartRef} type="bar" data={data} />
}
