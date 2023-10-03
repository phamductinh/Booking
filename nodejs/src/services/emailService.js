require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.EMAIL_APP, // generated ethereal user
			pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"BookingCare 👻"', // sender address
		to: dataSend.receiverEmail, // list of receivers
		subject: "Xác nhận lịch khám", // Subject line
		html: getBodyHTMLEmail(dataSend),
	});
};

let getBodyHTMLEmail = (dataSend) => {
	let result = `
        <h3>Xin chào ${dataSend.fullName}!</h3>
        <p>Bạn nhận được email này vì bạn đã đặt lịch khám bệnh online trên Bookingcare.vn</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Ngày khám: ${dataSend.booking_date}</b></div>
        <div><b>Thời gian: ${dataSend.booking_time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <br />
        <div>Xin chân thành cảm ơn !</div>
    `; // html body
	return result;
};
let sendConfirmEmail = async (dataSend) => {
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.EMAIL_APP, // generated ethereal user
			pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"BookingCare 👻"', // sender address
		to: dataSend.receiverEmail, // list of receivers
		subject: "Xác nhận đổi mật khẩu", // Subject line
		html: getBodyHTMLEmailChangePass(dataSend),
	});
};

let getBodyHTMLEmailChangePass = (dataSend) => {
	let result = `
        <p>Bạn nhận được email này vì bạn đã gửi yêu cầu đổi mật khẩu.</p>
        <p>Vui lòng click vào đường link bên dưới để chuyển tới trang đổi mật khẩu.</p>
        <div>
            <a href="/change-password" target="_blank">Click here</a>
        </div>
    `; // html body
	return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
	let result = `
            <h3>Xin chào ${dataSend.fullName} !</h3>
            <p>Chúng tôi rất tiếc phải thông báo rằng vì một số lý do nên lịch hẹn của bạn đã bị hủy. Bạn vui lòng đặt lại vào khoảng thời gian khác.</p>
            <div>Xin chân thành cảm ơn !</div>
        `;
	return result;
};

let sendDeclineEmail = async (dataSend) => {
	return new Promise(async (resolve, reject) => {
		try {
			let transporter = nodemailer.createTransport({
				host: "smtp.gmail.com",
				port: 587,
				secure: false, // true for 465, false for other ports
				auth: {
					user: process.env.EMAIL_APP, // generated ethereal user
					pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
				},
			});

			let info = await transporter.sendMail({
				from: '"BookingCare 👻"', // sender address
				to: dataSend.receiverEmail, // list of receivers
				subject: "Kết quả đặt lịch khám bệnh", // Subject line
				html: getBodyHTMLEmailRemedy(dataSend),
			});
			resolve(true);
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = {
	sendSimpleEmail,
	sendDeclineEmail,
	sendConfirmEmail,
};
