import db from "../configs/connectDB";

let getDoctorByKeywordModel = (keyword, specialty, callback) => {
    let findDoctor = 'SELECT * FROM user';
	if (keyword && specialty) {
		findDoctor += ` WHERE fullname LIKE '%${keyword}%' AND specialty = '${specialty}'`;
	} else if (keyword) {
		findDoctor += ` WHERE fullname LIKE '%${keyword}%'`;
	} else if (specialty) {
		findDoctor += ` WHERE specialty = '${specialty}'`;
	}
	db.query(findDoctor, (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results);
	});
};

module.exports = {
	getDoctorByKeywordModel,
};
