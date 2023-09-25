import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { formatDate } from "../utils/formatDate";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
);

export default function GoalStatsChart({ goal }) {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: goal.description,
      },
    },
  };

  const data = {
    labels: goal.measuredStats.map((stat) => formatDate(stat.measurementDate)),
    datasets: [
      {
        type: "bar",
        label: `measured ${goal.interval}`,
        backgroundColor: "rgb(75, 192, 192)",
        data: goal.measuredStats.map((stat) => stat.measurementValue),
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  return <Chart type="bar" data={data} options={options} />;
}
