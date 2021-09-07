const { Batsman, Bowler } = require('./Player');
const { ACTION, PLAYER_STATUS } = require('../constants');

class Team {
  constructor (name, orders) {
    this.name = name;
    this._build_team(orders);
  }

  _build_team (orders) {
    this._batsmans = orders;
    this._current_batsmans = [orders[0], orders[1]];
    this._index = 0;
    this.extras = 0;
    this.man_of_match = '';
    this._players = {};
    this.balls_played = 0;
    this.wickets = 0;
    this.team_runs = 0;

    for (const order in orders) {
      const player = orders[order];
      this._players[player] = new Batsman(player);
    }
  }

  _update_current_players () {
    const next_player_to_pick = this._current_batsmans.length + this.wickets;
    this._current_batsmans[this._index] = this._batsmans[next_player_to_pick];
  }

  _choose_current(run) {
    if (run % 2 === 1 || this.balls_played === 6) {
      this._index = (!this._index) | 0;
    }
  }

  _last_ball () {
    if (this.balls_played === 6) {
      this._index = (!this._index) | 0;
    }
  }

  _team_player_out () {
    this._update_current_players();
    this.wickets += 1;
  }

  next_batsman (run, type) {
    if (run === ACTION.OUT) {
      this._team_player_out()
    } else {
      this._choose_current(run);
      if (type && type === ACTION.RUN_OUT) {
        this._team_player_out();
      }
    }
  }

  team_all_out () {
    if (Object.keys(this._players).length - this.wickets <= 1) {
      return true;
    } else {
      return false;
    }
  }

  set_run (run, run_type) {
    const player = this._current_batsmans[this._index];
    if (run === ACTION.WIDE || run === ACTION.NO_BALL) {
      this.extras += 1;
      this.team_runs += 1;
      this.balls_played -= 1;
    } else {
      this._players[player].set_batsman(run, run_type);
    }
    this.balls_played += 1;
    this.team_runs += (!isNaN(run) ? parseInt(run) : 0);
  }

  total_overs () {
    if (this.balls_played % 6) {
      return `${Math.floor(this.balls_played / 6)} overs ${this.balls_played % 6} balls`;
    } else {
      return this.balls_played / 6;
    }
  }

  team_score () {
    console.log('Scorecard for team ', this.name);
    console.log('Player Name \t Score \t 4s \t 6s \t Balls');
    const players = Object.keys(this._players);

    players.forEach((player_name) => {
      const player = this._players[player_name];

      if (player.status === PLAYER_STATUS.PLAYING) {
        player_name += '*';
      }
      console.log(`${player_name} \t ${player.runs} \t ${player.fours} \t ${player.sixes} \t ${player.balls_faced}`);
    });
    console.log(`Total: ${this.team_runs}/${this.wickets}`);
    console.log(`Extras: ${this.extras}`);
    console.log(`Overs: ${this.total_overs()}`);
  }
}

module.exports = Team;
