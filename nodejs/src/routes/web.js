import express from "express";
import authController from "../controllers/authController";
import userController from "../controllers/userController";
import specialtyController from "../controllers/specialtyController";
import doctorController from "../controllers/doctorController";
import clinicController from "../controllers/clinicController";
import bookingController from "../controllers/bookingController";
import otherController from "../controllers/otherController";

let router = express.Router();

let initWebRoutes = (app) => {
	router.post("/api/login", authController.login);
	router.post("/api/register", authController.register);

	router.get("/api/users", userController.getAllUsers);
	router.get("/api/get-user", userController.getUser);
	router.get("/api/confirm-email", userController.confirmEmail);
	router.get("/api/get-doctor-acc", userController.getAllDoctorAcc);
	router.post("/api/create-user", userController.createUser);
	router.put("/api/edit-user", userController.updateUser);
	router.delete("/api/delete-user", userController.deleteUser);

	router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
	router.post("/api/create-specialty", specialtyController.createSpecialty);
	router.delete(
		"/api/delete-specialty",
		specialtyController.deleteSpecialty
	);
	router.put("/api/update-specialty", specialtyController.updateSpecialty);

	router.get("/api/get-all-doctor", doctorController.getAllDoctor);
	router.get("/api/get-doctor", doctorController.getDoctorByKeyword);
	router.get("/api/get-doctor-by-id", doctorController.getDoctorById);
	router.get("/api/get-doctor-by-specialtyId", doctorController.getDoctorBySpecialtyId);
	router.get(
		"/api/get-feedback-by-doctorId",
		doctorController.getFeedbackByDoctorId
	);
	router.post("/api/create-doctor", doctorController.createADoctor);
	router.post("/api/create-feedback", doctorController.createAFeedback);
	router.put("/api/update-feedback", doctorController.updateFeedback);

	router.get("/api/get-all-clinics", clinicController.getAllClinics);

	router.post(
		"/api/booking-an-appointment",
		bookingController.bookingAnAppointment
	);
	router.get("/api/get-booking-by-date", bookingController.getBookingByDate);
	router.get(
		"/api/get-booking-by-userId",
		bookingController.getBookingByUserId
	);
	router.put("/api/confirm-booking", bookingController.confirmBooking);
	router.delete("/api/delete-booking", bookingController.deleteBooking);
	router.delete("/api/cancel-booking", bookingController.cancelBooking);

	router.get("/api/v1/nhankhau", otherController.getAllNhanKhau);
	router.post("/api/v1/create-nhankhau", otherController.createNhanKhau);
	router.put("/api/v1/update-nhankhau", otherController.updateNhanKhau);
	router.delete("/api/v1/delete-nhankhau", otherController.deleteNhanKhau);
	router.get(
		"/api/v1/get-nhankhau-by-name",
		otherController.getNhanKhauByName
	);

	return app.use("/", router);
};

module.exports = initWebRoutes;
