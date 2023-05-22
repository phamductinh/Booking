let mysql = require("mysql");

let connectDB = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "datlichkhambenh",
});

connectDB.connect(function (err) {
	if (err) throw err;
	console.log("Database is connected successfully !");
});

module.exports = connectDB;
