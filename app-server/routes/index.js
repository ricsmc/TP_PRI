var express = require('express');
var router = express.Router();
var axios = require('axios');
var cookieParser = require('cookie-parser')


router.get('/login', function(req,res){
  res.render('login-form');
})

router.post('/login', function(req,res){
  axios.post('http://localhost:7002/users/login', req.body)
    .then(dados => {
      res.cookie("token", dados.data.token, {expire: 3600000 + Date.now()});
      res.redirect('/posts')
    })
    .catch(e => {
      res.render('error', {error:e})
    })
})

/* GET home page. */
router.get('/', (req,res,next) => res.render('index', {}))



router.get('/posts', function(req, res, next) {
  if (!req.cookies.token) return res.status(401).send();
  var t = req.cookies.token;
  axios.get('http://localhost:7001/posts/page/1?token=' + t)
    .then(dados => res.render('tabela_posts', {posts:dados.data, pages:4, current_page:1}))
    .catch(e => res.render('error', {error:e}))
    //var json = [{id:'d9da0wdu', name:'Express',user:'jrc' ,date:'2020', rating:2}, { id:'d94a0wdu',user:'jcr' ,name:'Node', date:'2020', rating:2}];
  
  //res.render('tabela_posts', {posts:json,pages:4, current_page:1});
});

router.get('/posts/:page', function(req, res, next) {
  if (!req.cookies.token) return res.status(401).send();
  var t = req.cookies.token;
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
