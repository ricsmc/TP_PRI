var express = require('express');
var router = express.Router();
var passport = require('passport')
var UserControl = require('../controllers/user')
var jwt = require('jsonwebtoken');
const user = require('../models/user');

router.post('/login', passport.authenticate('local'), function(req,res){
  jwt.sign({username: req.user.username, level: req.user.level, 
            sub:'Trabalho de PRI2020'},
            "PRI2020",
            function(e,token){
              if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e})
              else res.status(201).jsonp({token: token,username: req.user.username, level: req.user.level})
  });
})

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
  UserControl.lookUp(req.body.username)
    .then(da => {
      if(da == null){
        UserControl.insert(req.body)
          .then(data => {
            res.status(201).jsonp({username:data.username})
          })
          .catch(err => res.status(500).jsonp({error:err}))
      }
      else{
        res.status(400).jsonp({message:"O utilizador já existe"})
        
      }
    })
    .catch(err => res.status(500).jsonp(err))
  
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

router.post('/search', (req,res) => {
  UserControl.search(req.body.field)
  .then(data => res.status(201).jsonp(data))
  .catch(err => res.status(500).jsonp(err))
})

module.exports = router;
