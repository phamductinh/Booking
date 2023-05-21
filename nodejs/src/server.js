import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import fileUpload from "express-fileupload";

require("dotenv").config();

let app = express();

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Authorization ,Content-type"
	);
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.set("views", __dirname + "/views");

viewEngine(app);
initWebRoutes(app);

app.use((req, res, next) => {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(
	fileUpload({
		limits: { fileSize: 10 * 1024 * 1024 },
	})
);

app.use((err, req, res, next) => {
	res.locals.error = err;
	const status = err.status || 500;
	res.status(status);
	res.render("error");
});

let port = process.env.PORT || 9999;
app.listen(port, () => {
	console.log("Nodejs is runing on the port" + port);
});
