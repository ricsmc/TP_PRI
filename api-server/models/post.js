var mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
    comment : String,
    username : String,
    data : {type:Date, default: Date.now},
})

var postSchema = new mongoose.Schema({
    type : String,
    titulo: String,
    descricao: String,
    file : String,
    restricitons : String,
    upload_date : {type:Date, default: Date.now},
    id_user : String,
    tags : {type: [String], default:[]},
    estrelas : {
        rating : {type:Number, default: 0},
        num_ratings : {type:Number, default: 0}
    },
    comment : {type: [commentSchema], default:[]}
})

module.exports = mongoose.model('db' , postSchema)