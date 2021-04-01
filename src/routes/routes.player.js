// logic regarding users

const { Router } = require('express');
const router = Router();

// routes
router.get('/players', (req, res) => {
    res.send('hello kissy');
})


module.exports = router;