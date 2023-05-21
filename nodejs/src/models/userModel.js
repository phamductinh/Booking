import db from "../configs/connectDB";
import {
	validateEmail,
	validatePassword,
	validateFullName,
	validateAddress,
} from "../middlewares/validateUser";
import bcrypt from "bcryptjs";
import {
	findAllUsers,
	findUserById,
	findByEmail,
	createAUser,
	updateUserQuery,
	deleteUserById,
} from "../database/queries";
import { errMsg } from "../utils/resMsg";

let getAllUsers = (callback) => {
	db.query(findAllUsers, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let getUserById = (userId, callback) => {
	db.query(findUserById, userId, (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results[0]);
	});
};

let createUser = (userData, callback) => {
	let {
		email,
		password,
		fullName,
		address,
		gender,
		role = "User",
		phoneNumber,
	} = userData;
	if (!email || !password || !fullName || !address || !gender) {
		let error = new Error(errMsg.missing_input);
		error.statusCode = 400;
		return callback(error);
	}

	db.query(findByEmail, email, (err, result) => {
		if (err) {
			return callback(err);
		}

		if (result.length) {
			let error = new Error(errMsg.inUsed);
			error.statusCode = 409;
			return callback(error);
		}

		if (!validatePassword(password)) {
			let error = new Error(errMsg.wr_password);
			error.statusCode = 400;
			return callback(error);
		}
		bcrypt.hash(password, 10, (err, hash) => {
			if (err) {
				return callback(err);
			}

			if (!validateEmail(email)) {
				let error = new Error(errMsg.wr_email);
				error.statusCode = 400;
				return callback(error);
			}

			if (!validateFullName(fullName)) {
				let error = new Error(errMsg.wr_fullname);
				error.statusCode = 400;
				return callback(error);
			}

			if (!validateAddress(address)) {
				let error = new Error(errMsg.wr_address);
				error.statusCode = 400;
				return callback(error);
			}

			db.query(
				createAUser,
				[email, hash, fullName, address, gender, role, phoneNumber],
				(err, results) => {
					if (err) {
						return callback(err);
					}
					callback(null, results);
				}
			);
		});
	});
};

// let updateAUser = (userData, callback) => {
// 	let values = [
// 		userData.fullName,
// 		userData.address,
// 		userData.gender,
//         userData.role,
// 		userData.phoneNumber,
//         userData.id
// 	];
// 	if (!userData.id) {
// 		let error = new Error("Please provide id!");
// 		error.statusCode = 400;
// 		return callback(error);
// 	}
// 	if (userData.email || userData.password) {
// 		let error = new Error("Email and password can't be changed!");
// 		error.statusCode = 400;
// 		return callback(error);
// 	}
// 	db.query(updateUserQuery, values, callback);
// };

let updateAUser = (userData, callback) => {
	let values = [
		userData.fullName,
		userData.address,
		userData.gender,
        userData.role,
		userData.phoneNumber,
		userData.id,
	];
	if (!userData.id) {
		let error = new Error(errMsg.missing_input);
		error.statusCode = 400;
		return callback(error);
	}
	if (userData.email || userData.password) {
		let error = new Error(errMsg.cant_change);
		error.statusCode = 400;
		return callback(error);
	}
	db.query(updateUserQuery, values, callback);
};

let deleteAUser = (userId, callback) => {
	return db.query(deleteUserById, [userId], callback);
};

module.exports = {
	getUserById,
	getAllUsers,
	createUser,
	updateAUser,
	deleteAUser,
};
