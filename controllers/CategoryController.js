'use strict'

var globals = require('../helpers/globals');
var service = globals.importService('DRM');

module.exports.controller = function (app) {
    app
        .get('/category', function (req, res, next) {
            service
                .getCategoryList()
                .then(function (categoryList) {
                    res.json(categoryList);
                })
                .catch(function (err) {
                    console.error('Error occurred:', err);
                    res.json(err);
                });
        })
        .post('/category/', function (req, res, next) {

        })
        .put('/category/:id', function (req, res, next) {

        })
        .delete('/category/:id', function (req, res, next) {

        })
        .post('/category/list/', function (req, res, next) {
			
        })
        .post('/category/add/', function (req, res, next) {
        	
        });
};