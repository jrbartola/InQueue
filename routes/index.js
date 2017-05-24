var express = require('express');
var router = express.Router();

/* GET unauthenticated index page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'InQueue'});
});

router.get('/main', function(req, res) {
	res.render('main', { title: 'InQueue'});
});

module.exports = router;
