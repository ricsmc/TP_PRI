var mongoose = require('mongoose')

var dbScheema = new mongoose.Schema({
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
    post : [{
        id : Number,
        file : String,
        restricitons : String,
        upload_date : Date,
        tags : [String],
        estrelas : Number,
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

module.exports = mongoose.model('db' , dbScheema)