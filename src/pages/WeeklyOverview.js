import React, { useEffect, useState } from 'react';
import { Client } from 'espn-fantasy-football-api';
import ChartComponent from '../components/boxScoreChart';
import { determineOwner } from '../components/teamowners';
import MatchupBoxes from '../components/MatchupBoxes';
import { calculateDefaultWeek } from '../components/WeekSelect';

export default function Home({ leagueId }) {
  const [weeklyMatchup, setWeeklyMatchup] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(calculateDefaultWeek);

  //To Comment Out
  let id = leagueId;
  const myClient = new Client({ leagueId: id });


  //End of comment out


  // Define the length of the season, from week 1 to 17. Single week playoffs
  const weekNumbers = Array.from({ length: 17 }, (_, index) => index + 1);

  // Function to handle dropdown selection change
  const handleWeekChange = (event) => {
    setSelectedWeek(parseInt(event.target.value, 10));
  };

  // Use useEffect to update the state after the component has rendered
  useEffect(() => {
    // Use the getTeamsAtWeek method to retrieve weekly games
    myClient.getBoxscoreForWeek({
      seasonId: 2023,
      matchupPeriodId: selectedWeek,
      scoringPeriodId: selectedWeek
    }).then((matchup) => {
      matchup.forEach((element, i) => {
        element.weekId = selectedWeek
        element.matchId = i
        if (element.homeScore > element.awayScore) {
          element.homeResult = 'Win' //Win
          element.awayResult = 'Loss' //Loss
        } else {
          element.homeResult = 'Loss' //Loss
          element.awayResult = 'Win' //Win
        }
        element.barColorHome = element.homeResult === 'Win' ? "Limegreen" : "Brown"
        element.barColorAway = element.awayResult === 'Win' ? "Limegreen" : "Brown"

        element.homeRoster.forEach((p) => {
          let sumProjectedPoints = 0
          for (const [key, value] of Object.entries(p.projectedPointBreakdown)) {
            if (typeof (value) === "number") {
              sumProjectedPoints += value
            }
          }
          p.projectedPoints = parseFloat(sumProjectedPoints.toFixed(1))
          p.delta = parseFloat((p.totalPoints - p.projectedPoints).toFixed(2))
          p.position = p.position === "RB/WR/TE" ? 'Flex' : p.position
        })

        element.awayRoster.forEach((p) => {
          let sumProjectedPoints = 0
          for (const [key, value] of Object.entries(p.projectedPointBreakdown)) {
            if (typeof (value) === "number") {
              sumProjectedPoints += value
            }
          }
          p.projectedPoints = parseFloat(sumProjectedPoints.toFixed(1))
          p.delta = parseFloat((p.totalPoints - p.projectedPoints).toFixed(2))
          p.position = p.position === "RB/WR/TE" ? 'Flex' : p.position
        })
        element.homeManager = determineOwner(leagueId, element.homeTeamId)
        element.awayManager = determineOwner(leagueId, element.awayTeamId)
      }
      );
      console.log(matchup);
      setWeeklyMatchup(matchup);
    });
  }, [leagueId, selectedWeek]);//update whenever leagueId or selectedWeek changes

  if (!weeklyMatchup) {
    return null;
  } else {
    return (
      <>
        <div className='selectWeek'>
          <label className="weekDropdownTitle">Select Week:  </label>
          <select id="weekDropdownBox" onChange={handleWeekChange} value={selectedWeek}>
            {weekNumbers.map((weekNumber) => (
              <option key={weekNumber} value={weekNumber}>Week #{weekNumber}</option>
            ))}
          </select>
        </div>
        <section>
          <MatchupBoxes boxscores={weeklyMatchup} />
        </section>
        <div className='matchupChart'>
          <ChartComponent boxscores={weeklyMatchup} />
        </div>
      </>
    );
  }
}