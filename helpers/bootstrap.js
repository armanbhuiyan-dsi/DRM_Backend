/**
 * Created by Arman on 10/21/2016.
 */
'use strict';

var fs = require('fs')
    ,path = require('path')
    ,globals = require('./globals')
    ,Category = globals.importModel('Category')
    ,Employee = globals.importModel('Employee')
    ,Asset = globals.importModel('Asset');

var initControllers = function (app) {
    var route = null;
    fs.readdirSync(path.resolve(__dirname, '../controllers')).forEach(function (file) {
        if(file.substr(-3) === '.js') {
            route = require('../controllers/' + file);
            route.controller(app);
        }
    });
};

var initModels = function () {
    loadModels();
    globals
        .sequelize
        .sync({force: false})
        .then(function () {
            console.log('Finished database synchronization');
            insertDefaultData();
        })
        .catch(function (err) {
            console.error('Error occurred syncing database:', err);
        });
};

var loadModels = function () {
    fs.readdirSync(path.resolve(__dirname, '../models')).forEach(function (file) {
        if(file.substr(-3) === '.js') {
            require('../models/' + file);
            console.log('Finished loading model:', file);
        }
    });
};

var insertDefaultData = function () {
    console.log('Started inserting default data.');
    var categories = [
        {name: 'Laptop', deleted: false},
        {name: 'Monitor', deleted: false},
        {name: 'HDD', deleted: false},
        {name: 'Accessories', deleted: false},
        {name: 'Others', deleted: false}
    ];

    Category.count().then(function(count){
        if(count == 0){
           Category
            .bulkCreate(categories)
            .then(function () {
                console.log('Successfully finished inserting categories.');
            })
            .catch(function (err) {
                console.error('Error occurred during inserting data:', err);
            }); 
        }
        
    })

    var employees = [
        {firstName: 'John', lastName  : 'Doe', nickName:'John', phone:'+1256975', email:'john@doe.com',designation:'SWE',deleted:false},
        {firstName: 'John', lastName  : 'Oliver', nickName:'Oliver', phone:'+9854669', email:'john@oliver.com',designation:'SWE',deleted:false},
        {firstName: 'John', lastName  : 'Smith', nickName:'Smith', phone:'+984557', email:'smith@doe.com',designation:'SWE',deleted:false},
        {firstName: 'Mark', lastName  : 'Twain', nickName:'Mark', phone:'+789545', email:'john@doe.com',designation:'SWE',deleted:false},
        {firstName: 'Bill', lastName  : 'Taco', nickName:'Bill', phone:'+8801264', email:'bill@doe.com',designation:'SWE',deleted:false},
    ];
    
     Employee.count().then(function(count){
        if(count == 0){
           Employee
            .bulkCreate(employees)
            .then(function () {
                console.log('Successfully finished inserting employees.');
            })
            .catch(function (err) {
                console.error('Error occurred during inserting data:', err);
            }); 
        }
        
    })

     var assets = [
            {name:'Dell Inpiron 17R',serialNo:"54564HG45"},
            {name:'Logitech k120',serialNo:"4564564OI45"},
            {name:'JABRA UC Voice 150a MS',serialNo:"44564HG45"},
            {name:'Dell S2240L',serialNo:"33664HG45"},
            {name:'Logitech B120',serialNo:"7864HG45"},
     ];

     Asset.count().then(function(count){
        if(count == 0){
           Asset
            .bulkCreate(assets)
            .then(function () {
                console.log('Successfully finished inserting assets.');
            })
            .catch(function (err) {
                console.error('Error occurred during inserting data:', err);
            }); 
        }
        
    })
};

var registerStaticResources = function (app, express) {
    app.use(express.static(path.join(__dirname, '../public')));
};

var register404 = function (app) {
    app.use(function (req, res) {
        res.renderClientError();
    });
};

module.exports.initApp = function (app, express) {
    initControllers(app);
    initModels();
    registerStaticResources(app, express);
    register404(app);
};