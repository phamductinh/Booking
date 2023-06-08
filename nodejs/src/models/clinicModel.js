import db from "../configs/connectDB";
import { findAllClinicsQuery } from "../database/queries";

let getAllClinicsModel = (callback) => {
	db.query(findAllClinicsQuery, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

module.exports = {
	getAllClinicsModel,
};
