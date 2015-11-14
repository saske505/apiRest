var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jsrender = require('jsrender');
var mongo = require('mongodb');
var mongoose = require('mongoose');

//mongoose.connect('mongodb://kpobelixdevdw:27000/offlineAppDB');
mongoose.connect('mongodb://localhost:27017/offlineAppDB');
var expressMongoRest = require('express-mongo-rest')
var routes = require('./routes/index');
var users = require('./routes/users');
var claims = require('./routes/claims');

var handlebars = require('handlebars');


var app = express();
app.use('/api/v1', expressMongoRest('mongodb://localhost:27017/offlineAppDB'));
var server = app.listen(3001, function () {
    console.log('Listening on Port', server.address().port)
})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function (callback) {
// yay!
 console.log('connected to mongo');
 var collectionAddress = db.collection('AddressDetails');
 collectionAddress.find().toArray(function(err, collectionAddress) {
        console.log(collectionAddress);
   });
//   var AddressDetailsSchema = mongoose.Schema({
//  CustomerDetailId: Number
// , AddressLine1: String
// , AddressLine2: String
// , Suburb: String
// , Province: String
// , PostalCode: String
// , IsDefault: Boolean
// },{collection: 'AddressDetails'});
//
// var AddressDetails = mongoose.model('AddressDetails', AddressDetailsSchema);
//
// // Find all addresses
// AddressDetails.find(function(err, AddressDetails) {
//   if (err) return console.error(err);
//   console.dir(AddressDetails);
// });
// var testAddress = new AddressDetails({
//  CustomerDetailId: 12321321321
// , AddressLine1: 'testasdasd'
// , AddressLine2: null
// , Suburb: 'Gaultend'
// , Province: 'Gaultend'
// , PostalCode: '0154'
// , IsDefault: true
// });
//
// testAddress.save(function(err, testAddress) {
//   if (err) return console.error(err);
//   console.dir(testAddress);
// });
//
});
//
mongoose.connect('mongodb://kpobelixdevdw:27000/offlineAppDB');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});
app.use('/', routes);
app.use('/users', users);
app.use('/claims', claims);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
