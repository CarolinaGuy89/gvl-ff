import React, { useState, useEffect } from 'react';

export default function MyTeam({weeklyMatchup}) {

  // useEffect(() => {
  //   getBoxscoreForWeek(leagueId,selectedWeek).then((matchup) => {
  //     // console.log('matchup: ', matchup);
  //     setWeeklyMatchup(matchup);
  //   })}, [leagueId, selectedWeek]);//Request new Data at change of League or week

console.log('Team ESPN Data', weeklyMatchup)
  return (
    <>
      <div>
        <h2 style={{ textAlign: "center", color: "white", fontSize: "48px" }}>
          This is Simon:
          👷
        </h2>
        <h3 style={{ textAlign: "center", color: "white" }}>
          Simon doesn't work very fast.

        </h3>

        <p style={{ textAlign: "center", color: "white" }}> <br />He will finish this page eventually...</p>
      </div>
    </>
  )
}