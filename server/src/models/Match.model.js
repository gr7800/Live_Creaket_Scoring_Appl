const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  teams: {
    teamA: { type: String, required: true },
    teamB: { type: String, required: true },
  },
  innings: [
    {
      battingTeam: String,
      bowlingTeam: String,
      runs: Number,
      wickets: Number,
      overs: Number,
      balls: Number,
      batsmen: [{ name: String, runs: Number, balls: Number }],
      bowlers: [{ name: String, overs: Number, runs: Number, wickets: Number }],
    },
  ],
  currentInning: { type: Number, default: 0 },
  matchStatus: { type: String, enum: ['not_started', 'in_progress', 'completed'], default: 'not_started' },
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
