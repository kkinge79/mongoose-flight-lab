import { Flight} from '../models/flight.js'

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
  res.redirect('/flights')
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
  Flight.findById(req.params.id, function (err, flight) {
    res.render('flights/show', {
      title: 'Flight Details',
      flight: flight,
    })
  })
}

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

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  createTicket,
  deleteTicket,
}