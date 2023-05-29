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

export { findDoctorService, findAllDoctorService ,findDoctorByIdService};
