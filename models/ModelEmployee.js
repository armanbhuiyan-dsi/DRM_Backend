/**
 * Created by Arman on 10/20/2016.
 */
'use strict';

var DataTypes = require('sequelize')
    ,globals = require('../helpers/globals');

var Employee =  globals
                .sequelize
                .define('employee', {
                    id: {type: DataTypes.BIGINT(20), allowNull: false, primaryKey: true, unsigned: true, autoIncrement: true},
                    firstName: {type: DataTypes.STRING(255), allowNull: false},
                    lastName: {type: DataTypes.STRING(255), allowNull: false},
                    nickName: {type: DataTypes.STRING(255), allowNull: false},
                    phone: {type: DataTypes.BIGINT(15), allowNull: false},
                    email: {type: DataTypes.STRING(255), allowNull: false},
                    designation: {type: DataTypes.STRING(255), allowNull: false},
                    deleted: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
                }, {
                    timestamp: true,
                    underscored: true,
                    freezeTableName: true,
                    tableName: 'employee'
                });

module.exports = Employee;