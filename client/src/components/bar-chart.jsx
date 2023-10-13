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

export default function BarChart({ title, label, labels, data: chartData }) {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        type: "bar",
        label,
        backgroundColor: "rgb(75, 192, 192)",
        data: chartData,
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  return <Chart type="bar" data={data} options={options} />;
}
