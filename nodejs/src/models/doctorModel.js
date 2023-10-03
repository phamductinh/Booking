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
	getAllDoctorModel,
	getDoctorByIdModel,
	createDoctorModel,
};
