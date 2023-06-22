import db from "../configs/connectDB";
import {
	findAllDoctor,
	findDoctorByIdQuery,
	createADoctorQuery,
} from "../database/queries";

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
		"SELECT user.id, user.email, user.fullName, user.address, user.gender, user.phoneNumber, doctor.introduction, doctor.description, doctor.specialtyId, doctor.price, specialty.name FROM user JOIN doctor ON user.id = doctor.userId JOIN specialty ON doctor.specialtyId = specialty.id";

	if (keyword && specialty) {
		findDoctorByKeyword += ` WHERE user.role = "Doctor" AND user.fullName LIKE '%${keyword}%' AND doctor.specialtyId = '${specialty}'`;
	} else {
		findDoctorByKeyword += ` WHERE user.role = "Doctor" AND (user.fullName LIKE '%${keyword}%' OR doctor.specialtyId = '${specialty}')`;
	}
	db.query(findDoctorByKeyword, (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results);
	});
};

let getDoctorByIdModel = (id, callback) => {
	db.query(findDoctorByIdQuery, id, (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results[0]);
	});
};

let createDoctorModel = (doctorData, callback) => {
	let {
		userId,
		introduction,
		clinicId,
		specialtyId,
		description,
		price,
		image,
	} = doctorData;

	db.query(
		createADoctorQuery,
		[
			userId,
			introduction,
			description,
			specialtyId,
			price,
			image,
			clinicId,
		],
		(err, results) => {
			if (err) {
				return callback(err);
			}
			callback(null, results);
		}
	);
};

module.exports = {
	getDoctorByKeywordModel,
	getAllDoctorModel,
	getDoctorByIdModel,
	createDoctorModel,
};
