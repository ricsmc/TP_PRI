var express = require('express');
const { route } = require('../app');
var router = express.Router();

var UserControl = require('../controllers/db')

// Listar BD
router.get('/users', function(req, res, next) {
  UserControl.list()
    .then(data => res.status(200).jsonp(data))
    .catch(err => res.status(500).jsonp(err))
});

// Procurar user :id
router.get('/users/:id', function(req, res, next) {
  UserControl.lookUp(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(err => res.status(500).jsonp(err))
});

// Listar todos os "posts" da página :page
router.get('/posts/:page', function(req,res,next) {
  var postArray = []
  UserControl.list()
    .then(data =>{
      data.forEach(element => {
        console.log(element.id)
        element.posts.forEach(e => {
          e.set('user', element.id, {strict: false})
          console.log(e)
          postArray.push(e)
        });
      });
      postArray.sort(sortByProperty("upload_date"))
      res.status(200).send(get10elements(req.params.page,postArray))
    })
    .catch(err => res.status(500).jsonp(err))
})
  
// Post user
router.post('/users', (req,res) => {
  UserControl.insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(err => res.status(500).jsonp(err))
})

// Post "post"
router.post('/users/:id', (req,res) => {
  
})

router.delete('/users/:id' , (req, res) => {
  UserControl.remove(req.params.id)
    .then(data => res.status(201).jsonp(data))
    .catch(err => res.status(500).jsonp(err))
})

router.put('/users/:id', (req,res) => {
  UserControl.edit(req.params.id, req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(err => res.status(500).jsonp(err))
})

function sortByProperty(property){  
  return function(a,b){  
     if(a[property] > b[property])  
        return -1;  
     else if(a[property] < b[property])  
        return 1;  
 
     return 0;  
  }  
}

function get10elements(number,arr){
  var array = []
  for (let index = (number-1)*10; index < arr.length; index++) {
    array[index] = arr[index];
  }
  return array
}

module.exports = router;
