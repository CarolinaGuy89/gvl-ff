import React, { useEffect, useState } from 'react';
import ChartComponent from '../components/boxScoreChart';
import MatchupBoxes from '../components/MatchupBoxes';
import { calculateDefaultWeek } from '../components/WeekSelect';
import { getBoxscoreForWeek } from '../components/getAPIData';
import { WeekSelector } from '../components/WeekSelect';

export default function WeeklyOverview({weeklyMatchup}) {
  // const [weeklyMatchup, setWeeklyMatchup] = useState();
  const [selectedWeek, setSelectedWeek] = useState(calculateDefaultWeek);

  // Define the length of the season, from week 1 to 17. Single week playoffs
  const weekNumbers = Array.from({ length: 17 }, (_, index) => index + 1);

  // Function to handle dropdown selection change
  // const handleWeekChange = (event) => {
  //   setSelectedWeek(parseInt(event.target.value, 10));
  // };
 

  if (weeklyMatchup === undefined) {
    return (
      <>
      <h1>Welp, this is awkward...</h1>
      <p>I have not figured out how to handle refreshes.</p>
      <br/>
      <p>Re-select your league to resolve this.</p>
      </>
    )
  } else {
    return (
      <>
          <MatchupBoxes boxscores={weeklyMatchup} />
          <ChartComponent boxscores={weeklyMatchup} />
      </>
    );
  }
}

