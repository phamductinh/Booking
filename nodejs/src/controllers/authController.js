import db from "../configs/connectDB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();
const secretKey = process.env.SECRET_TOKEN_KEY;

let register = (req, res, next) => {
	db.query(
		`SELECT * FROM user WHERE LOWER(email) = LOWER(${db.escape(
			req.body.email
		)});`,
		(err, result) => {
			if (result.length) {
				return res.status(409).send({
					code: 409,
					msg: "This user is already in use!",
				});
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(400).send({
							msg: err,
							code: 400,
						});
					} else {
						db.query(
							`INSERT INTO user (email, password) VALUES (${db.escape(
								req.body.email
							)}, ${db.escape(hash)})`,
							(err, result) => {
								if (err) {
									throw err;
								}
								return res.status(201).send({
									code: 201,
									msg: "The user has been registerd !",
								});
							}
						);
					}
				});
			}
		}
	);
};

let login = async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	if (!email || !password) {
		return res.status(500).send({
			code: 500,
			msg: "Vui lòng nhập đầy đủ thông tin!",
		});
	}
	await db.query(
		`SELECT * FROM user WHERE email = ${db.escape(email)};`,
		(err, result) => {
			if (err) {
				throw err;
			}
			if (!result.length) {
				return res.status(400).send({
					code: 400,
					msg: "Email không hợp lệ!",
				});
			}
			bcrypt.compare(password, result[0]["password"], (bErr, bResult) => {
				if (bErr) {
					throw bErr;
				}
				if (bResult) {
					delete result[0].password;
					return res.status(200).send({
						code: 200,
						msg: "Logged in!",
						user: result[0],
					});
				}
				return res.status(401).send({
					code: 401,
					msg: "Email hoặc mật khẩu không đúng!",
				});
			});
		}
	);
};

module.exports = {
	login,
	register,
};
