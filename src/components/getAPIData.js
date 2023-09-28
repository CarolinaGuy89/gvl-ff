import { Client } from 'espn-fantasy-football-api/web.js';
import { determineOwner } from '../components/teamowners';

export const getBoxscoreForWeek = async (leagueId, selectedWeek) => {
    const myClient = new Client({ leagueId });

    try {
        var matchup = await myClient.getBoxscoreForWeek({
            seasonId: 2023,
            matchupPeriodId: selectedWeek,
            scoringPeriodId: selectedWeek,
        })

        matchup.weekId = selectedWeek;
        matchup.leagueId = leagueId;
        matchup.forEach((element, i) => {
            element.weekId = selectedWeek
            element.matchId = i

            //Determine Home/Away Win or Loss
            element.homeResult = element.homeScore > element.awayScore ? 'Win' : 'Loss';
            element.awayResult = element.awayScore > element.homeScore ? 'Win' : 'Loss';

            //Set the bar chart color according to result. Color must be valid CSS
            element.barColorHome = element.homeResult === 'Win' ? "Limegreen" : "Brown"
            element.barColorAway = element.awayResult === 'Win' ? "Limegreen" : "Brown"

            //Home Roster Updates
            element.homeRoster.forEach((p) => {
                let sumProjectedPoints = Object.values(p.projectedPointBreakdown)
                    .filter((value) => typeof value === 'number')
                    .reduce((sum, value) => sum + value, 0);
                p.projectedPoints = parseFloat(sumProjectedPoints.toFixed(1))
                p.delta = parseFloat((p.totalPoints - p.projectedPoints).toFixed(2))
                p.position = p.position === "RB/WR/TE" ? 'Flex' : p.position
                delete p.projectedRawStats
                delete p.rawStats
            })
            //Sum Home Bench
            element.homeBenchScore = element.homeRoster
                .filter((player) => player.position === 'Bench' || player.position === 'IR')
                .reduce((total, player) => total + player.totalPoints, 0);

            //Away Roster Updates
            element.awayRoster.forEach((p) => {
                let sumProjectedPoints = Object.values(p.projectedPointBreakdown)
                    .filter((value) => typeof value === 'number')
                    .reduce((sum, value) => sum + value, 0);
                p.projectedPoints = parseFloat(sumProjectedPoints.toFixed(1))
                p.delta = parseFloat((p.totalPoints - p.projectedPoints).toFixed(2))
                p.position = p.position === "RB/WR/TE" ? 'Flex' : p.position
                delete p.projectedRawStats
                delete p.rawStats
            })
            //Sum Away Bench
            element.awayBenchScore = element.awayRoster
                .filter((player) => player.position === 'Bench' || player.position === 'IR')
                .reduce((total, player) => total + player.totalPoints, 0);

            element.homeManager = determineOwner(leagueId, element.homeTeamId)
            element.awayManager = determineOwner(leagueId, element.awayTeamId)
        }
        );
        console.log('-------------API CALL------------')
        return matchup;
    } catch (error) {
        console.error('Error fetching boxscore data:', error);
        return [];
    }
};
