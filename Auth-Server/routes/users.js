var express = require('express');
var router = express.Router();

var UserControl = require('../controllers/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  UserControl.list()
    .then(data => res.status(200).jsonp(data))
    .catch(err => res.status(500).jsonp(err))
});

// Procurar user :id
router.get('/:id', function(req, res, next) {
  UserControl.lookUp(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(err => res.status(500).jsonp(err))
});

// Post user
router.post('/', (req,res) => {
  UserControl.insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(err => res.status(500).jsonp({error:err}))
})

router.delete('/:id' , (req, res) => {
  UserControl.remove(req.params.id)
    .then(data => res.status(201).jsonp(data))
    .catch(err => res.status(500).jsonp(err))
})

router.put('/:id', (req,res) => {
  UserControl.edit(req.params.id, req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(err => res.status(500).jsonp(err))
})

module.exports = router;
