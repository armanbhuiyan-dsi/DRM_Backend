/**
 * Created by Arman on 10/21/2016.
 */
'use strict'

var globals = require('../helpers/globals');
var service = globals.importService('DRM');

module.exports.controller = function (app) {
    app
        .get('/employee', function (req, res, next) {
        	service
                .getEmployeeList()
                .then(function (employeeList) {
                    res.json(employeeList);
                })
                .catch(function (err) {
                    console.error('Error occurred:', err);
                    res.json(err);
                });
        })
        .post('/employee', function (req, res, next) {
            service
                .addEmployee(req.body)
                .then(function (employee) {
                    res.json(employee);
                })
                .catch(function (err) {
                    res.json(err);
                });
        })
        .put('/employee/:id', function (req, res, next) {

        })
        .delete('/employee/:id', function (req, res, next) {

        })
        .post('/employee/list/', function (req, res, next) {
        	
        })
        .post('/employee/add/', function (req, res, next) {
        	service.addEmployee(req)
                    .then(function (resp) {
                        res.json(resp);
                    })
                    .catch(function (err) {
                        console.error('Error occurred:', err);
                        res.json(err);
                    });
        })
        .post('/employee/update/', function (req, res, next) {
            service.updateEmployee(req.body)
                    .then(function (resp) {
                        res.json(resp);
                    })
                    .catch(function (err) {
                        console.error('Error occurred:', err);
                        res.json(err);
                    });
        })
        .post('/employee/remove/', function (req, res, next) {
            service.removeEmployee(req.body)
                    .then(function (resp) {
                        res.json(resp);
                    })
                    .catch(function (err) {
                        console.error('Error occurred:', err);
                        res.json(err);
                    });
        });
};