var express = require('express');
var router = express.Router();
var axios = require('axios');

// POSTS ---------------------------------------


// Página de novo post
router.get('/posts/new' , function(req,res,next){
  res.render('novo_post', {access:req.cookies.access});
})


// Post na API com o novo post
router.post('/posts' , function(req,res,next){
  req.body.id_user = req.cookies.access.username
  axios.post('http://localhost:7001/posts?token=' + req.cookies.access.token, req.body)
    .then(dados => res.redirect('/posts/'+ dados.data._id))
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
})


// Remover o post :id
router.get('/posts/remove/:id' , function(req,res,next){
  console.log('oi')
  axios.delete('http://localhost:7001/posts/'+ req.params.id +'?token=' + req.cookies.access.token)
    .then(dados => res.redirect('/posts'))
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
})


// Post na api um novo comentário no post :id
router.post('/posts/comment/:id' , function(req,res,next){
  var json = {comment : {comment: req.body.comment, username: req.cookies.access.username}}
  req.body= json
  axios.put('http://localhost:7001/posts/comment/'+ req.params.id +'?token=' + req.cookies.access.token, req.body)
    .then(dados => res.redirect('/posts/'+ req.params.id))
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
})


// Adicionar novo rating ao post :id
router.post('/posts/rating/:id' , function(req,res,next){
  console.log(req.body)
  req.body._id = req.cookies.access.username
  req.body.rating = parseInt(req.body.rating)
  console.log(req.body)
  axios.put('http://localhost:7001/posts/rating/'+ req.params.id +'?token=' + req.cookies.access.token, req.body)
    .then(dados => res.redirect('/posts/'+ req.params.id))
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
})


// Busca da primeira página de posts
router.get('/posts', function(req, res, next) {
  if (!req.cookies.access.token)  res.redirect('/login')
  var t = req.cookies.access.token;
  axios.get('http://localhost:7001/posts/page/1?token=' + t)
    .then(dados => {
      var paginas = (dados.data.size / 10)+1
      res.render('tabela_posts', {posts:dados.data.posts, pages:paginas, current_page:1,access:req.cookies.access})
    })
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
 });


// Busca do post :id
router.get('/posts/:id', function(req, res, next) {
  console.log(req.cookies.access)
 if (!req.cookies.access.token)  res.redirect('/login')
 var t = req.cookies.access.token;
 axios.get('http://localhost:7001/posts/'+ req.params.id + '?token=' + t)
   .then(dados => res.render('single_post', {post:dados.data, access:req.cookies.access}))
   .catch(e => res.render('error', {error:e,access:req.cookies.access}))
});


// Busca da página de posts :page
router.get('/posts/page/:page', function(req, res, next) {
  if (!req.cookies.access.token) res.redirect('/login')
  var t = req.cookies.access.token;
  axios.get('http://localhost:7001/posts/page/'+ req.params.page + '?token=' + t)
    .then(dados => {
      var paginas = (dados.data.size / 10)+1
      res.render('tabela_posts', {posts:dados.data.posts , pages:paginas, current_page:req.params.page,access:req.cookies.access})

    })
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
});



// USERS   ---------------------------------------


router.get('/user/:id', function(req, res, next) {
  if (!req.cookies.access.token)  res.redirect('/login')
  var page;
  if (req.query.page==null) {page = 1}
  else {page = req.query.page}
  axios.get('http://localhost:7002/users/' + req.params.id)
    .then(da => {
      axios.get('http://localhost:7001/posts/user/'+ req.params.id + '?page='+ page +'&token=' + req.cookies.access.token)
        .then(dados => {
          var paginas = (dados.data.size / 10)+1
          res.render('user_page', {user:da.data,posts:dados.data.posts , pages:paginas, current_page:req.params.page,access:req.cookies.access})
        
      })
      .catch(e => res.render('error', {error:e,access:req.cookies.access}))
    })
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
});

// LOGIN   ---------------------------------------


// Página de login
router.get('/login', function(req,res){
  res.render('login-form');
})


// Post no auth-server de login
router.post('/login', function(req,res){
  axios.post('http://localhost:7002/users/login', req.body)
    .then(dados => {
      res.cookie("access", dados.data, {expire: 300000 + Date.now()});
      res.redirect('/posts')
    })
    .catch(e => {
      res.render('error', {error:e})
    })
})


// REGISTO ---------------------------------------


// Página de registo bem sucedido
router.get('/register/success', function(req,res){
  res.render('register-success');
})


// Página de registo
router.get('/register', function(req,res){
  res.render('register-form');
})


// Post no api-server do registo novo
router.post('/register', function(req,res){
  if (req.body.password != req.body.cpassword) { 
    res.render('register-form', {cpassword:"Passwords não são iguais"});
  }
 else{
  axios.post('http://localhost:7002/users', {username:req.body.username, password:req.body.password, filiation:req.body.filiation})
    .then(dados => {
      res.redirect('/register/success')
    })
    .catch(e => {
      if(e.response.data.message){
        res.render('register-form', {username:"Username já existe"});
      }
      else {
        res.render('error', {error:e})
      }
      
    })
 }
})

/* GET home page. */
router.get('/', (req,res,next) => res.render('index', {access:req.cookies.access}))

module.exports = router;
