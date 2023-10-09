import axios from "../axios";

const bookingAnAppointmentService = (data) => {
	return axios.post("/api/booking-an-appointment", data);
};

const getBookingByDate = (date) => {
	return axios.get(`/api/get-booking-by-date?booking_date=${date}`);
};
const getBookingByUserId = (userId) => {
	return axios.get(`/api/get-booking-by-userId?userId=${userId}`);
};

const confirmBooking = (bookingId) => {
	return axios.put(`/api/confirm-booking?id=${bookingId}`);
};

const deleteBooking = (bookingId, data) => {
	return axios.delete(`/api/delete-booking?id=${bookingId}`, { data: data });
};
const cancelBooking = (bookingId) => {
	return axios.delete(`/api/cancel-booking?id=${bookingId}`);
};

export {
	bookingAnAppointmentService,
	getBookingByDate,
	confirmBooking,
	deleteBooking,
	getBookingByUserId,
	cancelBooking,
};
