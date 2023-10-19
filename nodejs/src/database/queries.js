let findAllUsers = `SELECT * FROM user`;

let findUserById = `SELECT * FROM user WHERE id = ?`;

let findAllDoctorAccQuery = `SELECT * FROM user WHERE role = 'Doctor'`;

let findByEmail = `SELECT * FROM user WHERE LOWER(email) = LOWER(?)`;

let createAUser = `INSERT INTO user (email, password, fullName, address, gender, role, phoneNumber) VALUES (?,?,?,?,?,?,?)`;

let updateUserQuery = `UPDATE user SET fullName = ?, address = ?, gender = ?, role = ?, phoneNumber = ? WHERE id = ?`;

let deleteUserById = `DELETE FROM user WHERE id = ?`;

//Specialty
let findAllSpecialtyQuery = "SELECT * FROM specialty";

let createNewSpecialtyQuery = `INSERT INTO specialty (name, description, descriptionHTML, image) VALUES (?,?,?,?)`;

let updateSpecialtyQuery =
	"UPDATE specialty SET name = ?, description = ?, descriptionHTML = ?, image = ? WHERE id = ?";

let deleteSpecialtyById = `DELETE FROM specialty WHERE id = ?`;

let findAllClinicQuery = "SELECT * FROM clinic";

let findAllDoctor = `SELECT doctor.id as id, user.id as userId, user.email, user.fullName, user.address, user.gender, user.phoneNumber, doctor.id as doctorId, doctor.introduction, doctor.description, doctor.specialtyId, doctor.price, specialty.name as specialtyName, doctor.image FROM user JOIN doctor ON user.id = doctor.userId JOIN specialty ON doctor.specialtyId = specialty.id WHERE user.role = "Doctor"`;

let findDoctorBySpecialty = `SELECT user.id, user.email, user.fullName, user.address, user.gender, user.phoneNumber, doctor.introduction, doctor.description, doctor.specialty,  doctor.price FROM user JOIN doctor ON user.id = doctor.userId WHERE user.role = "Doctor" AND doctor.specialtyId = ?`;

let findDoctorByIdQuery = `SELECT doctor.id as id, user.id as userId, user.email, user.fullName, user.address, user.gender, user.phoneNumber, doctor.id, doctor.introduction, doctor.description, doctor.specialtyId, doctor.price, specialty.name as specialtyName, doctor.image, clinic.name as clinicName FROM user JOIN doctor ON user.id = doctor.userId JOIN specialty ON doctor.specialtyId = specialty.id JOIN clinic ON doctor.clinicId = clinic.id WHERE user.role = "Doctor" AND doctor.id = ?`;

let createADoctorQuery = `INSERT INTO doctor (userId, introduction, description, specialtyId,  price, image, clinicId) VALUES (?,?,?,?,?,?,?)`;

let findBookedAppointmentQuery =
	"SELECT * from booking WHERE booking_date = ? AND booking_time = ?";

let bookingAnAppointmentQuery = `INSERT INTO booking (userId, doctorId, booking_date, booking_time,fullName, gender, phoneNumber, birthday, address, reason, status) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

let getBookingByDateQuery = `SELECT booking.*, user.email as patientEmail
FROM booking 
JOIN user ON user.id = booking.userId
JOIN doctor ON doctor.id = booking.doctorId
WHERE status = 'Pending' AND booking_date = ?`;

let getBookingByUserIdQuery = `SELECT booking.*, user.email as patientEmail
FROM booking 
JOIN user ON user.id = booking.userId
JOIN doctor ON doctor.id = booking.doctorId
WHERE status = 'Pending' AND user.id = ?`;

let confirmBookingQuery = `UPDATE booking SET status = 'Confirmed' WHERE id = ?`;

let deleteBookingById = `DELETE FROM booking WHERE id = ?`;

let createAFeedbackQuery = `INSERT INTO review (doctorId, comment, userId) VALUES (?,?,?)`;

let getFeedbackByDoctorIdQuery = `SELECT review.*, user.fullName FROM review JOIN user ON user.id = review.userId WHERE doctorId = ?`;

let updateFeedbackQuery = `UPDATE review SET comment = ? WHERE id = ?`;

module.exports = {
	updateFeedbackQuery,
	getFeedbackByDoctorIdQuery,
	createAFeedbackQuery,
	getBookingByUserIdQuery,
	findBookedAppointmentQuery,
	bookingAnAppointmentQuery,
	getBookingByDateQuery,
	confirmBookingQuery,
	deleteBookingById,
	findAllUsers,
	findUserById,
	findByEmail,
	createAUser,
	updateUserQuery,
	deleteUserById,
	findAllSpecialtyQuery,
	createNewSpecialtyQuery,
	deleteSpecialtyById,
	updateSpecialtyQuery,
	findAllDoctor,
	findDoctorBySpecialty,
	findDoctorByIdQuery,
	createADoctorQuery,
	findAllDoctorAccQuery,
	findAllClinicQuery,
};
