import axios from "../axios";

const findDoctorService = (keyword, specialty) => {
	return axios.get("/api/get-doctor", { keyword, specialty });
};

const findDoctorByIdService = (inputId) => {
	return axios.get(`/api/get-doctor-by-id?id=${inputId}`);
};
const findAllDoctorService = () => {
	return axios.get("/api/get-all-doctor");
};

const handleCreateDoctor = (data) => {
	return axios.post("/api/create-doctor", data);
};

const deleteDoctor = (doctorId) => {
	return axios.delete(`/api/delete-doctor?id=${doctorId}`);
};

const updateDoctor = (doctorData) => {
	return axios.put("/api/update-doctor", doctorData);
};

export {
	findDoctorService,
	findAllDoctorService,
	findDoctorByIdService,
	deleteDoctor,
	updateDoctor,
	handleCreateDoctor,
};
