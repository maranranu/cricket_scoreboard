const { PLAYER_STATUS, PLAYER_TYPE, ACTION} = require('../constants');

class Player {
  constructor (name, type) {
    this._initiate_player(name, type);
  }

  _initiate_player (name, type) {
    this.name = name;
    this.runs = 0;
    this.fours = 0;
    this.sixes = 0;
    this.type = type;
    this.balls_faced = 0;
    this.maiden = 0;
    this.overs = 0;
    this.strike_rate = 0;
    this.status = PLAYER_STATUS.NOT_GETTING_CHANCE_TO_BAT;
  }

  set_batsman (run, run_type) {
    this.runs += (!isNaN(run) ? parseInt(run) : 0);
    this.balls_faced += 1;
    this.status = PLAYER_STATUS.PLAYING;
    this.strike_rate = (this.runs / this.balls_faced) * 100;

    if (run == 4) {
      this.fours += 1;
    } else if (run == 6) {
      this.sixes += 1;
    } else if (run == 0) {
      this.maiden += 1;
    } else if (run == ACTION.OUT || run_type == ACTION.RUN_OUT) {
      this.player_out();
    }
  }

  score_runs () {
    return this.runs;
  }

  player_out () {
    this.status = PLAYER_STATUS.OUT;
    this.overs = (this.balls_faced) / 6;
    this.strike_rate = (this.runs / this.balls_faced) * 100;
  }
}

class Batsman extends Player {
  constructor (name) {
    super(name, PLAYER_TYPE.BATSMAN);
  }
}

class Bowler extends Player {
  constructor (name) {
    super(name, PLAYER_TYPE.BOWLER);
    this.wickets_taken = 0;
    this.ball_thrown = 0;
  }

  ball_throw () {
    this.ball_thrown += 1;
  }

  wicket_taken () {
    this.wickets_taken += 1;
  }
}

module.exports = {
  Bowler: Bowler,
  Batsman: Batsman
};
