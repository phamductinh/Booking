import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getBookingByUserId,
	cancelBooking,
} from "../../services/bookingService";
import "./BookingHistory.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import moment from "moment";

class BookingHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrBookings: [],
		};
	}

	async componentDidMount() {
		await this.getAllBooking();
	}

	getAllBooking = async () => {
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.id
		) {
			let userId = this.props.match.params.id;
			let res = await getBookingByUserId(userId);
			console.log(res);
			if (res && res.code === 200) {
				this.setState({
					arrBookings: res.data,
				});
			}
		}
	};

	handleDeleteUser = async () => {
		try {
			this.setState({
				isLoading: true,
			});
			let res = await cancelBooking(this.state.bookingId);
			if (res && res.code === 200) {
				toast.success("Hủy lịch hẹn thành công !");
				await this.getAllBooking();
				this.setState({
					confirmDelete: false,
					isLoading: false,
				});
			}
		} catch (error) {
			console.log(error);
			toast.error("Có gì đó sai sai !");
		}
	};

	handleOpenMenu() {
		this.setState((prevState) => ({
			isOpenMenu: !prevState.isOpenMenu,
		}));
	}

	handleConfirmDelete = (item) => {
		this.setState({
			confirmDelete: true,
			bookingId: item.id,
		});
	};

	handleCloseConfirmDelete() {
		this.setState({
			confirmDelete: false,
		});
	}

	goBackHome() {
		this.props.history.push(`/home`);
	}
	handleViewUpdateInfor = () => {
		if (this.props.userInfor) {
			this.props.history.push(`/update-infor/${this.props.userInfor.id}`);
		}
	};
	handleViewBookingHistory = () => {
		if (this.props.userInfor) {
			this.props.history.push(
				`/booking-history/${this.props.userInfor.id}`
			);
		}
	};

	render() {
		let { isOpenMenu, arrBookings, confirmDelete } = this.state;
		const { processLogout, userInfor, isLoggedIn } = this.props;

		return (
			<div className="homepage-container">
				<div id="header" className="header-homepage">
					<div className="home-header-user">
						<div className="left-content">
							<div
								className="header-logo"
								onClick={() => this.goBackHome()}
							></div>
						</div>
						<div className="center-content">
							<div className="child-content">
								<p>Chuyên khoa</p>
							</div>
							<div className="child-content">
								<p>Bác sĩ</p>
							</div>
						</div>
						<div className="right-content">
							<div className="support">
								<i className="far fa-question-circle"></i>
								Hỗ trợ
							</div>
							<div className="flags">
								<div className="flag-vn"></div>
								<div className="flag-en"></div>
							</div>
							{!isLoggedIn ? (
								<button className="btn-login-header">
									<Link to="/login">Login</Link>
									<div className="arrow-wrapper">
										<div className="arrow"></div>
									</div>
								</button>
							) : (
								<div
									className="user-avatar-header"
									style={{
										backgroundImage: `url(${
											userInfor.image !== null
												? Buffer.from(
														userInfor.image,
														"base64"
												  ).toString("binary")
												: "https://ihfeducation.ihf.info/images/no_avatar.gif"
										})`,
									}}
									onClick={() => this.handleOpenMenu()}
								></div>
							)}

							{isOpenMenu && (
								<>
									{isLoggedIn ? (
										<div className="toggle-menu">
											<div className="user-infor">
												<div
													className="user-avatar"
													style={{
														backgroundImage: `url(${
															userInfor.image !==
															null
																? Buffer.from(
																		userInfor.image,
																		"base64"
																  ).toString(
																		"binary"
																  )
																: "https://ihfeducation.ihf.info/images/no_avatar.gif"
														})`,
													}}
												></div>
												<div className="user-name">
													{userInfor.fullName
														? userInfor.fullName
														: "Unknown name"}
												</div>
											</div>
											<div className="update-infor">
												<div
													onClick={() =>
														this.handleViewUpdateInfor()
													}
												>
													Chỉnh sửa thông tin
												</div>
											</div>
											<div className="his-booking">
												<div
													onClick={() =>
														this.handleViewBookingHistory()
													}
												>
													Lịch sử đặt lịch
												</div>
											</div>
											<button
												className="btn-logout"
												onClick={processLogout}
											>
												<i className="fa-solid fa-right-from-bracket"></i>
												Đăng xuất
											</button>
										</div>
									) : null}
								</>
							)}
						</div>
					</div>
				</div>
				<div className="text-center">
					<h1 className="text-primary mt-5">Lịch sử đặt lịch</h1>
				</div>

				{arrBookings ? (
					<div className="booking-table mt-6 mx-3 ">
						<table id="customers">
							<tr>
								<th className="text-center">STT</th>
								<th className="text-center">Thời gian</th>
								<th className="text-center">Ngày</th>
								<th className="text-center">Lý do</th>
								<th className="text-center">Tình trạng</th>
								<th className="text-center">Act</th>
							</tr>

							{arrBookings &&
								arrBookings.map((item, index) => {
									const date = moment(
										item.booking_date / 1000
									).format("YYYY-MM-DD");
									return (
										<tr key={index}>
											<td>{item.id}</td>
											<td>{item.booking_time}</td>
											<td>{date}</td>
											<td>{item.reason}</td>
											<td>{item.status}</td>
											<td className="text-center">
												<button
													className="btn-refuse"
													onClick={() =>
														this.handleConfirmDelete(
															item
														)
													}
												>
													Hủy lịch
												</button>
											</td>
										</tr>
									);
								})}
						</table>
					</div>
				) : (
					""
				)}

				<div className="footer2-user">
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
				{confirmDelete ? (
					<div className="confirm-delete">
						<div className="confirmation-text">
							Bạn chắc chắn muốn hủy chứ?
						</div>
						<div className="button-container">
							<button
								className="cancel-button"
								onClick={() => this.handleCloseConfirmDelete()}
							>
								Trở lại
							</button>
							<button
								className="confirmation-button"
								onClick={() => this.handleDeleteUser()}
							>
								Xác nhận
							</button>
						</div>
					</div>
				) : null}
			</div>
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
	connect(mapStateToProps, mapDispatchToProps)(BookingHistory)
);
