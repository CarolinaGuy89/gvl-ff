import { elements } from 'chart.js';
import React, { useMemo, useState, useEffect } from 'react';

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
        <section>
        <div className="stat-card">
            <div className="card-title">
                <h3>Average Score</h3>
            </div>
            <p>The average total score for the week was {averageScore} points</p>
        </div>

        </section>
        </>
    )
}