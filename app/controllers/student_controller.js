'use strict'

let db = require('../config/mysql_config')
let studentrepo = require('../repositories/student_repository')
let student = require('../domains/student')

let saveStudentShowForm = (req, res, next) => {
	res.render('new_student', {'title' : 'add new student'})
}

let saveStudent = (req, res, next) => {
	if (!req.body) {
		next('semua field harus di isi...')
	}
	let data = req.body
	let Student = new student(data.code, data.name, data.department, parseInt(data.age))
	let Studentrepo = new studentrepo(db)
	Studentrepo.save(Student, result => {
		res.redirect('/')
	}, err => {
		if (err) {
			next(err)
		}
	})
}

let updateStudentShowform = (req, res, next) => {
	if (!req.params) {
		next('params code tidak ada')
	}
	let code = req.params.code
	let Studentrepo = new studentrepo(db)
	Studentrepo.findone(code, result => {
		res.render('update_student', {'student' : result, 'title' : 'Update Student'})		
	}, err => {
		if (err) {
			next(err)
		}
	})
}

let updateStudent = (req, res, next) => {
	if (!req.params) {
		next('params code tidak ada')
	}
	let data = req.body
	let Student = new student(data.code, data.name, data.department, parseInt(data.age))
	let Studentrepo = new studentrepo(db)
	Studentrepo.update(Student, result => {
		res.redirect('/')
	}, err => {
		if (err) {
			next(err)
		}
	})
}

let deleteStudent = (req, res, next) => {
	if (!req.params) {
		next('params code tidak ada')
	}
	let code  = req.params.code
	let Studentrepo = new studentrepo(db)
	Studentrepo.delete(code, result => {
		res.redirect('/')
	}, err => {
		if (err) {
			next(err)
		}
	})
}

let getStudent = (req, res, next) => {
	if (!req.params) {
		next('params  tidak ada')
	}
	let code = req.params.code
	let Studentrepo = new studentrepo(db)
	Studentrepo.findone(code, result => {
		res.render('student_detail', {'student' : result, 'title' : 'Update Student'})		
	}, err => {
		if (err) {
			next(err)
		}
	})
}

let getAllStudent = (req, res, next) => {
	let Studentrepo = new studentrepo(db)
	Studentrepo.findAll(results => {
		res.render('index', {'students' : results, 'title' : 'Student List'})
	}, err => {
		if (err) {
			next(err)
		}
	})
}

module.exports = {
	saveStudentShowForm : saveStudentShowForm,
	saveStudent : saveStudent,
	updateStudentShowform : updateStudentShowform,
	updateStudent : updateStudent,
	deleteStudent : deleteStudent,
	getStudent : getStudent,
	getAllStudent : getAllStudent
}