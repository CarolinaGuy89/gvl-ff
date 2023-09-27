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
let closestDifference = Infinity;
let winner = 'Loading...';
let loser = 'Loading...';

for (let i = 0; i < boxscores.length; i++) {
  const difference = Math.abs(boxscores[i].homeScore - boxscores[i].awayScore);

  if (difference < closestDifference) {
    closestDifference = difference.toFixed(2);
    if (boxscores[i].homeScore > boxscores[i].awayScore) {
        winner = boxscores[i].homeManager 
        loser = boxscores[i].awayManager 
    } else {
        loser = boxscores[i].homeManager 
        winner = boxscores[i].awayManager 
    };
  }
}

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
            teamType: "home",
            score: item.homeScore,
            teamId: item.homeTeamId,
            result: item.homeResult === "Win" ?"Winner" : 'Loser',
            matchId: item.matchId,
            manager: item.homeManager,
            };
        
            const awayItem = {
            teamType: "away",
            score: item.awayScore,
            teamId: item.awayTeamId,
            result: item.awayResult === "Win" ?"Winner" : 'Loser',
            matchId: item.matchId,
            manager: item.awayManager,
            
            };
            
            // Push the objects into the combined array
            combinedItems.push(homeItem);
            combinedItems.push(awayItem);
            combinedItems.sort((a, b) => b.score-a.score);
            highLoserIndex = combinedItems.findIndex((element) => element.result === 'Loser')
            highLoserName = combinedItems[highLoserIndex].manager
            highLoserScore = combinedItems[highLoserIndex].score
            highLoserSalt = combinedItems.length-(highLoserIndex+1)

            //Lowest scoring Winner
            lowWinIndex = combinedItems.findLastIndex((element) => element.result === 'Winner')
            lowWinName = combinedItems[lowWinIndex].manager
            lowWinScore = combinedItems[lowWinIndex].score
            lowWinSalt = lowWinIndex
    });

//console.log('Array',combinedItems);

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