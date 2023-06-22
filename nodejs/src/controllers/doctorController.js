import doctorModel from "../models/doctorModel";

let getAllDoctor = (req, res) => {
	doctorModel.getAllDoctorModel((error, results) => {
		if (error) {
            console.log(error)
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
	let { keyword, specialty } = req.query;

	doctorModel.getDoctorByKeywordModel(
		keyword,
		specialty,
		(error, results) => {
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
		}
	);
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
