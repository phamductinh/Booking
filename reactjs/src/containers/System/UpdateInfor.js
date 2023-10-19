import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserById, editUser } from "../../services/userService";
import "./UpdateInfor.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class UpdateInfor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrBookings: [],
			email: "",
			fullName: "",
			address: "",
			phoneNumber: "",
		};
	}

	async componentDidMount() {
		await this.getInforUser();
	}

	getInforUser = async () => {
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.id
		) {
			let userId = this.props.match.params.id;
			let res = await getUserById(userId);
			if (res && res.code === 200) {
				this.setState({
					userInfor: res.data,
					email: res.data.email,
					fullName: res.data.fullName,
					address: res.data.address,
					phoneNumber: res.data.phoneNumber,
				});
			}
		}
	};

	handleOnchangeInput = async (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		await this.setState({
			...copyState,
		});
		console.log(this.state);
	};

	handleEditUser = async () => {
		try {
			let userData = {
				fullName: this.state.fullName,
				address: this.state.address,
				phoneNumber: this.state.phoneNumber,
				id: this.props.match.params.id,
			};

			let res = await editUser(userData);
			if (res && res.code === 200) {
				toast.success("Sửa thông tin thành công!");
			}
		} catch (error) {
			console.log(error);
			toast.error("Có gì đó sai sai!");
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
		let { isOpenMenu, confirmDelete } = this.state;
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

				<div className="update-user-container">
					<div className="text-center">
						<h1 className="text-primary m-2">Thông tin cá nhân</h1>
					</div>
					<form className="update-form">
						<div class="form-group row m-4">
							<label
								for="staticEmail"
								class="col-sm-2 col-form-label"
							>
								Email:
							</label>
							<div class="col-sm-10">
								<input
									type="text"
									class="form-control p-3"
									placeholder="Email"
									disabled
									value={this.state.email}
									onChange={(event) =>
										this.handleOnchangeInput(event, "email")
									}
								/>
							</div>
						</div>
						<div class="form-group row m-4">
							<label
								for="inputPassword"
								class="col-sm-2 col-form-label"
							>
								Họ và tên:
							</label>
							<div class="col-sm-10">
								<input
									type="text"
									class="form-control p-3"
									placeholder="Tên đầy đủ"
									value={this.state.fullName}
									onChange={(event) =>
										this.handleOnchangeInput(
											event,
											"fullName"
										)
									}
								/>
							</div>
						</div>
						<div class="form-group row m-4">
							<label
								for="inputPassword"
								class="col-sm-2 col-form-label"
							>
								Địa chỉ:
							</label>
							<div class="col-sm-10">
								<input
									type="text"
									class="form-control p-3"
									placeholder="Địa chỉ"
									value={this.state.address}
									onChange={(event) =>
										this.handleOnchangeInput(
											event,
											"address"
										)
									}
								/>
							</div>
						</div>
						<div class="form-group row m-4">
							<label
								for="inputPassword"
								class="col-sm-2 col-form-label"
							>
								Số điện thoại:
							</label>
							<div class="col-sm-10">
								<input
									type="tel"
									class="form-control p-3"
									placeholder="Số điện thoại"
									value={this.state.phoneNumber}
									onChange={(event) =>
										this.handleOnchangeInput(
											event,
											"phoneNumber"
										)
									}
								/>
							</div>
						</div>
						<div class="form-group  text-center">
							<button
								type="button"
								class="btn btn-primary  btn-update-infor"
								onClick={() => {
									this.handleEditUser();
								}}
							>
								Cập nhật
							</button>
						</div>
					</form>
				</div>

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
							Bạn chắc chắn muốn từ chối chứ?
						</div>
						<div className="button-container">
							<button
								className="cancel-button"
								onClick={() => this.handleCloseConfirmDelete()}
							>
								Hủy
							</button>
							<button
								className="confirmation-button"
								onClick={() => this.handleDeleteUser()}
							>
								Từ chối
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
	connect(mapStateToProps, mapDispatchToProps)(UpdateInfor)
);
