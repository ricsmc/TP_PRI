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
    .then(data => {
      res.status(200).jsonp(data[0])
    })
    .catch(err => res.status(500).jsonp(err))
});

// Listar todos os "posts" da página :page
router.get('/posts/page/:page', function(req,res,next) {
  PostControl.lookUp10()
    .then(data =>{
      PostControl.countSize()
        .then(da => res.status(200).jsonp({posts : get10elements(req.params.page,data), size: da}))
        .catch(err => res.status(500).jsonp({error:err}))
    })
    .catch(err => res.status(500).jsonp(err))
})

router.put('/posts/comment/:id', (req,res) => {
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



router.put('/posts/rating/:id', function(req, res, next) {
  PostControl.insertNewRating(req.params.id,req.body)
    .then(data => {
      if(data==null){
        PostControl.insertRating(req.params.id,req.body)
          .then(dados => res.status(200).jsonp(dados))
          .catch(err => res.status(500).jsonp({err:err}))
      }
      else{
        res.status(201).jsonp(data)
      }
    })
    .catch(err => res.status(500).jsonp(err))
});



function get10elements(number,arr){
  var array = []
  for (let index = (number-1)*10; index < arr.length; index++) {
    array[index] = arr[index];
  }
  return array
}

module.exports = router;
