import axios from "../axios";

const handleLoginAPI = (userEmail, userPassword) => {
	return axios.post("/api/login", {
		email: userEmail,
		password: userPassword,
	});
};

const handleCreateUser = (data) => {
	return axios.post("/api/create-user", data);
};

const getAllUsers = () => {
	return axios.get("/api/users");
};

const deleteUser = (userId) => {
	return axios.delete(`/api/delete-user?id=${userId}`);
};

const editUser = (userData) => {
	return axios.put("/api/edit-user", userData);
};

export { handleLoginAPI, handleCreateUser, getAllUsers, deleteUser, editUser };
