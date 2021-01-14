var mongoose = require('mongoose')
var User = require('../models/user')

// Listar os users
module.exports.list = ()=> {
    return User.find().exec()
}

// Procurar o user id
module.exports.lookUp = id => {
    return User.findOne({username: id}).exec()
}

module.exports.lookUp10 = p => {
    return User.find().sort({upload_date : -1})
}

// Inserir o user u
module.exports.insert = u => {
    console.log(JSON.stringify(u))
    var newUser = new User(u)
    return newUser.save()
}

// Remover o user id
module.exports.remove = id => {
    return User.deleteOne({_id : id})
}

// Editar o user id para u
module.exports.edit = (id,u) => {
    return User.findByIdAndUpdate(id, u, {new: true})
}


// Funções sobre notificações ---------------

// Inserir Notificação
module.exports.insertNoti = (c,p) => {
    return User.findByIdAndUpdate(p,{$push : c},{new:true})
}