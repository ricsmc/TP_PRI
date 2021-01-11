var mongoose = require('mongoose')

var userScheema = new mongoose.Schema({
    _id : String,
    password : String,
    pic : String,
    type : String,
    filiation : String,
    register_date : Date,
    desc : String,
    noti : [{
        text : String
    }],
    posts : [String]
})

module.exports = mongoose.model('db' , userScheema)