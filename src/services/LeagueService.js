import { getMatchList } from '@/services/api-service';
import { calculatePoints } from '@/utils/functions';

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
        let teamsThatPlayed = [...new Set(this.matchList.filter(match => match.matchPlayed === true).map(match => [match.homeTeam, match.awayTeam]).flat())];
        let leaderboard = [];

        for (let team of teamsThatPlayed) {
            let playedMatches = this.matchList.filter(match => match.homeTeam == team || match.awayTeam == team);
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
            leaderboard.push({
                teamName: team,
                matchesPlayed: playedMatches.length,
                goalsFor: goalsFor,
                goalsAgainst: goalsAgainst,
                points: points
            });
        }
        
        return leaderboard;
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