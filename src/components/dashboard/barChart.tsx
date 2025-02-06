"use client"; // Important pour Next.js App Router

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// 📌 Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  data: number[]; // Les données à afficher sur le graphique
  labels: string[]; // Les labels des axes X
}

const BarChartComponent: React.FC<BarChartProps> = ({ data, labels }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Evolution",
        data,
        backgroundColor: "rgba(59, 130, 246, 0.5)", // Bleu Tailwind (bg-blue-500)
        borderColor: "rgba(37, 99, 235, 1)", // Bleu Tailwind (border-blue-700)
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
    },
    scales: {
      y: {
        min: 0,
        max: 100, // Valeur maximale de 100 pour le pourcentage
        ticks: {
          stepSize: 10 // Échelle en pas de 10
        }
      }
    }
  };

  return (
    <div className="w-full mt-5 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg dark:bg-blue-950">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChartComponent;
