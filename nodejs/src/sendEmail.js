import db from "./configs/connectDB";
import { getEmailPatientsQuery } from "./database/queries";
const schedule = require("node-schedule");
import emailService from "./services/emailService";

let sendRemindEmail = async () => {
	await db.query(getEmailPatientsQuery, (err, results) => {
		if (err) {
			console.error("Lỗi khi truy vấn dữ liệu:", err);
			return;
		}
		results.forEach((patient) => {
			let patientId = patient.id;
			let fullName = patient.fullName;
			let receiverEmail = patient.patientEmail;
			let doctorName = patient.doctorName;
			let booking_time = patient.booking_time;
			let appointmentDate = new Date(parseInt(patient.booking_date));
			let reminderDate = new Date(
				appointmentDate.getTime() - 24 * 60 * 60 * 1000
			);
			// reminderDate.setUTCHours(15, 9);
			let day = appointmentDate.getDate();
			let month = appointmentDate.getMonth() + 1;
			let year = appointmentDate.getFullYear();

			let booking_date = `${day}/${month}/${year}`;

			(async () => {
				const reminderJob = schedule.scheduleJob(
					reminderDate,
					async () => {
						await emailService.sendReminderEmail({
							receiverEmail,
							fullName,
							booking_date,
							booking_time,
							doctorName,
						});
						reminderJob.cancel();
					}
				);
			})();
		});
	});
};

module.exports = {
	sendRemindEmail,
};
