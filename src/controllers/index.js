const Promise = require('bluebird');
const Game = require('./Game');

async function startGameForTeam (gameObj, obj) {
  gameObj.set_team(obj.team, obj.batting);

  for (let over = 0; over < obj.overs; over++) {
    console.log('Over: ', over + 1);
    for (let bowl = 0; bowl < 6; bowl++) {
      const run = await interactiveMode(`Run on bowl ${bowl}: `);
      if (run === 'Wd' || run === 'Nb') { bowl -= 1; }
      gameObj.bowl(run);
      if (gameObj.game_ends()) {
        break;
      }
    }
    if (gameObj.game_ends()) {
      break;
    }
  }
}

async function processCommand () {
  const obj = {};
  obj.team = 1;
  obj.players = await interactiveMode('No. of players for each team: ');
  obj.overs = await interactiveMode('No. of overs: ');
  obj.batting = await interactiveMode('Batting Order for team 1: ');
  obj.batting = obj.batting.split(' ');

  const gameObj = new Game(obj.players, obj.overs);
  await startGameForTeam(gameObj, obj);
  obj.team = 2;
  gameObj.next_team();
  obj.batting = await interactiveMode('Batting Order for team 2: ');
  obj.batting = obj.batting.split(' ');
  await startGameForTeam(gameObj, obj);
  gameObj.final_result();
}

function interactiveMode (query) {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => readline.question(query, ans => {
    readline.close();
    resolve(ans);
  }));
}
module.exports = processCommand;
