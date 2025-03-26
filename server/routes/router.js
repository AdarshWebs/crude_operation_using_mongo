const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller=require('../controller/controller');

// Root route
//method :GET
route.get('/', services.homeRoutes);

// Add user route
//method:GET
route.get('/add-user', services.add_user);

// Update user route
//method :GET update user
route.get('/update-user', services.update_user);

//API making

route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);

module.exports = route;
