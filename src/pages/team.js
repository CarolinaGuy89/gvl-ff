import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';



export default function MyTeam({ weeklyMatchup }) {
  console.log('Team Entry Data', weeklyMatchup);
  const [selectedManager, setSelectedManager] = useState('');

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

    //Extract manager names for selection box
    const managerNames = combinedItems.map((item) => item.manager);
    let index = combinedItems.findIndex((item) => item.manager === selectedManager);
    const handleDropdownChange = (event) => {
      setSelectedManager(event.target.value);
    };
  
  // Custom sorting of the player rosters
  const positionOrder = ['QB', 'RB', 'WR', 'TE', 'Flex', 'D/ST', 'K', 'Bench', 'IR'];

  // Get the position index based on positionOrder
  function getPositionIndex(position) {
    const index = positionOrder.indexOf(position);
    return index === -1 ? positionOrder.length : index;
  }
  

  // Sort each roster within combinedItems
  combinedItems.forEach((team) => {
    team.roster.sort((a, b) => {
      const indexA = getPositionIndex(a.position);
      const indexB = getPositionIndex(b.position);
    // Sort by the custom order index
      return indexA - indexB;
    });
  });

  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (combinedItems.length === 0) return;

    // Destroy the previous chart instance, if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

      if (index == -1) {
        index += 1
      }
      let highestPoints = -Infinity
      let lowestPoints = Infinity
      const deltaValues = combinedItems[index].roster.map((p) => p.delta)
      const labels = combinedItems[index].roster.map((p) => p.player.fullName);
      const barColor = combinedItems[index].roster.map((p) => p.chartColor);
      combinedItems[index].roster.forEach((p) => {
        if (p.delta > highestPoints) {
          highestPoints = p.delta
        } else if (p.delta < lowestPoints) {
          lowestPoints = p.delta
        }
      })
      console.log('highestPoints',highestPoints)
    const canvas = document.getElementById('teamPreformanceChart');
    chartRef.current = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Delta',
            data: deltaValues,
            backgroundColor: barColor,
            borderColor: barColor,
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            min: -20,
            max: highestPoints,
          },
        },
      },
    });
  }, [weeklyMatchup, selectedManager]);


  console.log('Team Exit Data', combinedItems)
  return (
    <>
      <p style={{ textAlign: "left", color: "white" }}>Bars indicate the delta between projected scores to actual scores.</p>
      <div>
        <label style={{ textAlign: "center", color: "white" }}>Select Team Manager:</label>
        <select className="weekDropdownBox" onChange={handleDropdownChange} value={selectedManager}>
          {managerNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ background: "rgba(0, 0, 0, .6)" }}>
        <canvas id="teamPreformanceChart" width="400" height="500"></canvas>
      </div>
    </>
  )
}