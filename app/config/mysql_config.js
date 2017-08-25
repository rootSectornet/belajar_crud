'use strict';

let mysql = require('mysql')

let connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : 'belajar_node1'
})

connection.connect()

module.exports = connection