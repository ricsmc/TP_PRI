var mongoose = require('mongoose')
var User = require('../models/user')

// Listar os users
module.exports.list = ()=> {
    return User.find().exec()
}

// Procurar o user id
module.exports.lookUp = id => {
    return User.findOne({_id: id}).exec()
}

// Inserir o user u
module.exports.insert = u => {
    console.log(JSON.stringify(u))
    var newUser = new User(u)
    return newUser.save()
}

// Inserir o "post" p no user :id
module.exports.insertPost = (u,id) => {
    console.log(JSON.stringify(u))
    return User.findByIdAndUpdate(id, u, {new : true})
}

// Remover o user id
module.exports.remove = id => {
    return User.deleteOne({_id : id})
}

// Editar o user id para u
module.exports.edit = (id,u) => {
    return User.findByIdAndUpdate(id, u, {new: true})
}