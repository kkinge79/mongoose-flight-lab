import { Flight} from '../models/flight.js'

import { Destination } from '../models/destination.js'

function newFlight(req, res) {
  res.render('flights/new', {
    title: "New Flight",
  })
}


function create(req, res) {
for(let key in req.body){
  if(req.body[key] === ""){
    delete req.body[key]
  }
}
const flight = new Flight(req.body)
Flight.create(req.body, function(error, flight) {
  if (error) {
    return res.redirect(`/flights/new`)
  }
  res.redirect(`/flights/${flight._id}`)
  })
}


function index(req, res) {
  Flight.find({}, function(err, flights) {
    res.render('flights/index', {
      err: err,
      allFlights: flights,
      title: "All Flights"
    })
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('destination')
  .exec(function(err, flight) {
    Destination.find({_id: {$nin: flight.destination}}, 
    function(err, destinations){
    res.render('flights/show', {
      title: 'Flight Details',
      flight: flight,
      destinations,
      })
    })
  })
}

// function show(req, res) {
//   Flight.findById(req.params.id)
//   .populate("destination")
//   .exec(function(err, flight){
//     Destination.find({_id: {$nin: flight.destination}}, function(err, destinations) {
//     res.render("flights/show", {
//       title: `${flight.title}'s Details`,
//       flight,
//       destinations
//       })
//     })
//   })
// }

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function(err, flight) {
    res.redirect('/flights')
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.ticket.push(req.body)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function deleteTicket(req, res) {
Flight.findById(req.params.id, function(err, flight) {
  flight.ticket.remove({_id: req.params.ticketid})
  flight.save(function(err) {
    res.redirect(`/flights/${flight._id}`)
  })
})
}

function addtoDestination(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.destination.push(req.body.destinationId)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })  
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  createTicket,
  deleteTicket,
  addtoDestination
}