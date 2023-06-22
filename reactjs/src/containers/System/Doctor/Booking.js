import React, { Component } from "react";
import { connect } from "react-redux";
import { findDoctorByIdService } from "../../../services/doctorService";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import "./Booking.css";
import { toast } from "react-toastify";
import * as actions from "../../../store/actions/";
import { bookingAnAppointmentService } from "../../../services/bookingService";

class Booking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detailDoctor: "",
		};
	}

	async componentDidMount() {
		window.scrollTo(0, 0);
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.id
		) {
			let id = this.props.match.params.id;
			let res = await findDoctorByIdService(id);
			if (res && res.code === 200) {
				this.setState({
					detailDoctor: res.data,
				});
			}
		}
	}

	handleOnchangeInput = async (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		await this.setState({
			...copyState,
		});
	};

	handleBooking = async () => {
		let formatedDate = new Date(this.state.date).getTime();
		let formattedDate = new Date(formatedDate);

		let day = formattedDate.getDate();
		let month = formattedDate.getMonth() + 1;
		let year = formattedDate.getFullYear();

		let formattedDateString = `${day}/${month}/${year}`;
		let data = {
			userId: this.props.userInfor.id,
			doctorId: this.props.match.params.id,
			booking_date: formatedDate,
			booking_time: this.state.time,
			fullName: this.state.fullName,
			gender: this.state.gender,
			phoneNumber: this.state.phoneNumber,
			birthday: this.state.birthday,
			address: this.state.address,
			reason: this.state.reason,
			status: "Pending",
			receiverEmail: this.props.userInfor.email,
			doctorName: this.state.detailDoctor.fullName,
			booking_date_formated: formattedDateString,
		};
		console.log("data", data);
		try {
			this.setState({
				errMsgSignUp: "",
				isLoading: true,
			});
			let response = await bookingAnAppointmentService(data);
			console.log("check response", response);
			toast.success("Đặt lịch thành công !");
			this.setState({
				isLoading: false,
			});
		} catch (error) {
			console.log(error);
			if (error.response) {
				if (error.response.data) {
					this.setState({
						errMsgSignUp: error.response.data.msg,
					});
				}
			}
		}
	};

	handleViewBooking = () => {
		let id = this.props.match.params.id;
		this.props.history.push(`/booking/${id}`);
	};

	goBack = () => {
		this.props.history.push(`/detail-doctor/${this.props.match.params.id}`);
	};

	render() {
		let { detailDoctor } = this.state;
		const hours = [
			"7:00",
			"8:00",
			"9:00",
			"10:00",
			"11:00",
			"13:00",
			"14:00",
			"15:00",
			"16:00",
			"17:00",
		];
		let currentDate = new Date().toISOString().split("T")[0];
		return (
			<>
				<div className="booking-detail-doctor-container">
					<div className="detail-doctor-header">
						<div className="detail-doctor-header-left">
							<i
								className="fas fa-long-arrow-left"
								onClick={this.goBack}
							></i>

							<h2>Bác sĩ {detailDoctor.fullName}</h2>
						</div>
						<div className="detail-doctor-header-right">
							<div className="detail-doctor-header-support">
								<i className="far fa-question-circle"></i>
								Hỗ trợ
							</div>
							<i className="fas fa-bars"></i>
						</div>
					</div>
					<div className="booking-detail-doctor-container">
						<div className="booking-detail-doctor-infor">
							<div
								className="booking-detail-doctor-img"
								style={{
									backgroundImage: `url(${
										detailDoctor && detailDoctor.image
											? new Buffer(
													detailDoctor.image,
													"base64"
											  ).toString("binary")
											: "https://ihfeducation.ihf.info/images/no_avatar.gif"
									})`,
								}}
							></div>
							<div className="booking-detail-doctor-infors">
								<h2>Đặt lịch khám</h2>
								<h1>Bác sĩ {detailDoctor.fullName}</h1>
								<p>{detailDoctor.introduction}</p>
								<div>
									Giá khám:
									<NumericFormat
										className="price-booking-header"
										value={detailDoctor.price}
										displayType={"text"}
										thousandSeparator={true}
										suffix={"VNĐ"}
									/>
								</div>
							</div>
						</div>
						<div className="booking-container">
							<form action="">
								<label htmlFor="">Chọn ngày khám:</label>
								<div className="booking-input">
									<i className="fa-solid fa-calendar"></i>
									<input
										type="date"
										min={currentDate}
										onChange={(event) =>
											this.handleOnchangeInput(
												event,
												"date"
											)
										}
									/>
								</div>
								<label htmlFor="">Chọn giờ khám:</label>
								<div className="booking-input">
									<i className="fa-solid fa-clock"></i>
									<select
										value={this.state.hour}
										onChange={(event) =>
											this.handleOnchangeInput(
												event,
												"time"
											)
										}
										defaultValue={""}
									>
										<option value="" disabled defaultValue>
											Chọn giờ khám
										</option>
										{hours.map((hour) => (
											<option key={hour} value={hour}>
												{hour}
											</option>
										))}
									</select>
								</div>
								<div className="booking-input">
									<i className="fa-solid fa-user"></i>
									<input
										type="text"
										placeholder="Họ tên bệnh nhân"
										onChange={(event) =>
											this.handleOnchangeInput(
												event,
												"fullName"
											)
										}
									/>
								</div>
								<div className="booking-note">
									Hãy ghi rõ Họ Và Tên, viết hoa những chữ cái
									đầu tiên, ví dụ: Phạm Đức Tịnh
								</div>
								<div className="booking-gender">
									<label htmlFor="">
										<input
											type="radio"
											name="gender"
											value="Nam"
											checked={
												this.state.gender === "Nam"
											}
											onChange={(event) =>
												this.handleOnchangeInput(
													event,
													"gender"
												)
											}
										/>
										Nam
									</label>
									<label htmlFor="">
										<input
											type="radio"
											name="gender"
											value="Nữ"
											checked={this.state.gender === "Nữ"}
											onChange={(event) =>
												this.handleOnchangeInput(
													event,
													"gender"
												)
											}
										/>
										Nữ
									</label>
								</div>
								<div className="booking-input">
									<i className="fa-solid fa-phone"></i>
									<input
										type="tel"
										placeholder="Số điện thoại liên hệ"
										onChange={(event) =>
											this.handleOnchangeInput(
												event,
												"phoneNumber"
											)
										}
									/>
								</div>
								<div className="booking-input">
									<i className="fa-solid fa-calendar"></i>
									<input
										type="number"
										placeholder="Năm sinh"
										onChange={(event) =>
											this.handleOnchangeInput(
												event,
												"birthday"
											)
										}
									/>
								</div>
								<div className="booking-input">
									<i className="fa-solid fa-location-dot"></i>
									<input
										type="text"
										placeholder="Địa chỉ"
										onChange={(event) =>
											this.handleOnchangeInput(
												event,
												"address"
											)
										}
									/>
								</div>
								<div className="booking-input">
									<i className="fa-solid fa-comment"></i>
									<textarea
										placeholder="Lý do khám"
										onChange={(event) =>
											this.handleOnchangeInput(
												event,
												"reason"
											)
										}
									></textarea>
								</div>
								<div
									className="errMsgSignUp"
									style={{ color: "red" }}
								>
									{this.state.errMsgSignUp}
								</div>
								<div className="booking-total-price">
									<div>
										<div>Giá khám</div>
										<NumericFormat
											className="total-price"
											value={detailDoctor.price}
											displayType={"text"}
											thousandSeparator={true}
											suffix={"VNĐ"}
										/>
									</div>
									<div>
										<div>Phí đặt lịch</div>
										<div className="total-price">
											Miễn phí
										</div>
									</div>
									<hr />
									<div>
										<div>Tổng cộng</div>
										<NumericFormat
											className="price-booking-header"
											value={detailDoctor.price}
											displayType={"text"}
											thousandSeparator={true}
											suffix={"VNĐ"}
										/>
									</div>
								</div>
								<p>
									Quý khách vui lòng điền đầy đủ thông tin để
									tiết kiệm thời gian làm thủ tục khám
								</p>
								<button
									type="button"
									className="btn-booking"
									onClick={() => this.handleBooking()}
								>
									Xác nhận đặt khám
								</button>
							</form>
						</div>

						{/* <div className="introduction">
							<div
								className="bookingcare-role-btn"
								onclick="hiden_introduction()"
							>
								<p>Vai trò của BookingCare</p>
							</div>
							<div
								id="hiden-introduction"
								className="hiden-introduction"
							>
								<p>
									Giúp khách hàng chọn đúng chuyên gia Tâm lý
									giỏi và đặt lịch nhanh chóng.
								</p>
								<ul>
									<li>
										Hệ thống chuyên gia tâm lý giỏi, uy tín
									</li>
									<li>
										Thông tin về chuyên gia tâm lý đã được
										xác thực rõ ràng, chính xác
									</li>
									<li>
										Sắp xếp khám đúng chuyên gia tâm lý mà
										khách hàng đã chọn đặt lịch
									</li>
									<li>
										Bảo vệ quyền lợi của khách hàng khi tư
										vấn
									</li>
									<li>Miễn phí đặt lịch</li>
								</ul>
								<p>Hỗ trợ trước, trong và sau khi tư vấn</p>
								<p>
									<span>Trước tư vấn</span>
								</p>
								<ul>
									<li>
										Nhắc lịch, dặn dò chuẩn bị trước tư vấn
									</li>
									<li>
										Hướng dẫn đi lại, quy trình làm thủ tục
										tư vấn
									</li>
								</ul>
								<p>
									<span>Trong khi tư vấn</span>
								</p>
								<ul>
									<li>
										Hỗ trợ giải quyết các vướng mắc trong
										khi tư vấn
									</li>
									<li>
										Hỗ trợ khách hàng những yêu cầu nảy sinh
									</li>
								</ul>
								<p>
									<span>Sau khi tư vấn</span>
								</p>
								<ul>
									<li>
										Ghi nhận ý kiến của khách hàng sau tư
										vấn
									</li>
									<li>
										Bảo vệ quyền lợi của khách hàng sau tư
										vấn
									</li>
								</ul>
							</div>
						</div> */}

						<div className="more-questions">
							<p>
								Cần tìm hiểu thêm?
								<a href="#">Xem câu hỏi thường gặp.</a>
							</p>
						</div>

						<div className="footer1">
							<div className="company-infor">
								<div className="company-logo"></div>
								<div className="company-address">
									<h2>
										Công ty Cổ phần Công nghệ BookingCare
									</h2>
									<p>
										<i className="fas fa-map-marker-alt"></i>
										28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà
										Nội
									</p>
									<p>
										<i className="fas fa-check"></i>ĐKKD số:
										0106790291. Sở KHĐT Hà Nội cấp ngày
										16/03/2015
									</p>
								</div>
								<div className="registered">
									<div className="registered-1"></div>
									<div className="registered-2"></div>
								</div>
							</div>
							<div className="list-features">
								<ul>
									<li>
										<a href="#">Liên hệ hợp tác</a>
									</li>
									<li>
										<a href="#">
											Gói chuyển đổi số doanh nghiệp
										</a>
									</li>
									<li>
										<a href="#">Tuyển dụng</a>
									</li>
									<li>
										<a href="#">Câu hỏi thường gặp</a>
									</li>
									<li>
										<a href="#">Điều khoản sử dụng</a>
									</li>
									<li>
										<a href="#">Chính sách Bảo mật</a>
									</li>
								</ul>
							</div>
							<div className="more-infor">
								<div className="headquarter">
									<h2>Trụ sở tại Hà Nội</h2>
									<p>
										28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà
										Nội
									</p>
								</div>
								<div className="office">
									<h2>Văn phòng tại TP Hồ Chí Minh</h2>
									<p>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</p>
								</div>
								<div className="footer-support">
									<h2>Hỗ trợ khách hàng</h2>
									<p>support@bookingcare.vn (7h - 18h)</p>
								</div>
							</div>
						</div>

						<div className="footer2">
							<div className="footer-left">
								<p>&copy; 2022 Pham Duc Tinh</p>
							</div>
							<div className="footer-right">
								<i className="fab fa-facebook-square"></i>
								<i className="fab fa-youtube"></i>
								<i className="fab fa-instagram"></i>
								<i className="fab fa-twitter"></i>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return { userInfor: state.user.userInfo };
};

const mapDispatchToProps = (dispatch) => {
	return {
		userLoginSuccess: (userInfo) =>
			dispatch(actions.userLoginSuccess(userInfo)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
