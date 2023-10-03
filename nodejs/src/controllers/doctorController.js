import doctorModel from "../models/doctorModel";
import db from "../configs/connectDB";

let getAllDoctor = (req, res) => {
	doctorModel.getAllDoctorModel((error, results) => {
		if (error) {
			console.log(error);
			return res.status(500).send({
				code: 500,
				msg: "Có gì đó sai sai!",
			});
		} else {
			return res.status(200).send({
				code: 200,
				data: results,
			});
		}
	});
};

let getDoctorByKeyword = (req, res) => {
	const keyword = req.query.keyword;
	const specialtyId = parseInt(req.query.specialtyId);
	let findDoctorByKeyword = `SELECT doctor.id as id, user.id as userId, user.email, user.fullName, user.address, user.gender, user.phoneNumber, doctor.introduction, doctor.description, doctor.specialtyId, doctor.price, doctor.image, specialty.name as specialtyName FROM user JOIN doctor ON user.id = doctor.userId JOIN specialty ON doctor.specialtyId = specialty.id WHERE user.role = "Doctor"`;

	if (keyword) {
		findDoctorByKeyword += ` AND user.fullName LIKE '%${keyword}%'`;
	}
	if (!isNaN(specialtyId)) {
		findDoctorByKeyword += ` AND doctor.specialtyId = '${specialtyId}'`;
	}
	db.query(findDoctorByKeyword, (error, results) => {
		if (error) {
			throw error;
		}
		return res.send({
			code: 200,
			data: results,
		});
	});
};

let getDoctorById = (req, res) => {
	let id = req.query.id;

	doctorModel.getDoctorByIdModel(id, (error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				msg: "Có gì đó sai sai!",
			});
		} else {
			return res.status(200).send({
				code: 200,
				data: results,
			});
		}
	});
};

let createADoctor = (req, res) => {
	let doctorData = req.body;
	doctorModel.createDoctorModel(doctorData, (err, results) => {
		if (err) {
			console.log(err);
			return res.status(400).send({
				code: 400,
				msg: "Something wrong!",
			});
		}
		return res.status(200).send({
			code: 200,
			msg: "Create doctor successfully!",
		});
	});
};

module.exports = {
	getDoctorByKeyword,
	getAllDoctor,
	getDoctorById,
	createADoctor,
};
