var mongoose = require('mongoose')

var notiSchema = new mongoose.Schema({
    post_id: String,
    text: String
})


var userSchema = new mongoose.Schema({
    username : String,
    password : String,
    pic : {type: String, default:""},
    level : {type: String, default:"consumer"},
    filiation : String,
    register_date : {type:Date, default:Date.now},
    desc : {type: String, default:""},
    noti : {type: [notiSchema], default:[]},
    posts : {type: [String], default:[]}

})


module.exports = mongoose.model('user' , userSchema)