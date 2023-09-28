import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';


export default function MyTeam({ weeklyMatchup }) {
  console.log('Team Entry Data', weeklyMatchup);

  var combinedItems = []
  weeklyMatchup.forEach((item) => {
    // Create new objects for home and away items
    const homeItem = {
      score: item.homeScore,
      benchScore: item.homeBenchScore,
      result: item.homeResult,
      roster: item.homeRoster,
      manager: item.homeManager,
      matchId: item.matchId,
      weekId: item.weekId,
    };

    const awayItem = {
      score: item.awayScore,
      benchScore: item.awayBenchScore,
      result: item.awayResult,
      roster: item.awayRoster,
      manager: item.awayManager,
      matchId: item.matchId,
      weekId: item.weekId,
    };

    // Push the objects into the combined array
    combinedItems.push(homeItem);
    combinedItems.push(awayItem);
    combinedItems.sort((a, b) => b.score - a.score);
  });


  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    console.log('chartRef.current',!chartRef.current)
    if (combinedItems.length === 0) return;

    // Destroy the previous chart instance, if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    // Create the new chart

    const deltaValues = combinedItems[2].roster.map((p) => p.delta)
    console.log('deltaValues:' , deltaValues)
    const labels = combinedItems[2].roster.map((item) => item.player.fullName);

    const canvas = document.getElementById('teamPreformanceChart');
    chartRef.current = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Delta',
            data: deltaValues,
            backgroundColor: 'rgba(75, 192, 192, 1)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [weeklyMatchup]);


  console.log('Team Exit Data', combinedItems)
  return (
    <>
          <h1 style={{ textAlign: "center", color: "white" }}>Actual Preformance relative to Projected</h1>
          <h2 style={{ textAlign: "center", color: "white" }}>Test Data for {combinedItems[2].manager}/Week {combinedItems[2].weekId} </h2>
          <div style={{background: "rgba(0, 0, 0, .6)"}}>
            <canvas id="teamPreformanceChart" width="400" height="300"></canvas>
          </div>
    </>
  )
}