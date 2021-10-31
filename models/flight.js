import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ticketSchema = new Schema ({
  seat: {type: String, match: /[A-F][1-9]\d?/},
  price: {type: Number, min:0}
})

const flightSchema = new Schema({
  airline: String,
  airport: {type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], default: "DEN"},
  flightNo: {type: Number, required: true},
  departs: Date,
  ticket: [ticketSchema]
  // departs: {type: Date, default: function() {
  //   const date = new Date()
  //   const addOne = date.getFullYear()+1
  //   date.setFullYear(addOne)
  //   return date
  // }, }
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}