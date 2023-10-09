import userModel from "../models/userModel";
import { errMsg, successMsg } from "../utils/resMsg";

let getAllUsers = (req, res) => {
	userModel.getAllUsers((error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				msg: errMsg.failed,
			});
		} else {
			return res.status(200).send({
				code: 200,
				data: results,
			});
		}
	});
};

let getAllDoctorAcc = (req, res) => {
	userModel.getAllDoctorAccModel((error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				msg: errMsg.failed,
			});
		} else {
			return res.status(200).send({
				code: 200,
				data: results,
			});
		}
	});
};

let getUser = (req, res) => {
	let userId = req.query.id;
	if (!userId) {
		return res.status(400).send({ code: 400, msg: errMsg.missing_input });
	}

	userModel.getUserById(userId, (error, user) => {
		if (error) {
			throw error;
		}
		delete user.password;
		return res.send({
			code: 200,
			data: user,
		});
	});
};

let createUser = (req, res) => {
	let userData = req.body;
	userModel.createUser(userData, (err, results) => {
		if (err) {
			return res.status(err.statusCode).send({
				code: err.statusCode,
				msg: err.message,
			});
		}
		return res.status(201).send({
			code: 200,
			msg: successMsg.create_user_succeed,
		});
	});
};

let confirmEmail = (req, res) => {
	let { email } = req.body;
	userModel.confirmEmailModel({ email }, (err, results) => {
		if (err) {
			return res.status(err.statusCode).send({
				code: err.statusCode,
				msg: err.message,
			});
		}
		return res.status(201).send({
			code: 200,
			msg: "Thành công!",
		});
	});
};

let updateUser = (req, res) => {
	let userData = req.body;
	userModel.updateAUser(userData, (error, results, fields) => {
		if (error) throw error;
		return res.send({
			code: 200,
			msg: successMsg.update_user_succeed,
		});
	});
};

let deleteUser = (req, res) => {
	let userId = req.query.id;
	if (!userId) {
		return res.status(400).send({ code: 400, msg: errMsg.missing_input });
	}
	userModel.getUserById(userId, (error, user) => {
		if (!user) {
			return res.status(400).send({ code: 400, msg: errMsg.not_exist });
		}
		userModel.deleteAUser(userId, (error, results, fields) => {
			if (error) throw error;
			return res.send({
				code: 200,
				msg: successMsg.delete_user_succeed,
			});
		});
	});
};

module.exports = {
	getAllUsers,
	getUser,
	createUser,
	deleteUser,
	updateUser,
	getAllDoctorAcc,
	confirmEmail,
};
