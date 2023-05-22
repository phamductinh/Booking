import db from "../configs/connectDB";
import { findAllDoctor, findDoctorBySpecialty } from "../database/queries";

let getAllDoctorModel = (callback) => {
	db.query(findAllDoctor, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let getDoctorByKeywordModel = (keyword, specialty, callback) => {
	let findDoctorByKeyword =
		"SELECT user.id, user.email, user.fullName, user.address, user.gender, user.phoneNumber, doctor.introduction, doctor.description, doctor.specialty, doctor.province, doctor.price FROM user JOIN doctor ON user.id = doctor.userId";
	if (keyword && specialty) {
		findDoctorByKeyword += ` WHERE user.role = "Doctor" AND user.fullName LIKE '%${keyword}%' AND doctor.specialty = '${specialty}'`;
	} else if (keyword) {
		findDoctorByKeyword += ` WHERE user.role = "Doctor" AND user.fullName LIKE '%${keyword}%'`;
	} else if (specialty) {
		findDoctorByKeyword += ` WHERE user.role = "Doctor" AND doctor.specialty = '${specialty}'`;
	}
	db.query(findDoctorByKeyword, (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results);
	});
};

let getDoctorBySpecialtyModel = (specialty, callback) => {
	db.query(findDoctorBySpecialty, specialty, (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results);
	});
};

module.exports = {
	getDoctorByKeywordModel,
	getAllDoctorModel,
	getDoctorBySpecialtyModel,
};
