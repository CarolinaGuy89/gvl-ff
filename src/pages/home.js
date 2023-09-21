import React, { useEffect, useState } from 'react';
import { Client } from 'espn-fantasy-football-api';
//import CreateChart from '../components/boxScoreChart';
import ChartComponent from '../components/boxScoreChart';
import { determineOwner } from '../components/teamowners';

const chartCss = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'rgb(187, 255, 178)',
    FontSize: '18px'
}
//

export default function Home({ leagueId }) {
    const [weeklyMatchup, setWeeklyMatchup] = useState([]);
    const [teamScores, setTeamScores] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState(1);
    //Import from dkempen
    const [margin, setMargin] = useState([])
    const [win, setWin] = useState([])
    const [closestWinner, setClosestWinner] = useState('')
    const [closestLoser, setClosestLoser] = useState('')
    const [averageScore, setAverage] = useState(0)
    const [closest, setClosest] = useState('')
    const [minWinner, setMinWinner] = useState([]) // 0 = owner name, 1 = score
    const [maxLoser, setMaxLoser] = useState([]) // 0 = owner name, 1 = score
    const [beatMin, setBeatMin] = useState(0)
    const [loseMax, setLoseMax] = useState(0)
    //End import

    let id = leagueId;
    const myClient = new Client({ leagueId: id });

    // Define the length of the season, from week 1 to 17
    const weekNumbers = Array.from({ length: 17 }, (_, index) => index + 1);
    
    // Function to handle dropdown selection change
    const handleWeekChange = (event) => {
        setSelectedWeek(parseInt(event.target.value, 10));
    };

  useEffect(() => {
    // Use the getTeamsAtWeek method to retrieve weekly games
    myClient.getBoxscoreForWeek({ 
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
  }, [leagueId, selectedWeek]);//update whenever leagueId or selectedWeek changes
   // Use useEffect to update the state after the component has rendered
  var i = null;
  useEffect(() => {
      weeklyMatchup.forEach((element,i) => {
          if (element.homeScore > element.awayScore) {
            element.homeResult = 'LimeGreen' //Win
            element.awayResult = 'Brown' //Loss
          } else {
            element.homeResult = 'Brown' //Loss
            element.awayResult = 'LimeGreen' //Win
          }
        element.matchId = i
      })
    //Determine who owns which team
    weeklyMatchup.forEach(element => [
      element.homeManager = determineOwner(leagueId,element.homeTeamId),
      element.awayManager = determineOwner(leagueId,element.awayTeamId)
    ])
    
    // Update the state with the transformed array
    setTeamScores(weeklyMatchup);
    getWeeklyStats();
  }, [weeklyMatchup]); //Update whenever weeklyMatchup changes
  
  //Weekly Stats
function getWeeklyStats() {
  if (weeklyMatchup.homeScore !== null)  {

    // calculate the average points scored by team
    setAverage(0)
    let total = 0;
    weeklyMatchup.forEach(element => {
        total += (element.homeScore + element.awayScore)
    })
    setAverage(total / (weeklyMatchup.length*2))

    let closestIndex = 0; // Initialize the index of the closest match
    let closestDifference = Math.abs(weeklyMatchup[0].homeScore - weeklyMatchup[0].awayScore); // Initialize the difference
  
    for (let i = 1; i < weeklyMatchup.length; i++) {
      const difference = Math.abs(weeklyMatchup[i].homeScore - weeklyMatchup[i].awayScore);
  
      if (difference < closestDifference) {
        closestDifference = difference;
        closestIndex = i;
      }
    }
    setClosest(closestDifference);
    if (weeklyMatchup[closestIndex].homeScore > weeklyMatchup[closestIndex].awayScore) {
      setClosestWinner(weeklyMatchup[closestIndex].homeManager);
      setClosestLoser(weeklyMatchup[closestIndex].awayManager);
    } else {
      setClosestWinner(weeklyMatchup[closestIndex].awayManager);
      setClosestLoser(weeklyMatchup[closestIndex].homeManager);
    }
}}

  //End Paste




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
        <section className="stat-card-container">
                <div className="stat-card">
                    <div className="card-title">
                        <h3>Average Score</h3>
                    </div>
                    <p>The average total score for the week was {averageScore.toFixed(2)} points</p>
                </div>
                <div className="stat-card">
                    <div className="card-title">
                        <h3>Closest Game</h3> 
                    </div>
                    <p>{closestWinner} beat {closestLoser} by {closest.toFixed(2)} points</p>
                </div>
            </section>
      <div style={chartCss}>
        <ChartComponent boxscores = {teamScores} />
      </div>
      
    </>
  );
}
/*
<div className="stat-card">
                    <div className="card-title">
                        <h3>Highest Scoring Loser</h3> 
                    </div>
                    <p>{maxLoser[0]} scored {maxLoser[1]} points and lost <br/><br/> This was {(Math.abs(maxLoser[1] - averageScore)).toFixed(2)} points {parseInt(maxLoser[1]) > averageScore ? 'above' : 'below'} the average <br/><br/> They would have beat {loseMax} teams this week</p>
                </div>
                <div className="stat-card">
                    <div className="card-title">
                        <h3>Lowest Scoring Winner</h3>
                    </div>
                    <p>{minWinner[0]} scored {minWinner[1]} points and won <br/><br/> This was {(Math.abs(minWinner[1] - averageScore)).toFixed(2)} points {parseInt(minWinner[1]) > averageScore ? 'above' : 'below'} the average<br/><br/> They would have lost to {beatMin} teams this week</p>
                </div>
*/