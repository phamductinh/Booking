import React, { Component } from "react";
import { connect } from "react-redux";
import { getALLSpecialty } from "../../services/specialtyService";
import {
	findAllDoctorService,
	getDoctorByKeyword,
} from "../../services/doctorService";
import * as actions from "../../store/actions/";
import "./HomePage.css";
import { Link } from "react-router-dom";
import Fuse from "fuse.js";
import { withRouter } from "react-router";

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrTelems: [],
			arrSpecialty: [],
			arrDoctors: [],
			arrDoctorFilter: [],
			specialty: "",
			keyword: "",
			isOpenMenu: false,
		};
	}

	componentDidMount() {
		this.getALLSpecialtyHome();
		this.getALLDoctorsHome();
	}

	getALLSpecialtyHome = async () => {
		let res = await getALLSpecialty();
		if (res && res.code === 200) {
			this.setState({
				arrSpecialty: res.data,
			});
		}
	};

	getALLDoctorsHome = async () => {
		let res = await findAllDoctorService();
		if (res && res.code === 200) {
			this.setState({
				arrDoctors: res.data,
			});
		}
	};

	handleOpenMenu() {
		this.setState((prevState) => ({
			isOpenMenu: !prevState.isOpenMenu,
		}));
	}

	handleOnchangeInput = async (event) => {
		let keyword = event.target.value;
		let arrDoctors = this.state.arrDoctors;
		const fuse = new Fuse(arrDoctors, {
			keys: ["fullName"],
		});
		let doctorResults;
		if (keyword) {
			doctorResults = fuse
				.search({ fullName: keyword })
				.map((result) => result.item);
		} else {
			doctorResults = "";
		}
		this.setState({
			doctorResults: doctorResults,
		});
	};

	handleOnchangeKeyword = async (event) => {
		await this.setState({
			keyword: event.target.value,
		});
	};

	handleOnchangeSelect = async (event) => {
		await this.setState({
			specialtyId: event.target.value,
		});
	};

	async filterDoctors() {
		let { keyword, specialtyId } = this.state;
		let res = await getDoctorByKeyword(keyword, specialtyId);
		console.log(res);
		if (res && res.code === 200) {
			this.setState({
				arrDoctorFilter: res.data,
			});
		}
	}

	handleViewDetail = (doctor) => {
		this.props.history.push(`/detail-doctor/${doctor.id}`);
	};
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

	handleNext() {
		let lists = document.querySelectorAll(".doctor-slide-item");
		document.getElementById("doctor-slide").appendChild(lists[0]);
	}
	handlePrev() {
		let lists = document.querySelectorAll(".doctor-slide-item");
		document
			.getElementById("doctor-slide")
			.prepend(lists[lists.length - 1]);
	}

	render() {
		let {
			arrSpecialty,
			isOpenMenu,
			arrDoctorFilter,
			arrDoctors,
			doctorResults,
		} = this.state;
		const { processLogout, userInfor, isLoggedIn } = this.props;
		return (
			<div className="homepage-container">
				<div id="header" className="header-homepage">
					<div className="home-header">
						<div className="left-content">
							<div className="header-logo"></div>
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
												: "https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg"
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
																: "https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg"
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

				<div className="banner-container">
					<div className="home-banner">
						<div className="content-up">
							<div className="overlay">
								<div className="title1">
									<p>NỀN TẢNG Y TẾ</p>
								</div>
								<div className="title2">
									<h1>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</h1>
								</div>
								<div className="search">
									<input
										type="search"
										placeholder="Tìm bác sĩ"
										onChange={(event) =>
											this.handleOnchangeInput(event)
										}
									/>
									<i className="fas fa-search"></i>
									<ul className="doctor-result">
										{doctorResults
											? doctorResults.map((item) => (
													<li
														className="doctor-result-li"
														key={item.id}
														onClick={() =>
															this.handleViewDetail(
																item
															)
														}
													>
														{item.fullName}
													</li>
											  ))
											: ""}
									</ul>
								</div>
								<div className="download">
									<div className="android"></div>
									<div className="ios"></div>
								</div>
							</div>
						</div>
						<div className="content-down"></div>
					</div>
				</div>

				<div className="search-container">
					<div className="search-box">
						<input
							className="search-input"
							type="text"
							autoComplete="off"
							placeholder="Nhập tên bác sĩ"
							onChange={(event) =>
								this.handleOnchangeKeyword(event)
							}
						/>
						<select
							name="specialty"
							id="specialty-select"
							value={this.state.specialtyId}
							onChange={(event) =>
								this.handleOnchangeSelect(event, "specialty")
							}
							defaultValue={""}
						>
							<option value="" disabled defaultValue>
								Chọn chuyên khoa
							</option>
							{arrSpecialty &&
								arrSpecialty.length > 0 &&
								arrSpecialty.map((item, index) => (
									<option key={index} value={item.id}>
										{item.name}
									</option>
								))}
						</select>
						<button
							className="btn-search-doctor"
							onClick={() => this.filterDoctors()}
						>
							<i className="fa-solid fa-magnifying-glass"></i>
						</button>
					</div>
					<div className="search-results">
						<div className="search-results-list">
							{arrDoctorFilter &&
								arrDoctorFilter.length > 0 &&
								arrDoctorFilter.map((item, index) => {
									return (
										<div
											className="result-content"
											key={index}
											onClick={() =>
												this.handleViewDetail(item)
											}
										>
											<div
												className="result-img"
												style={{
													backgroundImage: `url(${
														item.image !== null
															? Buffer.from(
																	item.image,
																	"base64"
															  ).toString(
																	"binary"
															  )
															: "https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg"
													})`,
												}}
											></div>
											<div className="result-infor">
												<div className="result-name">
													{item.fullName
														? item.fullName
														: "Unknown name"}
												</div>
												<div className="result-specialty">
													{item.specialtyName
														? item.specialtyName
														: ""}
												</div>
											</div>
										</div>
									);
								})}
						</div>
					</div>
				</div>

				<div className="outstanding-doctor-container">
					<div className="doctor-content-up">
						<div className="doctor-title">Danh sách bác sĩ</div>
						<button className="doctor-btn">Xem thêm</button>
					</div>
					<div className="doctor-slide-container">
						<div id="doctor-slide">
							{arrDoctors &&
								arrDoctors.length > 0 &&
								arrDoctors.map((item, index) => {
									return (
										<div
											className="doctor-slide-item"
											key={index}
											onClick={() =>
												this.handleViewDetail(item)
											}
										>
											<div
												className="doctor-img"
												style={{
													backgroundImage: `url(${
														item.image
															? new Buffer(
																	item.image,
																	"base64"
															  ).toString(
																	"binary"
															  )
															: "https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg"
													})`,
												}}
											></div>
											<div className="doctor-infor">
												<div className="doctor-name">
													Bác sĩ {item.fullName}
												</div>
												<div>
													<p>{item.specialtyName}</p>
												</div>
											</div>
										</div>
									);
								})}
						</div>
					</div>
					<div className="doctor-buttons">
						<button
							className="doctor-prev"
							id="doctor-prev"
							onClick={() => this.handlePrev()}
						>
							<i className="fas fa-long-arrow-left"></i>
						</button>
						<button
							className="doctor-next"
							id="doctor-next"
							onClick={() => this.handleNext()}
						>
							<i className="fas fa-long-arrow-right"></i>
						</button>
					</div>
				</div>

				<div className="footer1">
					<div className="company-infor">
						<div className="company-logo"></div>
						<div className="company-address">
							<h2>Công ty Cổ phần Công nghệ BookingCare</h2>
							<p>
								<i className="fas fa-map-marker-alt"></i>28 Liên
								Chiểu - Đà Nẵng
							</p>
							<p>
								<i className="fas fa-check"></i>ĐKKD số:
								0106790291. Sở KHĐT Đà Nẵng cấp ngày 16/03/2015
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
								<a href="#/">Gói chuyển đổi số doanh nghiệp</a>
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
							<p>Liên Chiểu - Đà Nẵng</p>
						</div>
						<div className="office">
							<h2>Văn phòng tại Đà Nẵng</h2>
							<p>K342 Hoàng Văn Thái - Liên Chiểu - Đà Nẵng</p>
						</div>
						<div className="footer-support">
							<h2>Hỗ trợ khách hàng</h2>
							<p>phamductinh.t18@gmail.com</p>
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
	return {
		processLogout: () => dispatch(actions.processLogout()),
		userLoginSuccess: (userInfo) =>
			dispatch(actions.userLoginSuccess(userInfo)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
