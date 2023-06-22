import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./confirmEmail.css";
import { toast } from "react-toastify";
import { handleConfirmEmail } from "../../services/userService";

class confirmEmail extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {}

	handleOnchangeEmail = (event) => {
		this.setState({
			email: event.target.value,
		});
	};

	handleConfirm = async (data) => {
		this.setState({
			errMsgSignUp: "",
		});
		let email = this.state.email;
		try {
			let response = await handleConfirmEmail(email);
			toast.success("Gửi email xác nhận thành công!");
			console.log("check response", response);
			this.setState({
				email: "",
			});
		} catch (error) {
			console.log(error);
		}
	};

	goBack = () => {
		this.props.history.push(`/login`);
	};

	render() {
		return (
			<>
				<div className="booking-detail-doctor-container">
					<div className="detail-doctor-header">
						<div className="detail-doctor-header-left">
							<i
								className="fas fa-long-arrow-left"
								onClick={this.goBack}
							></i>
						</div>
						<div className="detail-doctor-header-right">
							<div className="detail-doctor-header-support">
								<i className="far fa-question-circle"></i>
								Hỗ trợ
							</div>
							<i className="fas fa-bars"></i>
						</div>
					</div>
					<div class="form-container-email">
						<div class="logo-container-email">
							Tìm tài khoản của bạn
						</div>

						<form class="form-email">
							<div class="form-group-email">
								<label for="email">
									Vui lòng nhập email để tìm kiếm tài khoản
									của bạn
								</label>
								<input
									type="text"
									id="email"
									name="email"
									placeholder="Nhập email của bạn"
									required=""
									onChange={(event) =>
										this.handleOnchangeEmail(event)
									}
								/>
							</div>

							<button
								class="form-submit-btn-email"
								type="button"
								onClick={() => this.handleConfirm()}
							>
								Send Email
							</button>
						</form>

						<p class="signup-link">
							Chưa có tài khoản?
							<Link to="/sign-up">Đăng kí</Link>
						</p>
					</div>

					<div className="booking-detail-doctor-container">
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
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(confirmEmail);
