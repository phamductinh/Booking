import doctorModel from "../models/doctorModel";

let getDoctorByKeyword = (req, res) => {
	let keyword = req.body.keyword;
	let specialty = req.body.specialty;

	doctorModel.getDoctorByKeywordModel(keyword, specialty, (error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				msg: "Something wrong!",
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
};
