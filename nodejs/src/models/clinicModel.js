import db from "../configs/connectDB";
import { findAllClinicQuery } from "../database/queries";

let getAllClinicsModel = (callback) => {
	db.query(findAllClinicQuery, (error, results) => {
		if (error) {
			callback(error);
		} else {
			callback(null, results);
		}
	});
};

module.exports = {
	getAllClinicsModel,
};
