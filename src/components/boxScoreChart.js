import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function ChartComponent({ boxscores }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Destroy the previous chart instance, if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create the new chart
    const scores = boxscores.map((boxscore) => boxscore.score);
    const homeTeams = boxscores.map((boxscore) => boxscore.manager);

    const canvas = document.getElementById('boxscoreChart');
    
    Chart.defaults.font.size = 16;
    Chart.defaults.color = '#fff';
    chartRef.current = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: boxscores.map((_, index) => `${homeTeams[index]}`),
        datasets: [
          {
            label: 'Score',
            data: scores,
            backgroundColor: 'rgb(0, 184, 0)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [boxscores]);

  return (
    <div>
      <h2>Weekly Matchups</h2>
      <canvas id="boxscoreChart" width="400" height="200"></canvas>
    </div>
  );
}
