import React, { useMemo, } from 'react';
export default function MatchupBoxes({ boxscores }) {

//Weekly average
    const averageScore = useMemo(() => {
        let total = 0;
        boxscores.forEach(element => {
            total += (element.homeScore + element.awayScore);
        });
        return (total / (boxscores.length * 2)).toFixed(2);
    }, [boxscores]); // Update when boxscores change

//Closest Game

let closestGameText = 'Week has not started'
  

const closestMatch = boxscores.reduce((closest, current) => {
    const difference = Math.abs(current.homeScore - current.awayScore);
  
    if (difference < closest.difference) {
      closest.difference = difference.toFixed(2);
      if (current.homeScore > current.awayScore) {
        closest.winner = current.homeManager;
        closest.loser = current.awayManager;
      } else if (current.homeScore < current.awayScore) {
        closest.winner = current.awayManager;
        closest.loser = current.homeManager;
      } else {
        closest.winner = null;
        closest.loser = null;
      }
    }
  
    return closest;
  }, {
    difference: Infinity,
    winner: '',
    loser: '',
  });
  const closestDifference = closestMatch.difference;
  const winner = closestMatch.winner;
  const loser = closestMatch.loser;

//Highest Scoring Loser
    let highLoserIndex = -1
    let highLoserSalt = -1
    let highLoserScore = -1
    var highLoserName = 'Loading'
    let lowWinIndex = -1
    let lowWinSalt = -1
    let lowWinScore = -1
    var lowWinName = 'Loading'

    const combinedItems = [];
        boxscores.forEach((item) => {
            // Create new objects for home and away items
            const homeItem = {
            score: item.homeScore,
            result: item.homeResult === "Win" ?"Winner" : 'Loser',
            manager: item.homeManager
            };
        
            const awayItem = {
            score: item.awayScore,
            result: item.awayResult === "Win" ?"Winner" : 'Loser',
            manager: item.awayManager
            };
            
            // Push the objects into the combined array
            combinedItems.push(homeItem);
            combinedItems.push(awayItem);
            combinedItems.sort((a, b) => b.score-a.score);
            
            //Lowest scoring Winner
            highLoserIndex = combinedItems.findIndex((element) => element.result === 'Loser')
            lowWinIndex = combinedItems.findLastIndex((element) => element.result === 'Winner')
            
            //Check if a winner exists, otherwise no game has started yet
            if (lowWinIndex !== -1) {

                highLoserName = combinedItems[highLoserIndex].manager
                highLoserScore = combinedItems[highLoserIndex].score
                highLoserSalt = combinedItems.length-(highLoserIndex+1)

                lowWinName = combinedItems[lowWinIndex].manager;
                lowWinScore = combinedItems[lowWinIndex].score;
                lowWinSalt = lowWinIndex;
              } else {
                highLoserName = '-'
                highLoserScore = '-';
                highLoserSalt = '-';
                lowWinName = '-';
                lowWinScore = '-'; 
                lowWinSalt = '-'; 
                let closestGameText = 'Week has not started'
              }

    });
    //console.log('combinedItems', combinedItems)
    return (
<>
    <section className="stat-card-container">
        <div className="stat-card">
            <div className="card-title">
                <h3>Average Score</h3>
            </div>
            <p>{averageScore} points</p>
        </div>

        <div className="stat-card">
            <div className="card-title">
                <h3>Closest Game</h3>
            </div>
            <p>{winner} beat {loser} <br />by {closestDifference} points</p>
        </div>
    </section>

    <section className="stat-card-container">
        <div className="stat-card">
            <div className="card-title">
                <h3>Highest Scoring Loser</h3>
            </div>
            <p>{highLoserName} scored {highLoserScore} points,<br />would have beat {highLoserSalt} {highLoserSalt === 1 ? "other" : "others"}</p>
        </div>

        <div className="stat-card">
            <div className="card-title">
                <h3>Lowest Scoring Winner</h3>
            </div>
            <p>{lowWinName} won with only {lowWinScore} points,<br />would have lost to {lowWinSalt} {lowWinSalt === 1 ? "other" : "others"}</p>
        </div>
    </section>
</>
    )
}
/*

          */