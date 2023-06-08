import axios from "../axios";

const getAllClinics = () => {
	return axios.get("/api/get-all-clinics");
};

export { getAllClinics };
