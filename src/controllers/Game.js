const { Game } = require('../models');

class GameController {
  constructor (players, overs) {
    this.game = new Game(players, overs);
    this._current_team = 1;
    this._reports = {};
  }

  set_team (team, batting_orders) {
    this._current_team = team;
    this.game.set_team(team, batting_orders);
  }

  next_team (team) {
    this._current_team = team;
  }

  game_ends () {
    this._set_reports();
    return this.game.game_ends(this._current_team);
  }

  _set_reports () {
    this._reports[this._current_team] = this.game.get_team_report(this._current_team);
  }

  bowl (run) {
    this.game.play(this._current_team, run);
  }

  final_result () {
    const teams = Object.keys(this._reports);
    const score1 = this._reports[teams[0]];
    const score2 = this._reports[teams[1]];

    if (score1 > score2) {
      console.log(`Team ${teams[0]} won by ${score1 - score2} runs`);
    } else if (score1 < score2) {
      console.log(`Team ${teams[1]} won by ${score2 - score1} runs`);
    } else {
      console.log('Match draw');
    }
  }
};

module.exports = GameController;
