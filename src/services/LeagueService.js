import { groupBy } from 'core-js/actual/array/group-by';
import { getMatchList } from './api-service';
import { calculatePoints } from '../utils/functions';

/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 * 
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM, 
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.  
 * 
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 * 
 */
class LeagueService {   
    matchList = null;
    
    /**
     * Sets the match schedule.
     * Match schedule will be given in the following form:
     * [
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      },
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      }    
     * ]
     * 
     * @param {Array} matches List of matches.
     */    
    setMatches(matches) {
        this.matchList = matches;
    }

    /**
     * Returns the full list of matches.
     * 
     * @returns {Array} List of matches.
     */
    getMatches() {
        return this.matchList;
    }

    /**
     * Returns the leaderboard in a form of a list of JSON objecs.
     * 
     * [     
     *      {
     *          teamName: [STRING]',
     *          matchesPlayed: [INTEGER],
     *          goalsFor: [INTEGER],
     *          goalsAgainst: [INTEGER],
     *          points: [INTEGER]     
     *      },      
     * ]       
     * 
     * @returns {Array} List of teams representing the leaderboard.
     */
    getLeaderboard() {
        let teams = [...new Set(this.matchList.map(match => [match.homeTeam, match.awayTeam]).flat())];
        let generalLeaderboard = [];

        for (let team of teams) {
            let playedMatches = this.matchList.filter(match => match.matchPlayed === true && (match.homeTeam == team || match.awayTeam == team));
            let points = 0;
            let goalsFor = 0;
            let goalsAgainst = 0;

            for (let match of playedMatches) {
                if (team === match.homeTeam) {
                    points += calculatePoints(match.homeTeamScore, match.awayTeamScore, true);
                    goalsFor += match.homeTeamScore;
                    goalsAgainst += match.awayTeamScore;
                }
                else {
                    points += calculatePoints(match.homeTeamScore, match.awayTeamScore, false);
                    goalsFor += match.awayTeamScore;
                    goalsAgainst += match.homeTeamScore;
                }
            }

            generalLeaderboard.push({
                teamName: team,
                matchesPlayed: playedMatches.length,
                goalsFor: goalsFor,
                goalsAgainst: goalsAgainst,
                points: points
            });
        }

        let teamsGroupedByPoints = generalLeaderboard.groupBy(team => team.points);

        let descendingPointsValues = Object.keys(teamsGroupedByPoints).sort().reverse();

        let sortedLeaderBoard = [];

        for (let numberOfPoints of descendingPointsValues) {
            let groupOfTeams = teamsGroupedByPoints[numberOfPoints];

            if (groupOfTeams.length === 1) {
                sortedLeaderBoard.push(groupOfTeams[0]);
                continue;
            }

            let headToHeadLeaderboard = [];
            let concernedTeams = groupOfTeams.map(team => team.teamName);

            for (let team of concernedTeams) {
                let otherTeams = concernedTeams.filter(otherTeam => team !== otherTeam);
                let playedMatches = this.matchList.filter(match => match.matchPlayed === true && (match.homeTeam == team && otherTeams.indexOf(match.awayTeam) > -1 || match.awayTeam == team && otherTeams.indexOf(match.homeTeam) > -1));

                let points = 0;
                let goalsFor = 0;
                let goalsAgainst = 0;
    
                for (let match of playedMatches) {
                    if (team === match.homeTeam) {
                        points += calculatePoints(match.homeTeamScore, match.awayTeamScore, true);
                        goalsFor += match.homeTeamScore;
                        goalsAgainst += match.awayTeamScore;
                    }
                    else {
                        points += calculatePoints(match.homeTeamScore, match.awayTeamScore, false);
                        goalsFor += match.awayTeamScore;
                        goalsAgainst += match.homeTeamScore;
                    }
                }
    
                headToHeadLeaderboard.push({
                    teamName: team,
                    points: points
                });
            }

            headToHeadLeaderboard.sort(function (firstTeam, secondTeam) {
                if (firstTeam.points > secondTeam.points)
                    return -1;
                else if (firstTeam.points < secondTeam.points)
                    return 1;
                
                let indexOfFirstTeamInGroup = groupOfTeams.findIndex(groupedTeam => groupedTeam.teamName === firstTeam.teamName);
                let indexOfSecondTeamInGroup = groupOfTeams.findIndex(groupedTeam => groupedTeam.teamName === secondTeam.teamName);

                let firstTeamOnLeaderboard = groupOfTeams[indexOfFirstTeamInGroup];
                let secondTeamOnLeaderboard = groupOfTeams[indexOfSecondTeamInGroup];

                let firstTeamGoalDifference = firstTeamOnLeaderboard.goalsFor - firstTeamOnLeaderboard.goalsAgainst;
                let secondTeamGoalDifference = secondTeamOnLeaderboard.goalsFor - secondTeamOnLeaderboard.goalsAgainst;

                if (firstTeamGoalDifference > secondTeamGoalDifference)
                    return -1;
                else if (secondTeamGoalDifference > firstTeamGoalDifference)
                    return 1;

                if (firstTeamOnLeaderboard.goalsFor > secondTeamOnLeaderboard.goalsFor)
                    return -1;
                else if (secondTeamOnLeaderboard.goalsFor > firstTeamOnLeaderboard.goalsFor)
                    return 1;

                return firstTeam.teamName < secondTeam.teamName ? -1 : 1;
            });

            for (let headTeam of headToHeadLeaderboard) {
                let indexOfTeamInGroup = groupOfTeams.findIndex(groupedTeam => groupedTeam.teamName === headTeam.teamName);

                if (indexOfTeamInGroup > -1)
                    sortedLeaderBoard.push(groupOfTeams[indexOfTeamInGroup]);
            }
        }

        return sortedLeaderBoard;
    }
    
    /**
     * Asynchronic function to fetch the data from the server.
     */
    async fetchData() {
        const data = await getMatchList();

        if (data && data.matches && data.matches.length)
            this.setMatches(data.matches);
        else
            this.setMatches([]);
    }
}

export default LeagueService;