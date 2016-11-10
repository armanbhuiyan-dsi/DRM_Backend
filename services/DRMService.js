/**
 * Created by Arman on 10/21/2016.
 */
'use strict';

var globals = require('../helpers/globals')
    ,Employee = globals.importModel('Employee')
    ,Asset = globals.importModel('Asset')
    ,Category = globals.importModel('Category')
    ,arrayWrap = require('arraywrap');

module.exports = {
	/*******Employee Section*******/
	getEmployee : function (){

	},
	getEmployeeList : function(){
		return Employee.findAll({
		  include: [{
		    model: Asset,
		    through: {
		      attributes: ['id', 'name']
		    }
		  }]
		});
	},
	removeEmployee : function(employeeData){
		if(employeeData.assetIds){
			return Employee.findById(employeeData.id)
						   .then(function(employee){
							return Asset.findAll({where:{id:employeeData.assetIds}})
										.then(function(assets){
											return employee.removeAssets(assets)
														.then(function(){
															var query='UPDATE asset SET available=true WHERE id in ('+employeeData.assetIds.join(',')+')';
															return globals.sequelize.query(query).spread(function(results, metadata) {
																return Employee.destroy({
																		    where: {
																		        id:employeeData.id
																		    }
																		});
															})
															
														})	
										})
			})
		}else{
			return Employee.destroy({
			    where: {
			        id:employeeData.id
			    }
			});
		}
	},
	addEmployee : function(employeeData) {
		return Employee
			.create(employeeData)
			.then(function (employee) {
				if(employeeData.assetId.length>0) {
					return Asset
						.findAll({where:{id:employeeData.assetId}})
						.then(function (assets) {
							return employee
								.addAssets(assets)
								.then(function (joinedData) {
									var query='UPDATE asset SET available=false WHERE id in ('+employeeData.assetId.join(',')+')';
									return globals.sequelize.query(query).spread(function(results, metadata) {

													}).then(function(asset) {
													return Employee.find( {
												            where: {
												                id: employee.id
												            },
												            include: [{
														    model: Asset,
														    through: {
														      attributes: ['id', 'name']
														    }
														  }]
												        })
												}).catch(function (err) {
													throw new Error(err);
												});
								})
								.catch(function (err) {
									throw new Error(err);
								})
						})
				} else {
					 return Employee.find( {
												where: {
													id: employee.id
												    },
												    include: [{
													model: Asset,
														    through: {
														      attributes: ['id', 'name']
														    }
														  }]
												});
				}
				
			})
	},
	updateEmployee : function(employeeData){
		if(employeeData.assetsUpdated){
			    return Employee.find( {
			            where: {
			                id: employeeData.id
			            }
			        })
		 			.then(function(employee){
		 				return Asset.findAll({where:{id:employeeData.removedAssets}})
		 				     .then(function(assets){
		 				     	employee.removeAssets(assets)
		 						.then(function(){
		 						        return Asset.findAll({where:{id:employeeData.assetId}})
		 						             .then(function(assets){
								        	     return employee.addAssets(assets)
								        	     		        .then(function(){
								        	     		        	var query = "UPDATE asset SET available= CASE";
								        	     		        	if(employeeData.removedAssets.length >0)
								        	     		        		query+=" WHEN id IN ("+employeeData.removedAssets.join(',')+") THEN TRUE";
								        	     		        	if(employeeData.assetId.length >0)
								        	     		        		query+=" WHEN id IN ("+employeeData.assetId.join(',')+") THEN FALSE";	 
								        	     		        	query+=" ELSE available  END";
								        	     		        	return globals.sequelize.query(query).spread(function(results, metadata) {

																	}).then(function(){
																		return Employee.find( {
																            where: {
																                id: employeeData.id
																            },
																            include: [{
																		    model: Asset,
																		    through: {
																		      attributes: ['id', 'name']
																		    }
																		  }]
																        }) 
																	})
								        	     		        }).catch(function (err) {
																		throw new Error(err);
																});
								        })
		 						 		.catch(function (err) {
				 						 			throw new Error(err);
										});
		 					}).catch(function (err) {
		 							throw new Error(err);
							});
		 				})	
		 			})
		}else{
			return Employee.update(employeeData, {
	            where: {
	                id: employeeData.id
	            }
	        }).then(function(employee){
	        	return Employee.find( {
			            where: {
			                id: employeeData.id
			            },
			            include: [{
					    model: Asset,
					    through: {
					      attributes: ['id', 'name' ]
					    }
					  }]
			        });
	        });
		}

	},
	getEmployeeAssets : function(){

	},

	/*******Asset Section*******/
	getAsset : function (){

	},
	getAssetList : function(){
		return Asset.findAll({
		  include: [{
		    model: Employee,
		    through: {
		      attributes: ['id', 'firstName', 'lastName','NickName']
		    }
		  }]
		});
	},
	addAsset : function(assetData){
		return Asset
			.create(assetData)
			.then(function (asset) {
				if(assetData.employeeId) {
					return Employee
						.findById(assetData.employeeId)
						.then(function (employee) {
							return asset
								.addEmployee(employee)
								.then(function (joinedData) {
									return asset.update({
										 		 available: 0
												}).then(function(asset) {
													return Asset.find( {
												            where: {
												                id: asset.id
												            },
												            include: [{
														    model: Employee,
														    through: {
														      attributes: ['id', 'firstName', 'lastName','NickName']
														    }
														  }]
												        })
												}).catch(function (err) {
													throw new Error(err);
												});
								})
								.catch(function (err) {
									throw new Error(err);
								})
						})
				}else {

					return Asset.find( {
			            where: {
			                id: asset.id
			            },
			            include: [{
					    model: Employee,
					    through: {
					      attributes: ['id', 'firstName', 'lastName','NickName']
					    }
					  }]
			        })
				}

			})
	},
	updateAsset : function(assetData){
		 if(assetData.employeeChanged){
		 	return Asset.find( {
			            where: {
			                id: assetData.id
			            }
			        })
		 			.then(function(asset){
		 				return Employee.findById(assetData.employeeId)
		 				.then(function(employee){
		 					 return asset.setEmployees([employee])
		 					.then(function(){
		 						  return Asset.update(assetData, {
								            where: {
								                id: assetData.id
								            }
								        }).then(function(){
								        	return Asset.find( {
										            where: {
										                id: assetData.id
										            },
										            include: [{
												    model: Employee,
												    through: {
												      attributes: ['id', 'firstName', 'lastName','NickName']
												    }
												  }]
										        })
										 })
		 						 		.catch(function (err) {
													throw new Error(err);
										});
		 					}).catch(function (err) {
								throw new Error(err);
							});
		 				}).catch(function (err) {
								throw new Error(err);
						});	
		 			})
		}else{
			return Asset.update(assetData, {
	            where: {
	                id: assetData.id
	            }
	        }).then(function(asset){
	        	return Asset.find( {
			            where: {
			                id: assetData.id
			            },
			            include: [{
					    model: Employee,
					    through: {
					      attributes: ['id', 'firstName', 'lastName','NickName']
					    }
					  }]
			        })
	        });
			
		}
	},
	getAssetOwner : function(){

	},
	assignAsset : function(req){
		
	},
	removeAsset : function (assetData){
		if(assetData.employeeId){
			return Employee.findById(assetData.employeeId)
						   .then(function(employee){
							return Asset.findById(assetData.id)
										.then(function(asset){
											return asset.removeEmployee(employee)
														.then(function(){
															return Asset.destroy({
																	    where: {
																	        id:assetData.id
																	    }
																	});
														})	
										})
			})
		}else{
			return Asset.destroy({
			    where: {
			        id:assetData.id
			    }
			});
		}
	},

	/*******Category Section*******/
	getCategoryList : function(){
		return Category.findAll();
	}
};