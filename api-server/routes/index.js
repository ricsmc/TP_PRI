var express = require('express');
var router = express.Router();

var PostControl = require('../controllers/post')

// Listar BD
router.get('/posts', function(req, res, next) {
  PostControl.list()
    .then(data => res.status(200).jsonp(data))
    .catch(err => res.status(500).jsonp(err))
});

// Procurar user :id
router.get('/posts/:id', function(req, res, next) {
  PostControl.lookUp(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(err => res.status(500).jsonp(err))
});

// Listar todos os "posts" da página :page
router.get('/posts/page/:page', function(req,res,next) {
  PostControl.lookUp10()
    .then(data =>{
      //data.sort({upload_date: 1})
      //data.sort(sortByProperty("upload_date"))
      res.status(200).send(get10elements(req.params.page,data))
    })
    .catch(err => res.status(500).jsonp(err))
})

router.post('/posts/comment/:id', (req,res) => {
  PostControl.insertComment(req.body,req.params.id)
    .then(data => res.status(201).jsonp(data))
    .catch(err => res.status(500).jsonp({error:err}))
})

  
// Post user
router.post('/posts', (req,res) => {
  PostControl.insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(err => res.status(500).jsonp({error:err}))
})

router.delete('/posts/:id' , (req, res) => {
  PostControl.remove(req.params.id)
    .then(data => res.status(201).jsonp(data))
    .catch(err => res.status(500).jsonp(err))
})

router.put('/posts/:id', (req,res) => {
  PostControl.edit(req.params.id, req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(err => res.status(500).jsonp(err))
})

router.post('/comment/:id', (req,res) => {
  PostControl.insertComment(req.body, req.params.id)
    .then(data => res.status(201).jsonp(data))
    .catch(err => res.status(500).jsonp({error:err}))
})

function get10elements(number,arr){
  var array = []
  for (let index = (number-1)*10; index < arr.length; index++) {
    array[index] = arr[index];
  }
  return array
}

module.exports = router;
