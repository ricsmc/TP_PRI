var express = require('express');
var router = express.Router();
var axios = require('axios');

if( typeof localStorage === "undefined" || localStorage === null){
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./localState');
}

router.post('/localTest', function(req,res){
  localStorage.setItem('teste', 'Isto é um teste');
  res.jsonp('Teste criado');
})

router.get('/localTest', function(req,res){
  res.jsonp(res.jsonp(localStorage.getItem('teste')));
})

router.get('/login', function(req,res){
  res.render('login-form');
})

router.post('/login', function(req,res){
  axios.post('http://localhost:7002/users/login', req.body)
    .then(dados => {
      localStorage.setItem('myToken', dados.data.token);
      res.redirect('/posts')
    })
    .catch(e => {
      res.render('error', {error:e})
    })
})

/* GET home page. */
router.get('/', (req,res,next) => res.render('index', {}))



router.get('/posts', function(req, res, next) {
  var t = localStorage.getItem('myToken');
  axios.get('http://localhost:7001/posts/page/1?token=' + t)
    .then(dados => res.render('tabela_posts', {posts:dados.data, pages:4, current_page:1}))
    .catch(e => res.render('error', {error:e}))
    //var json = [{id:'d9da0wdu', name:'Express',user:'jrc' ,date:'2020', rating:2}, { id:'d94a0wdu',user:'jcr' ,name:'Node', date:'2020', rating:2}];
  
  //res.render('tabela_posts', {posts:json,pages:4, current_page:1});
});

router.get('/posts/:page', function(req, res, next) {
  var t = localStorage.getItem('myToken');
  axios.get('http://localhost:7001/posts/page/'+ req.params.page + '?token=' + t)
    .then(dados => {
      console.log('Data recebida : ' + dados.data.upload_date)
      res.render('tabela_posts', {posts:dados.data , pages:4, current_page:req.params.page})

  })
    .catch(e => res.render('error', {error:e}))
  //var json = [{id:'d9da0wdu', name:'Express',user:'jrc' ,date:'2020', rating:2}, { id:'d94a0wdu',user:'jcr' ,name:'Node', date:'2020', rating:2}];
  //res.render('tabela_posts', {posts:json,pages:40, current_page:req.params.page});
});

module.exports = router;
