let mysql = require("mysql");

let connectDB = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "bookingcare",
});

connectDB.connect(function (err) {
	if (err) throw err;
	console.log("Database is connected successfully !");
});

module.exports = connectDB;
