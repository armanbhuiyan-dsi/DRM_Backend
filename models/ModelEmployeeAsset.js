/**
 * Created by Arman on 10/20/2016.
 */
'use strict';

var DataTypes = require('sequelize')
    ,globals = require('../helpers/globals')
    ,Employee = globals.importModel('Employee')
    ,Asset = globals.importModel('Asset');

var EmployeeAsset = globals
                    .sequelize
                    .define('employeeAsset', {
                        
                    }, {
                        timestamp: true,
                        underscored: true,
                        freezeTableName: true,
                        tableName: 'employeeAsset'
                    });

Employee.belongsToMany(Asset, {through: EmployeeAsset});
Asset.belongsToMany(Employee, {through: EmployeeAsset});

module.exports = EmployeeAsset;