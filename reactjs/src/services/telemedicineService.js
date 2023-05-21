import axios from "../axios";

const handleCreateTelemedicine = (data) => {
	return axios.post("/api/create-telemedicine", data);
};

const getALLTelemedicine = () => {
	return axios.get("/api/get-all-telemedicine");
};

const getTelemedicine = (id) => {
	return axios.get(`/api/get-telemedicine`, id);
};

const deleteTelemedicine = (id) => {
	return axios.delete(`/api/delete-telemedicine?id=${id}`);
};

const updateTelemedicine = (data) => {
	return axios.put(`/api/update-telemedicine`, data);
};

export {
	handleCreateTelemedicine,
	getALLTelemedicine,
	deleteTelemedicine,
	updateTelemedicine,
	getTelemedicine,
};
