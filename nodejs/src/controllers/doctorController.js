import doctorModel from "../models/doctorModel";

let getAllDoctor = (req, res) => {
	doctorModel.getAllDoctorModel((error, results) => {
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

let getDoctorByKeyword = (req, res) => {
	let keyword = req.body.keyword;
	let specialty = req.body.specialty;

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

let getDoctorBySpecialty = (req, res) => {
	let specialty = req.body.specialty;

	doctorModel.getDoctorBySpecialtyModel(specialty, (error, results) => {
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

module.exports = {
	getDoctorByKeyword,
	getAllDoctor,
    getDoctorBySpecialty
};
