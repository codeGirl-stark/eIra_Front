"use client"; // Next.js App Router nécessite use client

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

// 📌 Enregistrement des composants nécessaires
ChartJS.register(ArcElement, Tooltip, Legend);

interface CircleChartProps {
  data: number[]; // Valeurs (ex: [40, 30, 20, 10])
  labels: string[]; // Catégories (ex: ["A", "B", "C", "D"])
  title: string; // Nom du graphe (ex: "Répartition des catégories")
  colors?: string[]; // Couleurs personnalisées (optionnel)
}

const CircleChart: React.FC<CircleChartProps> = ({ data, labels, colors, title }) => {
  const backgroundColors = colors || [
    "#3b82f6", // Bleu
    "#ef4444", // Rouge
    "#f59e0b", // Jaune
    "#10b981", // Vert
    "#a855f7", // Violet
    "#34d399", // Turquoise
    "#fb7185", // Roset
  ];

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: backgroundColors,
        hoverOffset: 10, // Décalage au survol
      },
    ],
  };

  // Calcul du total des données pour les pourcentages
  const total = data.reduce((acc, curr) => acc + curr, 0);

  // Personnalisation de la légende avec les pourcentages
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const, // Légende en bas
        labels: {
          // Customisation de la légende
          generateLabels: (chart :any) => {
            const labels = chart.data.labels as string[];
            const dataset = chart.data.datasets[0];
            return labels.map((label, i) => {
              const value = dataset.data[i];
              const percentage = ((value / total) * 100).toFixed(1); // Calcul du pourcentage
              return {
                text: `${label}: ${percentage}%`,
                fillStyle: dataset.backgroundColor[i], 
                // D'autres options de personnalisation ici si nécessaire
              };
            });
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(1); // Calcul %
            return `${labels[tooltipItem.dataIndex]}: ${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full mt-5 max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-blue-950">
      <h3 className="text-sm font-semibold text-gray-400 mb-4">{title}</h3>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default CircleChart;
