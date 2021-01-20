import { fifaData } from './fifa.js';

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/
let keyGame = fifaData.filter(game => game.Year === 2014 && game.Stage === "Final")[0];

//(a) Home Team name for 2014 world cup final
console.log(keyGame['Home Team Name']);

//(b) Away Team name for 2014 world cup final
console.log(keyGame['Away Team Name']);

//(c) Home Team goals for 2014 world cup final
console.log(keyGame['Home Team Goals']);

//(d) Away Team goals for 2014 world cup final
console.log(keyGame['Away Team Goals']);

//(e) Winner of 2014 world cup final */
function getKeyByValue(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
}

function getWinner(game, useInitials = false) {
    const homeGoals = game['Home Team Goals'];
    const awayGoals = game['Away Team Goals'];
    let teamKeys = ['Home Team', 'Away Team'];
    let winningTeam;
    if (useInitials) {
        teamKeys = teamKeys.map(key => key += ' Initials');
    } else {
        teamKeys = teamKeys.map(key => key += ' Name');
    }

    if (homeGoals > awayGoals) {
        winningTeam = game[teamKeys[0]];
    } else if (homeGoals < awayGoals) {
        winningTeam = game[teamKeys[1]];
    } else {
        winningTeam = game['Win conditions'].split(' ')[0];
        if (useInitials) {
            let winningTeamKey = getKeyByValue(game, winningTeam);
            winningTeam = game[winningTeamKey.replace('Name', 'Initials')];
        }
    }
    return winningTeam;
}
console.log(getWinner(keyGame));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
    return data.filter(game => game["Stage"] === "Final");
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following:
1. Receive an array
2. Receive a callback function getFinals from task 2
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(data, getFinals) {
    return getFinals(data).map(game => game['Year']);
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:
1. Receives an array
2. Receives the callback function getFinals from task 2
3. Determines the winner (home or away) of each `finals` game.
4. Returns the names of all winning countries in an array called `winners` */

function getWinners(data, getFinals) {
    return getFinals(data).map(game => getWinner(game));
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!"

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(data, getYears, getWinners) {
    let years = getYears(data, getFinals);
    let winners = getWinners(data, getFinals);
    let result = [];
    for (let i = 0; i < years.length; i++) {
        result.push(`In ${years[i]}, ${winners[i]} won the world cup!`);
    }
    return result;
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following:
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place.

 (Hint: use .reduce and do this in 2 steps)

 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(data) {
    let goalsSum = data.reduce((sum, game) => sum += (game['Home Team Goals'] + game['Away Team Goals']), 0);
    let goalsAverage = goalsSum / data.length;
    return Math.round((goalsAverage + Number.EPSILON) * 100) / 100;
}

console.log(getAverageGoals(getFinals(fifaData)));


/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had.

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
    return data.filter(game => getWinner(game, true) === teamInitials).length;
}

console.log(getCountryWins(getFinals(fifaData), 'BRA'));

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */
function getGoals(data) {
    let teamGoals = {};
    function processGoals(game) {
        // Add number of goals for each team to teamGoals
        function processTeam(team, goals) {
            // Add number of goals for the team to teamGoals
            if (goals > 0) {
                if (team in teamGoals) {
                    teamGoals[team].push(goals);
                } else {
                    teamGoals[team] = [goals];
                }
            }

        }
        let teamStrings = ['Home Team ', 'Away Team'];
        let teams = teamStrings.map(str => game[str + 'Name']);
        let goals = teamStrings.map(str => game[str + 'Goals']);

        teams.forEach((team, i) => processTeam(team, goals[i]));
    }

    // Add number of goals for all games to teamGoals
    data.forEach(game => processGoals(game));

    // Combine all goal totals for Germany
    let germanyTemp = [];
    for (const team in teamGoals) {
        if (team.startsWith('German')) {
            germanyTemp.push(...teamGoals[team]);
            delete teamGoals[team];
        }
    }
    teamGoals['Germany'] = germanyTemp;

    // Take the average of each country's goals
    Object.keys(teamGoals).map(function (team) {
        let goalArray = teamGoals[team];
        teamGoals[team] = goalArray.reduce((sum, score) => sum += score, 0) / goalArray.length;
    });

    // Return the key corresponding to the maximum average number of goals
    return Object.keys(teamGoals).reduce((a, b) => teamGoals[a] > teamGoals[b] ? a : b);
}

console.log(getGoals(getFinals(fifaData)));

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense() {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo() {
    console.log('its working');
    return 'bar';
}
export default {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
