var mongoose = require('mongoose')

var notiSchema = new mongoose.Schema({
    post_id: String,
    text: String
})

var userSchema = new mongoose.Schema({
    username : String,
    password : String,
    pic : String,
    type : String,
    filiation : String,
    register_date : {type:Date, default:Date.now},
    desc : String,
    noti : {type: [notiSchema], default:[]},
    posts : {type: [String], default:[]}
})



module.exports = mongoose.model('db' , userSchema)