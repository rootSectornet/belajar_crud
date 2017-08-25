'use strict'

let  student = require('../domains/student')

let studentrepository = function(db){
	this.db = db
}

studentrepository.prototype = {
	save : function(s, cb, errCb){
		let db = this.db
		let data = {code: s.code, name: s.name, department: s.department, age: s.age}
		let query = 'INSERT INTO student SET ?'
		db.query(query, data, (err, results) => {
			if (err) {
				errCb(err)
			}
			cb(results)
		})
	},

	update : function(s, cb, errCb){
		let db = this.db
		let data = [s.name, s.department, s.age, s.code]
		let query = 'UPDATE student SET name = ?, department = ?, age = ? WHERE code = ?'
		db.query(query, data, (err, results) => {
			if (err) {
				errCb(err)
			}
			cb(results)
		})
	},

	delete : function(code, cb, errCb){
		let db = this.db
		let query = 'DELETE FROM student WHERE code = ?'
		db.query(query, [code], (err, results) => {
			if (err) {
				errCb(err)
			}
			cb(results)
		})
	},

	findone : function(code, cb, errCb){
		let db = this.db
		let query = 'SELECT * FROM student WHERE code = ? '
		db.query(query, [code], (err, results, fields) => {
			if (err) {
				errCb(err)
			}
			if (!results) {
				cb('Data dengan code , tidak di temukan')
			}else{
				let s = results[0]
				let tampil = new student(s.code, s.name, s.department, s.age)
				cb(tampil)
			}
		})
	},

	findAll : function(cb, errCb){
		let db = this.db
		let query = 'SELECT * FROM student'
		db.query(query, (err, results, fields) => {
			if (err) {
				errCb(err)
			}
			if (!results) {
				cb('tabel student kosong')
			}else{
				let studentArray = []
				for(let i=0; i<results.length; i++){
					let s = results[i]
					let tampil = new student(s.code, s.name, s.department, s.age)
					studentArray.push(tampil)
				}
				cb(studentArray)
			}
		})
	}
}

module.exports = studentrepository