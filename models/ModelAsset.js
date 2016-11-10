/**
 * Created by Arman on 10/20/2016.
 */
'use strict';

var DataTypes = require('sequelize')
    ,globals = require('../helpers/globals');

var Asset = globals
            .sequelize
            .define('asset', {
                id: {type: DataTypes.BIGINT(20), allowNull: false, primaryKey: true, unsigned: true, autoIncrement: true},
                name: {type: DataTypes.STRING(255), allowNull: false},
                serialNo: {type: DataTypes.STRING(255), allowNull: true},
                quantity: {type: DataTypes.BIGINT(10), allowNull: false,defaultValue: 1},
                deleted: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
                available: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true}
            }, {
                timestamp: true,
                underscored: true,
                freezeTableName: true,
                tableName: 'asset'
            });

module.exports = Asset;