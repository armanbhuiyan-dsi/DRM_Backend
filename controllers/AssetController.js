'use strict'

var globals = require('../helpers/globals');
var service = globals.importService('DRM');

module.exports.controller = function (app) {
    app
        .get('/asset', function (req, res, next) {
            service
                .getAssetList()
                .then(function (assetList) {
                    res.json(assetList);
                })
                .catch(function (err) {
                    console.error('Error occurred:', err);
                    res.json(err);
                })
        })
        .post('/asset', function (req, res, next) {
            service
                .addAsset(req.body)
                .then(function (asset) {
                    res.json(asset);
                })
                .catch(function (err) {
                    res.json(err);
                });
        })
        .put('/asset/:id', function (req, res, next) {

        })
        .delete('/asset/:id', function (req, res, next) {

        })
        .post('/asset/add/', function (req, res, next) {
        	service.addAsset(req)
                    .then(function (resp) {
                        res.json(resp);
                    })
                    .catch(function (err) {
                        console.error('Error occurred:', err);
                        res.json(err);
                    });
        })
        .post('/asset/update/', function (req, res, next) {
            service.updateAsset(req.body)
                    .then(function (asset) {
                        res.json(asset);
                    })
                    .catch(function (err) {
                        console.error('Error occurred:', err);
                        res.json(err);
                    });
        })
        .post('/asset/list/', function (req, res, next) {
            service.getAssetList(req)
                    .then(function (assets) {
                        res.json(assets);
                    })
                    .catch(function (err) {
                        console.error('Error occurred:', err);
                        res.json(err);
                    });
        })
        .post('/asset/employee/', function (req, res, next) {
            service.getAssetOwner(req)
                    .then(function (resp) {
                        res.json(resp);
                    })
                    .catch(function (err) {
                        console.error('Error occurred:', err);
                        res.json(err);
                    });
        })
        .post('/asset/assign/', function (req, res, next) {
            service.assignAsset(req)
                    .then(function (resp) {
                        res.json(resp);
                    })
                    .catch(function (err) {
                        console.error('Error occurred:', err);
                        res.json(err);
                    });
        })
        .post('/asset/remove/', function (req, res, next) {
             service.removeAsset(req.body)
                    .then(function (resp) {
                        res.json(resp);
                    })
                    .catch(function (err) {
                        console.error('Error occurred:', err);
                        res.json(err);
                    });
        });
};