import React, { useEffect, useState } from 'react';
import { Client } from 'espn-fantasy-football-api';
//import CreateChart from '../components/boxScoreChart';
import ChartComponent from '../components/boxScoreChart';
import { determineOwner } from '../components/teamowners';

const chartCss = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'rgb(187, 255, 178)'
}

export default function Home({ leagueId }) {
    const [weeklyMatchup, setWeeklyMatchup] = useState([]);
    const [teamScores, setTeamScores] = useState([]);
    let id = leagueId;
    const myClient = new Client({ leagueId: id });

    // Define the length of the season, from week 1 to 17
    const weekNumbers = Array.from({ length: 17 }, (_, index) => index + 1);
    const [selectedWeek, setSelectedWeek] = useState(1);
    
    // Function to handle dropdown selection change
    const handleWeekChange = (event) => {
        setSelectedWeek(parseInt(event.target.value, 10));
    };

  useEffect(() => {
    // Use the getTeamsAtWeek method to retrieve weekly games
    myClient
    .getBoxscoreForWeek({ 
        seasonId: 2023, 
        matchupPeriodId: selectedWeek, 
        scoringPeriodId: selectedWeek 
    }).then((matchup) => {
        matchup.forEach(element => {
        delete element.homeRoster
        delete element.awayRoster
    });

    setWeeklyMatchup(matchup);
    });
  }, [leagueId, selectedWeek]);

// Use useEffect to update the state after the component has rendered
useEffect(() => {
    // Use flatMap to transform the weeklyMatchup array
    const updatedTeamScores = weeklyMatchup.flatMap((element) => [
      { score: element.homeScore, teamId: element.homeTeamId},
      { score: element.awayScore, teamId: element.awayTeamId}
    ])
  
    updatedTeamScores.forEach(element => {
        element.manager = determineOwner(leagueId,element.teamId)
    })

    // Update the state with the transformed array
    setTeamScores(updatedTeamScores);
  }, [weeklyMatchup]); // Add weeklyMatchup as a dependency

  return (
    <>
        <div className='selectWeek-dropdown'>
            <label htmlFor="weekDropdown">Select Week:  </label>
            <select id="weekDropdown" onChange={handleWeekChange} value={selectedWeek}>
                {weekNumbers.map((weekNumber) => (
                    <option key={weekNumber} value={weekNumber}>Week #{weekNumber}</option>
                ))}
            </select>
        </div>

      <div style={chartCss}>
            <ChartComponent boxscores = {teamScores} />
      </div>
    </>
  );
}
