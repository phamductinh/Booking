import express from "express";
import authController from "../controllers/authController";
import userController from "../controllers/userController";
import specialtyController from "../controllers/specialtyController";
import doctorController from "../controllers/doctorController";

let router = express.Router();

let initWebRoutes = (app) => {
	router.post("/api/login", authController.login);
	router.post("/api/register", authController.register);

	router.get("/api/users", userController.getAllUsers);
	router.get("/api/get-user", userController.getUser);
	router.post("/api/create-user", userController.createUser);
	router.put("/api/edit-user", userController.updateUser);
	router.delete("/api/delete-user", userController.deleteUser);

	router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
	router.post("/api/create-specialty", specialtyController.createSpecialty);
	router.delete(
		"/api/delete-telemedicine",
		specialtyController.deleteSpecialty
	);
	router.put("/api/update-specialty", specialtyController.updateSpecialty);

	router.get("/api/get-all-doctor", doctorController.getAllDoctor);
	router.get("/api/get-doctor", doctorController.getDoctorByKeyword);
	router.get("/api/get-doctor-by-id", doctorController.getDoctorById);

	return app.use("/", router);
};

module.exports = initWebRoutes;
