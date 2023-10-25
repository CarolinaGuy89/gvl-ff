import React, { useState, useEffect } from 'react';
import { getTeamsForWeek } from '../components/getAPIData'
import { calculateDefaultWeek } from '../components/WeekSelect';

function LeagueHome ({ leagueStandings }) {
    const [leagueId, setLeagueId] = useState();
    const [selectedWeek, setSelectedWeek] = useState(calculateDefaultWeek);

    // useEffect(() => {
    //     //Don't requst API data unless leagueId is set
    //     if (typeof leagueId == 'number') {
    //         getTeamsForWeek(leagueId, selectedWeek).then((teamData) => {
    //     console.log('TeamData (leagueHome.js)', leagueStandings)
    //       })
    //     }
    //   }, [leagueId, selectedWeek]);//Request new Data at change of League or week  

    if (leagueStandings === undefined) {
      return 
    }
    leagueStandings.sort((a, b) => a.playoffSeed - b.playoffSeed);
    console.log(leagueStandings)
    // Create an HTML table
    const table = document.createElement('table');
    
    // Create table headers
    const headers = ['Playoff Seed', 'Abbreviation', 'Total Points Scored'];
    
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    headers.forEach((headerText) => {
      const th = document.createElement('th');
      const text = document.createTextNode(headerText);
      th.appendChild(text);
      headerRow.appendChild(th);
    });
    
    // Create table rows
    const tbody = table.createTBody();
    leagueStandings.forEach((item) => {
      const row = tbody.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
    
      cell1.textContent = item.playoffSeed;
      cell2.textContent = item.name;
      cell3.textContent = item.totalPointsScored.toFixed(2);
    });



      // console.log('LeagueHome: ', leagueStandings);
      if (leagueStandings === undefined) {
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


        <div className='leagueStandings-container'>
        <h1>Current League Standings</h1>
        <table className='leagueStandings'>
          <thead>
            <tr>
              <th>Rank</th>
              <th></th>
              <th>GM</th>
              <th>Team Name</th>
              <th>Record</th>
              <th>PF</th>
              {/* <th>PA</th>
              <th>∆</th> */}
            </tr>
          </thead>
          <tbody>
            {leagueStandings.map((t,i) => (
              <tr key={t.id}>
                <td>{t.playoffSeed}</td>
                <td><img src={t.logoURL} width="25px"/></td>
                <td>{t.owner}</td>
                <td>{t.name}</td>
                <td>{t.wins} - {t.losses}</td>
                <td>{t.regularSeasonPointsFor.toFixed(0)}</td>
                {/*  <td>{t.regularSeasonPointsAgainst.toFixed(0)}</td>
                <td>{(t.regularSeasonPointsFor-t.regularSeasonPointsAgainst).toFixed(0)}</td> */}

              </tr>
            ))}
          </tbody>
        </table>
        </div>


      </>

    )
  }
}

export default LeagueHome