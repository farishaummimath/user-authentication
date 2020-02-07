const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    start_date : {
        type : Date,
        required : true
    },
    end_date : {
        type : Date,
        required : true,
        validate : {
            validator : function(end_date){
                return end_date > this.start_date
            },
            message : function(){
                return ('Invalid date : end_date less than start_date')
            }

        }
    }
})
const Booking = mongoose.model('Booking',bookingSchema)
module.exports = Booking