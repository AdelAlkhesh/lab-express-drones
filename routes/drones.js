const express = require('express');
const router = express.Router();

// require the Drone model here
const DroneModel = require('../models/Drone.model')

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  DroneModel.find()
    .then((drones) => {
    res.render('drones/list', {drones})
    })
    .catch(() => {
    next('drone find failed')
  })
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form')
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  DroneModel.create(req.body)
    .then(() => {
      
      res.redirect("/drones");
    })
    .catch(() => {
      res.render('drones/create');
    });
});

router.get('/drones/:droneId/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { droneId } = req.params;
  DroneModel.findById(droneId)
    .then((drone) => {
      res.render("drones/update-form", { drone });
    })
    .catch(() => {
      next("failed to fetch drone");
    });
});

router.post('/drones/:droneId/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { name, propellers, maxSpeed } = req.body;
  const { droneId } = req.params;
  DroneModel.findByIdAndUpdate(droneId, { name, propellers, maxSpeed })
    .then((drone) => {
      //render some HBS file with that to do information
      res.redirect("/drones");
    })
    .catch(() => {
      next("failed to update drone");
    });
});

router.post('/drones/:droneId/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const { droneId } = req.params;
  DroneModel.findByIdAndDelete(droneId)
    .then((drone) => {
      //render some HBS file with that to do information
      res.redirect("/drones");
    })
    .catch(() => {
      next("Failed to delete Drone");
    });
});

module.exports = router;
