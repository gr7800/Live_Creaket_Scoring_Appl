const express = require('express');
const { createMatch, updateScore, getMatch, getAllMatch } = require("../controllers/Match.controller");
const router = express.Router();

router.post('/create', createMatch);
router.put('/update/:id', updateScore);
router.get('/', getAllMatch);
router.get('/:id', getMatch);

module.exports = router;
