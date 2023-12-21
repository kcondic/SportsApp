import { winPoints, drawPoints, lossPoints } from './constants';

function calculatePoints(homeScore, awayScore, didPlayForHome) {
    if (homeScore === awayScore)
        return drawPoints;

    let didWin = didPlayForHome ? homeScore > awayScore : awayScore > homeScore;

    if (didWin)
        return winPoints;

    return lossPoints;
}

export { calculatePoints };