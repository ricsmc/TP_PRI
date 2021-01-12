var mongoose = require('mongoose')
var Post = require('../models/post')

// Listar os posts
module.exports.list = ()=> {
    return Post.find().exec()
}

// Procurar o post id
module.exports.lookUp = id => {
    return Post.findOne({_id: id}).exec()
}

module.exports.lookUp10 = p => {
    return Post.find().sort({upload_date : -1})
}

// Inserir o post u
module.exports.insert = u => {
    console.log(JSON.stringify(u))
    var newPost = new Post(u)
    return newPost.save()
}

// Remover o post id
module.exports.remove = id => {
    return Post.deleteOne({_id : id})
}

// Editar o post id para u
module.exports.edit = (id,u) => {
    return Post.findByIdAndUpdate(id, u, {new: true})
}


//Funções sobre comentários ---------------
module.exports.insertComment = (c,p) => {
    return Post.findByIdAndUpdate(p,{$push : c},{new:true})
}