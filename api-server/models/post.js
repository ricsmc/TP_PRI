var mongoose = require('mongoose')

var postScheema = new mongoose.Schema({
    id : Number,
    file : String,
    restricitons : String,
    upload_date : Date,
    id_user : String,
    tags : [String],
    estrelas : {
        rating : Number,
        num_ratings : Number
    },
    comment : [{
        id : Number,
        karma : {type:Number, default: 0},
        comment : String,
        id_user : String,
        data : Date,
        res : [{
            id : Number,
            karma : Number,
            response : String,
            id_user : String,
            data : Date
        }]
    }]

})

module.exports = mongoose.model('db' , postScheema)