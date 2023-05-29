import db from "../configs/connectDB";
import { findAllDoctor, findDoctorByIdQuery, findDoctorBySpecialty } from "../database/queries";

let getAllDoctorModel = (callback) => {
	db.query(findAllDoctor, (error, results) => {
		if (error) {
			callback(error);
		} else {
			callback(null, results);
		}
	});
};

let getDoctorByKeywordModel = (keyword, specialty, callback) => {
	let findDoctorByKeyword =
		"SELECT user.id, user.email, user.fullName, user.address, user.gender, user.phoneNumber, doctor.introduction, doctor.description, doctor.specialtyId, doctor.province, doctor.price, specialty.name FROM user JOIN doctor ON user.id = doctor.userId JOIN specialty ON doctor.specialtyId = specialty.id";

	if (keyword && specialty === "") {
		findDoctorByKeyword += ` WHERE user.role = "Doctor" AND user.fullName LIKE '%${keyword}%'`;
	} else if (specialty && keyword === "") {
		findDoctorByKeyword += ` WHERE user.role = "Doctor" AND doctor.specialtyId = ${specialty}`;
	} else if (keyword && specialty) {
		findDoctorByKeyword += ` WHERE user.role = "Doctor" AND user.fullName LIKE '%${keyword}%' AND doctor.specialtyId = '${specialty}'`;
	}
	db.query(findDoctorByKeyword, (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results);
	});
};

let getDoctorByIdModel = (id, callback) => {
	db.query(findDoctorByIdQuery, [id], (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results);
	});
};

module.exports = {
	getDoctorByKeywordModel,
	getAllDoctorModel,
	getDoctorByIdModel,
};
