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
    let highestPoints = 0
    let lowestPoints = 0

    // const data = {
    //   deltaValues: combinedItems[index].roster.map((p) => p.delta),
    //   projectedPoints: combinedItems[index].roster.map((p) => p.player.projectedPoints),
    //   totalPoints: combinedItems[index].roster.map((p) => p.player.totalPoints)
    // };

    const deltaValues = combinedItems[index].roster.map((p) => p.delta)
    const labels = combinedItems[index].roster.map((p) => p.player.fullName);
    const projectedPoints = combinedItems[index].roster.map((p) => p.player.projectedPoints);
    const totalPoints = combinedItems[index].roster.map((p) => p.player.totalPoints);
    const barColor = combinedItems[index].roster.map((p) => p.chartColor);
    combinedItems[index].roster.forEach((p) => {
      if (p.delta > highestPoints) {
        highestPoints = p.delta
      } else if (p.delta < lowestPoints) {
        lowestPoints = p.delta
      }
    })
    console.log('highestPoints', highestPoints)
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
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              beforeLabel: function (p) {
                const dataindex = p.dataIndex;
                const pPts = combinedItems[index].roster[dataindex].projectedPoints
                const tPts = combinedItems[index].roster[dataindex].totalPoints
                return (
                  `Actual:  ${tPts.toFixed(2)}
Projected: ${pPts.toFixed(2)}`
                )
              },
              afterLabel: function (p) {
                const dataindex = p.dataIndex;
                const pPts = combinedItems[index].roster[dataindex].projectedPoints
                const tPts = combinedItems[index].roster[dataindex].totalPoints
                const ePts = (tPts - pPts) / pPts * 100
                return `Error: ${ePts.toFixed(0)}%`
              }
            }
          }
        },
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            min: lowestPoints,
            max: highestPoints,
            grid: {
              color: 'White'
            }
          },
          y: {
            grid: {
              color: 'Grey',
              tickLength: 0
            }
          }
        },
      },
    });
  }, [weeklyMatchup, selectedManager]);


  console.log('Team Exit Data', combinedItems)

  if (weeklyMatchup === undefined) {
    return 'If you are reading this you might need to select a league.';
  } else {
    return (
      <>
        <h2 className="teamOverviewHeader">Players preformance compared to their projections.</h2>
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
        <div className="teamOverviewChart">
          <canvas id="teamPreformanceChart" width="400" height="500"></canvas>
        </div>
      </>
    )
  }
}