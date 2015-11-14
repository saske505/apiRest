var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET Claims page. */
router.get('/claimslist', function(req, res) {
    var db = req.db;
    var collection = db.get('AddressDetails');
    collection.find({},{},function(e,docs){
        res.render('claims', {
            "claimslist" : docs
        });
    });
});

module.exports = router;
