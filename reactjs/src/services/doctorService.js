import axios from "../axios";

const findDoctorService = (keyword, specialty) => {
	return axios.get("/api/get-doctor", { keyword, specialty });
};

const findDoctorByIdService = (inputId) => {
	return axios.get(`/api/get-doctor-by-id?id=${inputId}`);
};
const getFeedbackByDoctorId = (doctorId) => {
	return axios.get(`/api/get-feedback-by-doctorId?doctorId=${doctorId}`);
};

const findAllDoctorService = () => {
	return axios.get("/api/get-all-doctor");
};

const getDoctorByKeyword = (keyword, specialtyId) => {
	return axios.get(
		`/api/get-doctor?keyword=${keyword}&specialtyId=${specialtyId}`
	);
};

const handleCreateDoctor = (data) => {
	return axios.post("/api/create-doctor", data);
};
const handleCreateFeedback = (data) => {
	return axios.post("/api/create-feedback", data);
};

const deleteDoctor = (doctorId) => {
	return axios.delete(`/api/delete-doctor?id=${doctorId}`);
};

const updateDoctor = (doctorData) => {
	return axios.put("/api/update-doctor", doctorData);
};

const updateFeedback = (data) => {
	return axios.put("/api/update-feedback", data);
};

export {
	findDoctorService,
	findAllDoctorService,
	findDoctorByIdService,
	deleteDoctor,
	updateDoctor,
	handleCreateDoctor,
	getDoctorByKeyword,
	handleCreateFeedback,
	getFeedbackByDoctorId,
	updateFeedback,
};
