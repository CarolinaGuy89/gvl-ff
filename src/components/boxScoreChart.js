import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function ChartComponent({ boxscores }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Destroy the previous chart instance, if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    Chart.defaults.font.size = 14;
    Chart.defaults.color = '#fff';
    
    // Create the new chart
    //const matchId = boxscores.map((boxscore) => boxscore.matchId);
    const homeScore = boxscores.map((boxscore) => boxscore.homeScore);
    const homeResult = boxscores.map((boxscore) => boxscore.barColorHome);
    const homeManager = boxscores.map((boxscore) => boxscore.homeManager);
    const homeLabel = boxscores.map((boxscore) =>boxscore.homeResult === "Win" ? "Winner" : 'Loser');
    const awayScore = boxscores.map((boxscore) => boxscore.awayScore);
    const awayResult = boxscores.map((boxscore) => boxscore.barColorAway);
    const awayManager = boxscores.map((boxscore) => boxscore.awayManager);
    const awayLabel = boxscores.map((boxscore) =>boxscore.awayResult === "Win" ? "Winner" : 'Loser');

    const canvas = document.getElementById('boxscoreChart');
    chartRef.current = new Chart(canvas, {
      type: 'bar',
      grouped: true,
      data: {
        labels: boxscores.map((_, index) => [`${homeManager[index]} vs. ${awayManager[index]}`]),
        datasets: [
          {
            label: 'Loser',
            data: homeScore,
            backgroundColor: homeResult,
            borderWidth: 1,
          },
          {
            label: 'Winner',
            data: awayScore,
            backgroundColor: awayResult,
            borderWidth: 1,
          },
        ],
      },
      options: {       
        plugins: {
          tooltip: {
              callbacks: {
                label: function(context) {
                    // Customize tool tip labels based on the dataset index                    
                    const labelIndex = context.dataIndex;
                    const datasetIndex = context.datasetIndex;
                    if (datasetIndex === 0) {
                      return `${homeLabel[labelIndex]}: ${homeScore[labelIndex]}`;
                    } else if (datasetIndex === 1) {
                      return `${awayLabel[labelIndex]}: ${awayScore[labelIndex]}`;
                    }                    
                  },
                  beforeLabel: function(context){
                  // Customize tool tip titles based on the dataset index
                  const labelIndex = context.dataIndex;
                  const datasetIndex = context.datasetIndex;
                  if (datasetIndex === 0) {
                    return `${homeManager[labelIndex]}`;
                  } else if (datasetIndex === 1) {
                    return `${awayManager[labelIndex]}`;
                  }
                }
              }
          },
          legend: {display: false,
          },
      },
        indexAxis: 'x',
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              lineWidth: 2,
              color: 'rgba(255, 255, 255, 1)'
            }
            }
          },
        },
    });
  }, [boxscores]);








/*    const scores = boxscores.map((boxscore) => boxscore.score);
    const teamManager = boxscores.map((boxscore) => boxscore.manager);
    const resultColor = boxscores.map((boxscore) => boxscore.result);

    const canvas = document.getElementById('boxscoreChart');
    

    chartRef.current = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: boxscores.map((_, index) => `${teamManager[index]}`),
        datasets: [
          {
            label: 'Score',
            data: scores,
            backgroundColor: resultColor,
            borderWidth: 1,
          },
        ],
      },
      options: {
        layout: {
          padding: {
            right: 200
          }
        },
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [boxscores]);
*/
  return (
    <div>
      <h2>Weekly Matchups</h2>
      <canvas id="boxscoreChart" width="400" height="200"></canvas>
    </div>
  );
}
