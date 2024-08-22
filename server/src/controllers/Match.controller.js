const Match = require("../models/Match.model");

exports.createMatch = async (req, res) => {
  try {
    const newMatch = new Match(req.body);
    await newMatch.save();
    res.status(201).json(newMatch);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create match' });
  }
};

exports.updateScore = async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update score' });
  }
};

exports.getMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve match' });
  }
};

exports.getAllMatch = async (req, res) => {
  try {
    const match = await Match.find();
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve match' });
  }
};
