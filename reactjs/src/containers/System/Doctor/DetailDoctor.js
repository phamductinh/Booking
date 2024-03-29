import React, { Component } from "react";
import { connect } from "react-redux";
import {
	findDoctorByIdService,
	handleCreateFeedback,
	getFeedbackByDoctorId,
	updateFeedback,
} from "../../../services/doctorService";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import "./DetailDoctor.css";

class DetailDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detailDoctor: "",
			isShowUpdate: false,
		};
	}

	async componentDidMount() {
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
		this.getAllFeedbacks();
	}

	getAllFeedbacks = async () => {
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.id
		) {
			let doctorId = this.props.match.params.id;
			let res = await getFeedbackByDoctorId(doctorId);
			console.log(res);
			if (res && res.code === 200) {
				this.setState({
					feedbacks: res.data,
				});
			}
		}
	};

	handleOnchangeInput = (event) => {
		this.setState({
			comment: event.target.value,
		});
	};

	handleAddNewFeedback = async () => {
		let data = {
			doctorId: this.props.match.params.id,
			comment: this.state.comment,
			userId: this.props.userInfor.id,
		};

		const isEmptyField = Object.values(data).some((value) => !value);

		if (isEmptyField) {
			console.log("Vui lòng điền đầy đủ thông tin!");
		} else {
			try {
				let res = await handleCreateFeedback(data);
				toast.success("Đánh giá thành công!");
				this.getAllFeedbacks();
				this.setState({
					comment: "",
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	handleUpdateFeedback = async () => {
		let data = {
			comment: this.state.comment,
			id: this.state.feedbackId,
		};
		try {
			let res = await updateFeedback(data);
			toast.success("Chỉnh sửa thành công!");
			this.setState({
				isShowUpdate: false,
				comment: "",
			});
			this.getAllFeedbacks();
		} catch (error) {
			console.log(error);
		}
	};

	handleShowUpdate = (item) => {
		this.setState((prevState) => ({
			feedbackId: item.id,
			comment: item.comment,
			isShowUpdate: !prevState.isShowUpdate,
		}));
	};

	handleViewBooking = () => {
		if (this.props.isLoggedIn) {
			let id = this.props.match.params.id;
			this.props.history.push(`/booking/${id}`);
		} else {
			this.props.history.push("/login");
		}
	};

	render() {
		let { detailDoctor, feedbacks, isShowUpdate } = this.state;
		return (
			<>
				<div className="detail-doctor-container">
					<div className="detail-doctor-header">
						<div className="detail-doctor-header-left">
							<Link to="/home">
								<i className="fas fa-long-arrow-left"></i>
							</Link>

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
					<div className="detail-doctor-container">
						<div className="detail-doctor-infor">
							<div
								className="detail-doctor-img"
								style={{
									backgroundImage: `url(${
										detailDoctor && detailDoctor.image
											? new Buffer(
													detailDoctor.image,
													"base64"
											  ).toString("binary")
											: "https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg"
									})`,
								}}
							></div>
							<div className="detail-doctor-infors">
								<h1>Bác sĩ {detailDoctor.fullName}</h1>
								<div>{detailDoctor.introduction}</div>
							</div>
						</div>
						<div className="detail-doctor-schedule">
							<div className="detail-doctor-schedule-left">
								<h3>Bạn đang gặp vấn đề về sức khỏe ?</h3>
								<button
									className="booking-now"
									onClick={() => this.handleViewBooking()}
								>
									<Link to="/booking">
										Đặt lịch ngay
										<i className="fa-solid fa-arrow-right"></i>
									</Link>
								</button>
								<div className="choose-and-book">
									<p>
										Click{" "}
										<i className="fas fa-hand-pointer"></i>
										và đặt lịch (Miễn phí)
									</p>
								</div>
							</div>
							<div className="detail-doctor-schedule-right">
								<div className="exam-address">
									<h3>ĐỊA CHỈ KHÁM</h3>
									<p>{detailDoctor.clinicName}</p>
									<p>{detailDoctor.address}</p>
								</div>
								<div className="exam-price">
									<h3>
										<strong>GIÁ KHÁM:</strong>{" "}
										<NumericFormat
											value={detailDoctor.price}
											displayType={"text"}
											thousandSeparator={true}
											suffix={"VNĐ"}
										/>
									</h3>
								</div>
							</div>
						</div>
						<div
							className="detail-doctor-introduction"
							dangerouslySetInnerHTML={{
								__html: detailDoctor.description,
							}}
						></div>
						<div className="feedback-container">
							<p className="feedback-title">
								Phản hồi của bệnh nhân sau khi đi khám
							</p>

							{feedbacks &&
								feedbacks.map((item, index) => {
									let isMeSelf =
										this.props.userInfor &&
										item.userId === this.props.userInfor.id;

									return (
										<div className="feedback-item">
											<div className="feedback-name">
												{item.fullName}
											</div>
											<div className="feedback-content">
												{item.comment}{" "}
												{isMeSelf && (
													<a
														href="#/"
														onClick={() =>
															this.handleShowUpdate(
																item
															)
														}
													>
														Sửa
													</a>
												)}
											</div>
										</div>
									);
								})}

							<div className="feedback-input-container">
								<textarea
									name=""
									id=""
									className="feedback-input"
									cols="30"
									rows="2"
									placeholder="Đánh giá bác sĩ"
									value={this.state.comment}
									onChange={(event) =>
										this.handleOnchangeInput(event)
									}
								></textarea>
								{isShowUpdate ? (
									<button
										className="btn-feedback"
										onClick={() =>
											this.handleUpdateFeedback()
										}
									>
										<i class="fa-solid fa-pen"></i>
									</button>
								) : (
									<button
										className="btn-feedback"
										onClick={() =>
											this.handleAddNewFeedback()
										}
									>
										<i class="fa-regular fa-paper-plane"></i>
									</button>
								)}
							</div>
						</div>

						{/* <div className="introduction">
							<div className="bookingcare-role-btn">
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
								<a href="#/">Xem câu hỏi thường gặp.</a>
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
										<a href="#/">Liên hệ hợp tác</a>
									</li>
									<li>
										<a href="#/">
											Gói chuyển đổi số doanh nghiệp
										</a>
									</li>
									<li>
										<a href="#/">Tuyển dụng</a>
									</li>
									<li>
										<a href="#/">Câu hỏi thường gặp</a>
									</li>
									<li>
										<a href="#/">Điều khoản sử dụng</a>
									</li>
									<li>
										<a href="#/">Chính sách Bảo mật</a>
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
	return {
		isLoggedIn: state.user.isLoggedIn,
		userInfor: state.user.userInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(DetailDoctor)
);
