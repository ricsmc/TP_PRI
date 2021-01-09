var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var json = [{id:'d9da0wdu', name:'Express',user:'jrc' ,date:'2020', rating:2}, { id:'d94a0wdu',user:'jcr' ,name:'Node', date:'2020', rating:2}];
  res.render('index', {posts:json});
});

module.exports = router;
