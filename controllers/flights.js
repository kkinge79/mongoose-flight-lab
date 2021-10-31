import { Flight} from '../models/flight.js'

function newFlight(req, res) {
  res.render('flights/new', {
    title: "New Flight",
  })
}


function create(req, res) {
  if(req.body.departs === '') {
  const test = new Flight()
  req.body.departs = test.departs
  }
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

function edit(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    res.render('flights/edit', {
      flight, 
      err,
      title: "Edit Flight"
    })
  })
}

function update(req, res) {
  Flight,findByIdAndUpdate(req.params.id, req.body, function(err, flight) {
    res.redirect(`/flights/${flight._id}`)
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,

}