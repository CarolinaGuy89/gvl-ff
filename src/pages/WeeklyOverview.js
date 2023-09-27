import React, { useEffect, useState } from 'react';
import ChartComponent from '../components/boxScoreChart';
import MatchupBoxes from '../components/MatchupBoxes';
import { calculateDefaultWeek } from '../components/WeekSelect';
import { getBoxscoreForWeek } from '../components/getAPIData';

export default function Home({ leagueId }) {
  const [weeklyMatchup, setWeeklyMatchup] = useState();
  const [selectedWeek, setSelectedWeek] = useState(calculateDefaultWeek);

  // Define the length of the season, from week 1 to 17. Single week playoffs
  const weekNumbers = Array.from({ length: 17 }, (_, index) => index + 1);

  // Function to handle dropdown selection change
  const handleWeekChange = (event) => {
    setSelectedWeek(parseInt(event.target.value, 10));
  };

  // Use useEffect to update the state after the component has rendered
  useEffect(() => {
    getBoxscoreForWeek(leagueId,selectedWeek).then((matchup) => {
      // console.log('matchup: ', matchup);
      setWeeklyMatchup(matchup);
    })}, [leagueId, selectedWeek]);//Request new Data at change of League or week


//console.log('weeklyMatchup: ', weeklyMatchup);
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

