import React, { Component } from "react";
import { connect } from "react-redux";
import { getALLTelemedicine } from "../../services/telemedicineService";
import { getALLSpecialty } from "../../services/specialtyService";
import "./HomePage.css";
<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
	integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
	crossorigin="anonymous"
	referrerpolicy="no-referrer"
/>;

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrTelems: [],
			arrSpecialty: [],
		};
	}

	async componentDidMount() {
		await this.getALLTelemedicineReact();
		await this.getALLSpecialtyReact();
	}

	getALLTelemedicineReact = async () => {
		let res = await getALLTelemedicine();
		if (res && res.code === 200) {
			this.setState({
				arrTelems: res.data,
			});
		}
	};

	getALLSpecialtyReact = async () => {
		let res = await getALLSpecialty();
		console.log("check res", res);
		if (res && res.code === 200) {
			this.setState({
				arrSpecialty: res.data,
			});
		}
	};

	handleNext() {
		let lists = document.querySelectorAll(".telem-slide-item");
		document.getElementById("telem-slide").appendChild(lists[0]);
	}
	handlePrev() {
		let lists = document.querySelectorAll(".telem-slide-item");
		document.getElementById("telem-slide").prepend(lists[lists.length - 1]);
	}

	handleNextSpecialty() {
		let lists = document.querySelectorAll(".spec-slide-item");
		document.getElementById("spec-slide").appendChild(lists[0]);
	}
	handlePrevSpecialty() {
		let lists = document.querySelectorAll(".spec-slide-item");
		document.getElementById("spec-slide").prepend(lists[lists.length - 1]);
	}

	render() {
		let { arrTelems, arrSpecialty } = this.state;
		console.log(arrTelems);
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
							<div className="child-content">
								<p>Gói khám</p>
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
							<i className="fas fa-bars"></i>
							<div className="toggle-menu">
                                <div className="user-name">
                                    
                                </div>
                            </div>
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
									<i className="fas fa-search"></i>
									<input
										type="search"
										placeholder="Tìm chuyên khoa"
									/>
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

				<div className="telemedicine-container">
					<div className="telem-content-up">
						<div className="telem-title">
							Bác sĩ từ xa qua Video
						</div>
						<button className="telem-btn">Xem thêm</button>
					</div>
					<div className="telem-slide-container">
						<div id="telem-slide">
							{arrTelems &&
								arrTelems.length > 0 &&
								arrTelems.map((item, index) => {
									let telemImage = new Buffer(
										item.image,
										"base64"
									).toString("binary");
									return (
										<div
											className="telem-slide-item"
											key={index}
										>
											<div className="telem-icon">
												<i className="fas fa-video"></i>
											</div>
											<div
												className="telem-slide-img"
												style={{
													backgroundImage: `url(${telemImage})`,
												}}
											></div>
											<div className="telem-content">
												{item.name}
											</div>
										</div>
									);
								})}
						</div>
					</div>
					<div className="telem-buttons">
						<button
							className="telem-prev"
							id="telem-prev"
							onClick={() => this.handlePrev()}
						></button>
						<button
							className="telem-next"
							id="telem-next"
							onClick={() => this.handleNext()}
						></button>
					</div>
				</div>

				<div className="specialty-container">
					<div className="spec-content-up">
						<div className="spec-title">Chuyên khoa phổ biến</div>
						<button className="spec-btn">Xem thêm</button>
					</div>
					<div className="spec-slide-container">
						<div id="spec-slide">
							{arrSpecialty &&
								arrSpecialty.length > 0 &&
								arrSpecialty.map((item, index) => {
									let specialtyImage = new Buffer(
										item.image,
										"base64"
									).toString("binary");
									return (
										<div
											className="spec-slide-item"
											key={index}
										>
											<div
												className="spec-slide-img"
												style={{
													backgroundImage: `url(${specialtyImage})`,
												}}
											></div>
											<div className="spec-content">
												{item.name}
											</div>
										</div>
									);
								})}
						</div>
					</div>
					<div className="telem-buttons">
						<button
							className="telem-prev"
							id="telem-prev"
							onClick={() => this.handleNextSpecialty()}
						></button>
						<button
							className="telem-next"
							id="telem-next"
							onClick={() => this.handleNextSpecialty()}
						></button>
					</div>
				</div>

				<div className="facility-container">
					<div className="faci-content-up">
						<div className="faci-title">Cơ sở y tế nổi bật</div>
						<button className="faci-btn">Xem thêm</button>
					</div>
					<div className="faci-slide-container">
						<div id="faci-slide">
							<div
								className="faci-slide-item"
								onclick="window.open('/facility/facility.html')"
							>
								<div
									className="faci-slide-img"
									style={{
										backgroundImage:
											"url(./image/facilities/bv-viet-duc.jpg)",
									}}
								></div>
								<div className="faci-content">
									Bệnh viện Hữu nghị Việt Đức
								</div>
							</div>
							<div
								className="faci-slide-item"
								onclick="window.open('/facility/facility.html')"
							>
								<div
									className="faci-slide-img"
									style={{
										backgroundImage:
											"url(./image/facilities/benh-vien-cho-ray-h1.jpg)",
									}}
								></div>
								<div className="faci-content">
									Bệnh viện Chợ Rẫy
								</div>
							</div>
							<div
								className="faci-slide-item"
								onclick="window.open('/facility/facility.html')"
							>
								<div
									className="faci-slide-img"
									style={{
										backgroundImage:
											"url(./image/facilities/pk-dhyd1.jpg)",
									}}
								></div>
								<div className="faci-content">
									Phòng khám Bệnh viện Đại học Y Dược 1
								</div>
							</div>
							<div
								className="faci-slide-item"
								onclick="window.open('/facility/facility.html')"
							>
								<div
									className="faci-slide-img"
									style={{
										backgroundImage:
											"url(./image/facilities/bvk.jpg)",
									}}
								></div>
								<div className="faci-content">
									Bệnh viện K - Cơ sở Phan Chu Trinh
								</div>
							</div>
							<div
								className="faci-slide-item"
								onclick="window.open('/facility/facility.html')"
							>
								<div
									className="faci-slide-img"
									style={{
										backgroundImage:
											"url(./image/facilities/bv-hung-viet.jpg)",
									}}
								></div>
								<div className="faci-content">
									Bệnh viện Ung bướu Hưng Việt
								</div>
							</div>
							<div
								className="faci-slide-item"
								onclick="window.open('/facility/facility.html')"
							>
								<div
									className="faci-slide-img"
									style={{
										backgroundImage:
											"url(./image/facilities/medlatecthanhxuan.jpg)",
									}}
								></div>
								<div className="faci-content">
									Hệ thống y tế MEDLATEC
								</div>
							</div>
							<div
								className="faci-slide-item"
								onclick="window.open('/facility/facility.html')"
							>
								<div
									className="faci-slide-img"
									style={{
										backgroundImage:
											"url(./image/facilities/diag.png)",
									}}
								></div>
								<div className="faci-content">
									Trung tâm xét nghiệm Diag Laboratories
								</div>
							</div>
						</div>
					</div>
					<div className="faci-buttons">
						<button className="faci-prev" id="faci-prev">
							<i className="fas fa-long-arrow-left"></i>
						</button>
						<button className="faci-next" id="faci-next">
							<i className="fas fa-long-arrow-right"></i>
						</button>
					</div>
				</div>

				<div className="outstanding-doctor-container">
					<div className="doctor-content-up">
						<div className="doctor-title">
							Bác sĩ nổi bật tuần qua
						</div>
						<button className="doctor-btn">Xem thêm</button>
					</div>
					<div className="doctor-slide-container">
						<div id="doctor-slide">
							<div
								className="doctor-slide-item"
								onclick="window.open('/outstanding-doctor/outstanding.html')"
							>
								<div
									className="doctor-img"
									style={{
										backgroundImage:
											"url(./image/doctors/nguyen-thi-hoai-an.jpg)",
									}}
								></div>
								<div className="doctor-infor">
									<div className="doctor-name">
										Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thị
										Hoài An
									</div>
									<div>
										<p>Tai Mũi Họng</p>
									</div>
								</div>
							</div>
							<div
								className="doctor-slide-item"
								onclick="window.open('/outstanding-doctor/outstanding.html')"
							>
								<div
									className="doctor-img"
									style={{
										backgroundImage:
											"url(./image/doctors/bshung.jpg)",
									}}
								></div>
								<div className="doctor-infor">
									<div className="doctor-name">
										Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp
										Nguyễn Duy Hưng
									</div>
									<div>
										<p>Da liễu</p>
									</div>
								</div>
							</div>
							<div
								className="doctor-slide-item"
								onclick="window.open('/outstanding-doctor/outstanding.html')"
							>
								<div
									className="doctor-img"
									style={{
										backgroundImage:
											"url(./image/doctors/tran-minh-khuyen.jpg)",
									}}
								></div>
								<div className="doctor-infor">
									<div className="doctor-name">
										Bác sĩ Chuyên khoa II Trần Minh Khuyên
									</div>
									<div>
										<p>Sức khỏe tâm thần</p>
									</div>
								</div>
							</div>
							<div
								className="doctor-slide-item"
								onclick="window.open('/outstanding-doctor/outstanding.html')"
							>
								<div
									className="doctor-img"
									style={{
										backgroundImage:
											"url(./image/doctors/tuyet-nga.jpg)",
									}}
								></div>
								<div className="doctor-infor">
									<div className="doctor-name">
										Bác sĩ Chuyên khoa I Phí Thị Tuyết Nga
									</div>
									<div>
										<p>Sản Phụ khoa</p>
									</div>
								</div>
							</div>
							<div
								className="doctor-slide-item"
								onclick="window.open('/outstanding-doctor/outstanding.html')"
							>
								<div
									className="doctor-img"
									style={{
										backgroundImage:
											"url(./image/doctors/le-thi-tuyet-lan.jpg)",
									}}
								></div>
								<div className="doctor-infor">
									<div className="doctor-name">
										Phó Giáo sư, Tiến sĩ, Bác sĩ Lê Thị
										Tuyết Lan
									</div>
									<div>
										<p>Dị ứng miễn dịch</p>
									</div>
								</div>
							</div>
							<div
								className="doctor-slide-item"
								onclick="window.open('/outstanding-doctor/outstanding.html')"
							>
								<div
									className="doctor-img"
									style={{
										backgroundImage:
											"url(./image/doctors/hoai-huong.jpg)",
									}}
								></div>
								<div className="doctor-infor">
									<div className="doctor-name">
										Bác sĩ chuyên khoa II Trần Thị Hoài
										Hương
									</div>
									<div>
										<p>Da liễu</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="doctor-buttons">
						<button className="doctor-prev" id="doctor-prev">
							<i className="fas fa-long-arrow-left"></i>
						</button>
						<button className="doctor-next" id="doctor-next">
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
								<i className="fas fa-map-marker-alt"></i>28
								Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
							</p>
							<p>
								<i className="fas fa-check"></i>ĐKKD số:
								0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
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
								<a href="#">Gói chuyển đổi số doanh nghiệp</a>
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
							<p>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</p>
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
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
