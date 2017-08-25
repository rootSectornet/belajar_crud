'use strict'

let student = function(code, name, department, age){
	this.code = code
	this.name = name
	this.department = department
	this.age = age
}

module.exports = student