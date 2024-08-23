const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  teams: {
    teamA: { type: String, required: true, default: 'Team A' },
    teamB: { type: String, required: true, default: 'Team B' },
  },
  innings: [
    {
      battingTeam: { type: String, default: 'Team A' },
      bowlingTeam: { type: String, default: 'Team B' },
      runs: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      overs: { type: Number, default: 0 },
      balls: { type: Number, default: 0 },
      batsmen: [
        {
          name: { type: String, default: 'test1' },
          runs: { type: Number, default: 0 },
          balls: { type: Number, default: 0 },
        },
      ],
      bowlers: [
        {
          name: { type: String, default: 'test2' },
          overs: { type: Number, default: 0 },
          runs: { type: Number, default: 0 },
          wickets: { type: Number, default: 0 },
        },
      ],
    },
  ],
  currentInning: { type: Number, default: 0 },
  matchStatus: {
    type: String,
    enum: ['scheduled', 'in_progress', 'completed', 'canceled'],
    default: 'scheduled',
  },
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
