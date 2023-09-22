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
let closestIndex = -1;
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
    closestIndex = i;
    console.log(closestIndex)
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
            result: item.homeResult === "LimeGreen" ?"Winner" : 'Loser',
            matchId: item.matchId,
            manager: item.homeManager,
            };
        
            const awayItem = {
            teamType: "away",
            score: item.awayScore,
            teamId: item.awayTeamId,
            result: item.awayResult === "LimeGreen" ?"Winner" : 'Loser',
            matchId: item.matchId,
            manager: item.awayManager,
            
            };
            
            // Push the objects into the combined array
            combinedItems.push(homeItem);
            combinedItems.push(awayItem);
            combinedItems.sort((a, b) => b.score-a.score);
            highLoserIndex = combinedItems.findIndex((element) => element.result == 'Loser')
            highLoserName = combinedItems[highLoserIndex].manager
            highLoserScore = combinedItems[highLoserIndex].score
            highLoserSalt = combinedItems.length-(highLoserIndex+1)

            //Lowest scoring Winner
            lowWinIndex = combinedItems.findLastIndex((element) => element.result == 'Winner')
            lowWinName = combinedItems[lowWinIndex].manager
            lowWinScore = combinedItems[lowWinIndex].score
            lowWinSalt = lowWinIndex
    });

    


console.log('Array',combinedItems);
    // Push the objects into the combined array
    

    /*
const [closestWinner, setClosestWinner] = useState('');
const [closestLoser, setClosestLoser] = useState('');
const [closest, setClosest] = useState('');
const [minWinner, setMinWinner] = useState() // 0 = owner name, 1 = score
//const [maxLoser, setMaxLoser] = useState('null') // 0 = owner name, 1 = score
const [beatMin, setBeatMin] = useState(0)
const [loseMax, setLoseMax] = useState(0)

const combinedItems = [];
    boxscores.forEach((item) => {
        // Create new objects for home and away items
        const homeItem = {
        teamType: "home",
        score: item.homeScore,
        teamId: item.homeTeamId,
        result: item.homeResult,
        matchId: item.matchId,
        manager: item.homeManager,
        };
    
        const awayItem = {
        teamType: "away",
        score: item.awayScore,
        teamId: item.awayTeamId,
        result: item.awayResult,
        matchId: item.matchId,
        manager: item.awayManager,
        };
    
        // Push the objects into the combined array
        combinedItems.push(homeItem);
        combinedItems.push(awayItem);

  });

    // Create two separate arrays for "Brown" and "LimeGreen" results
    const brownItems = combinedItems.filter((item) => item.result === "Brown" || item.result === "Brown");
    const limeGreenItems = combinedItems.filter((item) => item.result === "LimeGreen" || item.result === "LimeGreen");

    combinedItems.sort((a, b) => a.score - b.score);
    console.log("Combined Items:", combinedItems);
    if (combinedItems.length != 0) {
    let highestBrownScore = -Infinity;
    let highestLoserIndex = -1;
    let i=0;
    
    combinedItems.forEach((item,i) => {
        if (item.result === "Brown" && item.score > highestBrownScore) {
            highestBrownScore = item.score;
            highestLoserIndex = i
        }
      });
      maxLoser = highestBrownScore[i].manager
      console.log("Highest Brown Score:", highestBrownScore);
    }
*/

//console.log(boxscores);
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
            <p>{winner} beat {loser} <br/>by {closestDifference} points</p>
          </div>
        </section>
        <section className="stat-card-container">
        <div className="stat-card">
            <div className="card-title">
                <h3>Highest Scoing Loser</h3>
            </div>
            <p>{highLoserName} scored {highLoserScore} points<br/>Would have beat {highLoserSalt} other teams</p>
        </div>
        <div className="stat-card">
            <div className="card-title">
              <h3>Lowest Scoing Winner</h3>
            </div>
            <p>{lowWinName} won with only {lowWinScore} points.<br/>They would have lost to {lowWinSalt} other teams</p>
          </div>
        </section>
        </>
    )
}
/*

          */