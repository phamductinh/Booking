import React, { Component } from "react";
import { connect } from "react-redux";
import { findDoctorByIdService } from "../../../services/doctorService";
import "./DetailDoctor.css";

class DetailDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detailDoctor: {},
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
			console.log(this.state.detailDoctor);
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {}

	render() {
		console.log(this.props.match.params.id);
		return (
			<>
				<div class="outstanding-doctor-container">
					<div class="detail-doctor-header">
						<div class="detail-doctor-header-left">
							<i
								class="fas fa-long-arrow-left"
								onclick="window.open('/home/home.html','_self')"
							></i>
							<h2>
								Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy
								Hưng
							</h2>
						</div>
						<div class="detail-doctor-header-right">
							<div class="detail-doctor-header-support">
								<i class="far fa-question-circle"></i>
								Hỗ trợ
							</div>
							<i class="fas fa-bars"></i>
						</div>
					</div>
					<div class="detail-doctor-container">
						<div class="detail-doctor-infor">
							<div
								class="detail-doctor-img"
								style={{
									backgroundImage: `url("https://ihfeducation.ihf.info/images/no_avatar.gif")`,
								}}
							></div>
							<div class="detail-doctor-infors">
								<h1>Bác sĩ Chuyên khoa II Trần Minh Khuyên</h1>
								<p>
									Nguyên Trưởng khoa lâm sàng, Bệnh tâm thần
									Thành phố Hồ Chí Minh
								</p>
								<p>
									Tốt nghiệp Tâm lý trị liệu, trường Tâm lý
									Thực hành Paris (Psychology practique de
									Paris)
								</p>
								<p>Bác sĩ nhận khám từ 16 tuổi trở lên</p>
							</div>
						</div>
						<div class="detail-doctor-schedule">
							<div class="detail-doctor-schedule-left">
								<select class="date-chooser" id="date-chooser">
									<option value="2812">
										Hôm nay - 28/12
									</option>
									<option value="2912">Thứ 5 - 29/12</option>
									<option value="3012">Thứ 6 - 30/12</option>
								</select>
								<h2>
									<i class="fas fa-calendar-alt"></i>LỊCH KHÁM
								</h2>
								<div class="available-schedule">
									<a>07:00 - 07:30</a>
									<a>07:30 - 08:00</a>
									<a>08:00 - 08:30</a>
									<a>08:30 - 09:00</a>
									<a>09:00 - 09:30</a>
									<a>09:30 - 10:00</a>
								</div>
								<div class="choose-and-book">
									<p>
										Chọn <i class="fas fa-hand-pointer"></i>
										và đặt (Phí đặt lịch 0đ)
									</p>
								</div>
							</div>
							<div class="detail-doctor-schedule-right">
								<div class="exam-address">
									<h3>ĐỊA CHỈ KHÁM</h3>
									<p>Bệnh viện Đa khoa Hồng Phát</p>
									<p>
										Số 219 Lê Duẩn - Hai Bà Trưng - Hà Nội
									</p>
								</div>
								<div class="exam-price">
									<h3>
										<strong>GIÁ KHÁM:</strong> 500.000đ.
										<a>Xem chi tiết</a>
									</h3>
								</div>
								<div class="insurance">
									<h3>
										<strong>LOẠI BẢO HIỂM ÁP DỤNG.</strong>
										<a>Xem chi tiết</a>
									</h3>
								</div>
							</div>
						</div>
						<div class="detail-doctor-introduction">
							<h2>Bác sĩ Chuyên khoa II Trần Minh Khuyên</h2>
							<ul>
								<li>
									Nguyên Trưởng khoa lâm sàng, Bệnh tâm thần
									Thành phố Hồ Chí Minh
								</li>
								<li>
									Tốt nghiệp Tâm lý trị liệu, trường Tâm lý
									Thực hành Paris (Psychology practique de
									Paris)
								</li>
								<li>Bác sĩ nhận khám từ 16 tuổi trở lên</li>
							</ul>
							<h2>Quá trình đào tạo</h2>
							<ul>
								<li>
									Tốt nghiệp Bác sĩ Đa khoa, Trường Đại học y
									dược thành phố Hồ Chí Minh
								</li>
								<li>
									Học chuyên khoa cấp I và chuyên khoa cấp II
									Chuyên ngành Tâm thần, Đại học Y khoa Huế
								</li>
								<li>
									Tốt nghiệp Tâm lý trị liệu, trường Tâm lý
									thực Hành Paris (Psychology practique de
									Paris)
								</li>
							</ul>
						</div>

						<div class="introduction">
							<div
								class="bookingcare-role-btn"
								onclick="hiden_introduction()"
							>
								<p>Vai trò của BookingCare</p>
							</div>
							<div
								id="hiden-introduction"
								class="hiden-introduction"
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
						</div>

						<div class="more-questions">
							<p>
								Cần tìm hiểu thêm?
								<a href="#">Xem câu hỏi thường gặp.</a>
							</p>
						</div>

						<div class="footer1">
							<div class="company-infor">
								<div class="company-logo"></div>
								<div class="company-address">
									<h2>
										Công ty Cổ phần Công nghệ BookingCare
									</h2>
									<p>
										<i class="fas fa-map-marker-alt"></i>28
										Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
									</p>
									<p>
										<i class="fas fa-check"></i>ĐKKD số:
										0106790291. Sở KHĐT Hà Nội cấp ngày
										16/03/2015
									</p>
								</div>
								<div class="registered">
									<div class="registered-1"></div>
									<div class="registered-2"></div>
								</div>
							</div>
							<div class="list-features">
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
							<div class="more-infor">
								<div class="headquarter">
									<h2>Trụ sở tại Hà Nội</h2>
									<p>
										28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà
										Nội
									</p>
								</div>
								<div class="office">
									<h2>Văn phòng tại TP Hồ Chí Minh</h2>
									<p>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</p>
								</div>
								<div class="footer-support">
									<h2>Hỗ trợ khách hàng</h2>
									<p>support@bookingcare.vn (7h - 18h)</p>
								</div>
							</div>
						</div>

						<div class="footer2">
							<div class="footer-left">
								<p>&copy; 2022 Pham Duc Tinh</p>
							</div>
							<div class="footer-right">
								<i class="fab fa-facebook-square"></i>
								<i class="fab fa-youtube"></i>
								<i class="fab fa-instagram"></i>
								<i class="fab fa-twitter"></i>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
