const { Router } = require('express');
const router = Router();
const player = require('../models/player'); // delete?
const playerController = require('../controller/player.controller')

/* ROUTES */

// get list of all players
router.get('/players', (req, res) => {
    res.json({
        test: 'kissy'
    });
});

// creates player
router.post('/players', playerController.player_create_post);

module.exports = router;