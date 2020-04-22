var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', function (req, res) {
  res.send('App home page');
})

// About page route.
router.get('/about', function (req, res) {
  res.send('About this page');
})

router.post('/about', function (req, res) {
  res.send('About this page POST');
})

router.get('/users/:userId/books/:bookId', function (req, res) {
  // Access userId via: req.params.userId
  // Access bookId via: req.params.bookId
  res.send(req.params);
})

// Load module
const {getPlayers} = require('./index');
// Show list
router.get('/players', getPlayers);

// Load players routes
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./player');
router.get('/add', addPlayerPage);
router.get('/edit/:id', editPlayerPage);
router.get('/delete/:id', deletePlayer);
router.post('/add', addPlayer);
router.post('/edit/:id', editPlayer);

// Export
module.exports = router;
