"use client"; // Obligatoire pour Next.js App Router

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// 📌 Enregistrement des composants nécessaires de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: number[]; // Données Y (Valeurs du graphique)
  title: string; // Nom du graphe (ex: "Répartition des catégories")
  labels: string[]; // Données X (Labels du graphique)
}

const LineChart: React.FC<LineChartProps> = ({ data, labels, title }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Évolution",
        data,
        borderColor: "rgba(59, 130, 246, 1)", // Bleu Tailwind (border-blue-500)
        backgroundColor: "rgba(59, 130, 246, 0.2)", // Transparence
        borderWidth: 2,
        pointBackgroundColor: "rgba(37, 99, 235, 1)", // Bleu Tailwind (point-blue-700)
        tension: 0.3, // Lissage de la courbe
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
    <div className="w-full mt-5 max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-blue-950">
      <h3 className="text-sm font-semibold text-gray-400 mb-4">{title}</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
