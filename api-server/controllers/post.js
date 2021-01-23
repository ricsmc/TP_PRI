var mongoose = require('mongoose')
var Post = require('../models/post')

// Listar os posts
module.exports.list = ()=> {
    return Post.find().exec()
}

module.exports.lookUp10 = () => {
    return Post.aggregate([{$project:{
        tags:"$tags",_id:"$_id",file:"$file",comment:"$comment",id_user:"$id_user",titulo:"$titulo",descricao:"$descricao",upload_date:"$upload_date",rating:{total:{$sum:{$sum:"$estrelas.rating"}},num:{$size:"$estrelas"}}
    }}]).sort({upload_date : -1})
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

module.exports.countSize = () => {
    return Post.countDocuments({})
}

module.exports.lookUp = p => {
    return Post.aggregate([{"$match":{"_id":new mongoose.Types.ObjectId(p)}},{$project:{
        tags:"$tags",_id:"$_id",file:"$file",comment:"$comment",id_user:"$id_user",titulo:"$titulo",descricao:"$descricao",upload_date:"$upload_date",rating:{total:{$sum:{$sum:"$estrelas.rating"}},num:{$size:"$estrelas"}}
    }}])
}

module.exports.insertNewRating = (p,r) => {
    console.log(r._id)
    return Post.findOneAndUpdate({_id:p, "estrelas._id":{$ne: r._id}} ,{$push:{estrelas:r}},{new:true})
}

module.exports.insertRating = (p,r) => {
    console.log(r._id)
    return Post.findOneAndUpdate({_id:p,'estrelas._id':r._id},{$set:{'estrelas.$.rating':r.rating}},{new:true})
}