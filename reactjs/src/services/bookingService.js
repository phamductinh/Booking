import axios from "../axios";

const bookingAnAppointmentService = (data) => {
	return axios.post("/api/booking-an-appointment", data);
};

const getBookingByDate = (date) => {
	return axios.get(`/api/get-booking-by-date?booking_date=${date}`);
};

const confirmBooking = (bookingId) => {
	return axios.put(`/api/confirm-booking?id=${bookingId}`);
};

const deleteBooking = (bookingId, data) => {
	return axios.delete(`/api/delete-booking?id=${bookingId}`, { data: data });
};

export {
	bookingAnAppointmentService,
	getBookingByDate,
	confirmBooking,
	deleteBooking,
};
