const { ACTION } = require('../constants');
const Team = require('./Team');

class Game {
  constructor (players, overs) {
    this.players = players;
    this._teams = {};
    this._total_overs = overs;
    this._current_over = 0;
    this._balls = 0;
  }

  set_team (team, batting_orders) {
    this._teams[team] = new Team(team, batting_orders);
  }

  get_team_report (team) {
    return this._teams[team].team_runs;
  }

  game_ends (team) {
    if (this._teams[team].team_all_out()) {
      return true;
    } else {
      return (this._current_over >= this._total_overs && this._balls >= 6);
    }
  }

  play (team_no, run) {
    const team = this._teams[team_no];

    let run_type = '';
    if (run.indexOf(ACTION.RUN_OUT) > -1) {
      let run_types = run.split(' ');
      run_type = run_types[0];
      run = run_types[1];
    }

    team.set_run(run, run_type);

    team.next_batsman(run, run_type);
    if (run != ACTION.WIDE) {
      this._balls += 1;
    }
    if (this._balls === 6 || team.team_all_out()) {
      team.team_score();
      this._current_over += 1;
      this._balls = 0;
    }
  }
}

module.exports = Game;
