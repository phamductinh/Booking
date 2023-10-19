import db from "../configs/connectDB";
import {
	findAllDoctor,
	findDoctorByIdQuery,
	createADoctorQuery,
	createAFeedbackQuery,
	getFeedbackByDoctorIdQuery,
	updateFeedbackQuery,
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

let getFeedbackByDoctorIdModel = (doctorId, callback) => {
	db.query(getFeedbackByDoctorIdQuery, doctorId, (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results);
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

let createAFeedbackModel = (data, callback) => {
	let { doctorId, comment, userId } = data;

	db.query(
		createAFeedbackQuery,
		[doctorId, comment, userId],
		(err, results) => {
			if (err) {
				return callback(err);
			}
			callback(null, results);
		}
	);
};

let updateFeedbackModel = (data, callback) => {
	let values = [data.comment, data.id];
	if (!data.id) {
		let error = new Error(errMsg.missing_input);
		error.statusCode = 400;
		return callback(error);
	}

	db.query(updateFeedbackQuery, values, callback);
};

module.exports = {
	getAllDoctorModel,
	getDoctorByIdModel,
	createDoctorModel,
	createAFeedbackModel,
	getFeedbackByDoctorIdModel,
	updateFeedbackModel,
};
