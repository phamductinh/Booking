import clinicModel from "../models/clinicModel";

const getAllClinics = (req, res) => {
	clinicModel.getAllClinicsModel((error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				msg: "Error fetch data !",
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
	getAllClinics,
};
