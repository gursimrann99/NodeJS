var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET users listing. */

router.get('/', function (req, res) {
  fs.readFile('./data.json', (err, response) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send(JSON.parse(response));
    }
  });
});

router.get('/product/:num1/:num2', function (req, res) {
  var number1 = parseInt(req.params.num1);
  var number2 = parseInt(req.params.num2);
  console.log(number1, number2);
  console.log(typeof number1);
  if (isNaN(number1) || isNaN(number2)) {
    res.status(500).send("Please provide numbers only");
  }
  else {
    var product = number1 * number2;
    res.status(200).send(`Product of the numbers is: ${product}`);
  }
});

router.get('/write', function (req, res) {
  fs.readFile('./data.json', (err, response) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      fs.writeFile('./write.json', response);
      res.status(200).send("write.json file created");
    }
  });
});

router.get('/concat/:str', function (req, res) {
  var str = req.params.str;
  var a = [];
  
  for (var i = 0; i < str.length; i++) {
    if (!a.includes(str.charAt(i))) {
      a.push(str.charAt(i));
    }
  }
  res.send(a.join(''));

});



module.exports = router;
