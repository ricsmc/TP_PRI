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
    posts : [{
        id : Number,
        file : String,
        restricitons : String,
        upload_date : Date,
        tags : [String],
        estrelas : {
            rating : Number,
            num_ratings : Number
        },
        comment : [{
            id : Number,
            karma : Number,
            comment : String,
            id_user : String,
            res : [{
                id : Number,
                karma : Number,
                response : String,
                id_user : String
            }]
        }]
    }]

})

module.exports = mongoose.model('db' , userScheema)