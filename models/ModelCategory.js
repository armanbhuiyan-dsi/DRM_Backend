/**
 * Created by Arman on 10/21/2016.
 */
'use strict';

var DataTypes = require('sequelize')
    ,globals = require('../helpers/globals')
    ,Asset = globals.importModel('Asset');

var Category =  globals
                .sequelize
                .define('category', {
                    id: {type: DataTypes.BIGINT(20), allowNull: false, primaryKey: true, unsigned: true, autoIncrement: true},
                    name: {type: DataTypes.STRING(255), allowNull: false},
                    deleted: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
                }, {
                    timestamp: true,
                    underscored: true,
                    freezeTableName: true,
                    tableName: 'category'
                });

Category.hasMany(Asset);

module.exports = Category;