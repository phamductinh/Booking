import bookingModel from "../models/bookingModel";

const confirmBooking = (req, res) => {
	let bookingId = req.query.id;
	if (!bookingId) {
		return res.status(400).send({ code: 400, msg: "Missing input!" });
	}
	bookingModel.confirmBookingModel(bookingId, (error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				msg: "Confirm failed!",
			});
		} else {
			return res.status(200).send({
				code: 200,
				msg: "Successfully!",
			});
		}
	});
};

let bookingAnAppointment = (req, res) => {
	let data = req.body;
	bookingModel.bookingAnAppointmentModel(data, (err, results) => {
		if (err) {
			console.log(err);
			return res.status(500).send({
				code: 500,
				msg: "Có gì đó sai sai!",
			});
		}
		return res.status(200).send({
			code: 200,
			msg: "Successfully !",
		});
	});
};

let getBookingByDate = (req, res) => {
	let date = req.query.booking_date;
	if (!date) {
		return res.status(400).send({ code: 400, msg: "Missing input!" });
	}

	bookingModel.getBookingByDateModel(date, (error, results) => {
		if (error) {
			console.log(error);
			return res
				.status(500)
				.send({ code: 500, msg: "Internal server error" });
		}
		return res.send({
			code: 200,
			data: results,
		});
	});
};

let deleteBooking = (req, res) => {
	let bookingId = req.query.id;
	let data = req.body;
	if (!bookingId) {
		return res.status(400).send({ code: 400, msg: "Missing id!" });
	}

	bookingModel.deleteBookingModel(
		bookingId,
		data,
		(error, results, fields) => {
			if (error) throw error;
			return res.send({
				code: 200,
				msg: "Delete successfully!",
			});
		}
	);
};

module.exports = {
	bookingAnAppointment,
	getBookingByDate,
	confirmBooking,
	deleteBooking,
};
