import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { handleLoginAPI, handleCreateUser } from "../../services/userService";
import * as actions from "../../store/actions/";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./Login.css";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errMsg: "",
		};
	}

	handleOnchangeEmail = (event) => {
		this.setState({
			email: event.target.value,
		});
	};
	handleOnchangePassword = (event) => {
		this.setState({
			password: event.target.value,
		});
	};

	handleLogin = async () => {
		this.setState({
			errMsg: "",
		});
		try {
			let data = await handleLoginAPI(
				this.state.email,
				this.state.password
			);
			if (data && data.code !== 200) {
				this.setState({
					errMsg: data.msg,
				});
			}
			if (data && data.code === 200) {
				this.props.userLoginSuccess(data.user);
			}
		} catch (error) {
			if (error.response) {
				if (error.response.data) {
					this.setState({
						errMsg: error.response.data.msg,
					});
				}
			}
		}
	};

	validateModalInput = () => {
		let isValid = true;
		let arrInput = [
			"newEmail",
			"newPassword",
			"confirmPass",
			"fullName",
			"address",
			"gender",
			"phoneNumber",
		];
		for (let i = 0; i < arrInput.length; i++) {
			if (!this.state[arrInput[i]]) {
				isValid = false;
				this.setState({
					errMsgSignUp: "Missing input parameters !",
				});
				// alert("Missing " + arrInput[i]);
				break;
			}
		}
		return isValid;
	};

	render() {
		return (
			<>
				<div className="login-container">
					<div className="login-box">
						<h2>Đăng nhập</h2>
						<form className="login-form">
							<div className="user-box">
								<input
									type="text"
									id="email"
									required=""
									autoComplete="off"
									value={this.state.email}
									onChange={(event) =>
										this.handleOnchangeEmail(event)
									}
								/>
								<label>Email:</label>
								<i className="fa-solid fa-envelope"></i>
							</div>
							<div className="user-box">
								<input
									type="password"
									id="password"
									required=""
									autoComplete="off"
									value={this.state.password}
									onChange={(event) =>
										this.handleOnchangePassword(event)
									}
								/>
								<label>Mật khẩu:</label>
								<i className="fa-solid fa-lock"></i>
							</div>
							<div className="errMsg" style={{ color: "red" }}>
								{this.state.errMsg}
							</div>
							<Link to="/confirm-email" className="forgot-pass">
								Quên mật khẩu ?
							</Link>
							<div>
								<button
									type="button"
									className="btn-login"
									onClick={() => this.handleLogin()}
								>
									Login
								</button>
							</div>
							<p className="not-member">
								Chưa có tài khoản ?
								<Link to="/sign-up">Đăng kí</Link>
							</p>
						</form>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		lang: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		navigate: (path) => dispatch(push(path)),
		userLoginSuccess: (userInfo) =>
			dispatch(actions.userLoginSuccess(userInfo)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
