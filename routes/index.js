var express = require('express');
var router = express.Router();
// shiftsells
var stripe = require("stripe")("sk_test_2ruDKszfpWkMJm81cYCCkXMc");
// var stripe = require("stripe")("sk_test_nFw0AZ4sAjWEywitkgfg6WEK00UTMHXtxV");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// charge
router.post("/charge", (req, res) => {
  console.log('------------------', req.body, '-----------------')
  var token = req.body.token;
  var email = req.body.email;
  var name = req.body.name;
  var amount = req.body.amount;
  fun();
  function fun(){
    const charge = stripe.charges.create({
      source: token,
      amount: amount,
      currency: 'usd',
    } ,function(err, charge) {
      // asynchronously called
      console.log(err,charge);
      res.json({data:charge,err:err})
    })
  }
})
module.exports = router;
