var mongoose = require('mongoose')

var postScheema = new mongoose.Schema({
    id : Number,
    file : String,
    restricitons : String,
    upload_date : {type:Date, default: Date.now},
    id_user : String,
    tags : [String],
    estrelas : {
        rating : {type:Number, default: 0},
        num_ratings : {type:Number, default: 0}
    },
    comment : [{
        id : Number,
        karma : {type:Number, default: 0},
        comment : String,
        id_user : String,
        data : {type:Date, default: Date.now},
        res : [{
            id : Number,
            karma : {type:Number, default: 0},
            response : String,
            id_user : String,
            data : {type:Date, default: Date.now}
        }]
    }]

})

module.exports = mongoose.model('db' , postScheema)