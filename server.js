const express = require('express')
const app = express()
const port = 3000
const db = require('./database');
let mongoose = require('mongoose');

//used to get params from postman
const bodyParser = require('body-parser');
const { createIndexes } = require('./carModel');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const carsSchema = new mongoose.Schema({
  car: String,
  model: String,
  year: Number
});
const Cars = mongoose.model('cars', carsSchema);

app.get('/', (req, res) => {
    Cars.find({}).then(function (cars) {  
      res.send(cars);
      res.end()
      });
});  

app.post('/cars', (req, res) => {
  let nameCar = req.body.car; 
  let modelCar =req.body.model; 
  let yearCar = req.body.year; 

  // a document instance
  var carsSave = new Cars({ car: nameCar, model: modelCar, year: yearCar});

  carsSave.save(function (err, Cars) {
    if (err) return console.error(err);
      console.log("records saved");
  });
  res.send("records created");
  res.end();

});  

app.put('/updateCar', (req, res) => {
  let idCar = req.body.id; 
  let nameCar = req.body.car; 
  let modelCar =req.body.model; 
  let yearCar = req.body.year

    Cars.updateOne({_id: idCar},
    {
      $set: {
        "car": nameCar,
        "model": modelCar,
        "year": yearCar,
      }
    }, (err) => {
      if(err) {
        console.error(err);
      } else {
        console.log("successfully updated");
      }
    })

res.send("Updated Records");
res.end();
});  

app.delete('/deleteCar', (req, res) => {
  let idCar = req.body.id; 

  Cars.deleteOne({ _id: idCar }, function(err) {
    if (!err) {
           console.log("Record delete");
           res.send("Record delete");
    }
    else {
      console.log("Error");
      res.send("error");
    }
    res.end();
  });

});  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})