import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { handleCreateUser } from "../../services/userService";
import * as actions from "../../store/actions/";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import "./SignUp.css";

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			confirmPass: "",
			fullName: "",
			role: "",
			errMsg: "",
			errMsgSignUp: "",
		};
	}

	handleOnchangeInput = async (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		await this.setState({
			...copyState,
		});
		console.log("check state", this.state);
	};

	validateModalInput = () => {
		let isValid = true;
		let arrInput = ["email", "password", "confirmPass", "fullName"];
		for (let i = 0; i < arrInput.length; i++) {
			if (!this.state[arrInput[i]]) {
				isValid = false;
				this.setState({
					errMsgSignUp: "Vui lòng nhập đầy dủ thông tin!",
				});
				// alert("Missing " + arrInput[i]);
				break;
			}
		}
		return isValid;
	};

	handleAddNewUser = async (data) => {
		this.setState({
			errMsgSignUp: "",
		});
		let newUserData = {
			email: this.state.email,
			password: this.state.password,
			fullName: this.state.fullName,
			role: this.state.role ? this.state.role : "User",
		};
		let isValid = this.validateModalInput();
		if (newUserData.password !== this.state.confirmPass) {
			this.setState({
				errMsgSignUp: "Mật khẩu không trùng nhau!",
			});
		} else if (isValid === true) {
			try {
				let response = await handleCreateUser(newUserData);
				toast.success("Tạo tài khoản thành công!");
				console.log("check response", response);
				this.setState({
					email: "",
					password: "",
					confirmPass: "",
					fullName: "",
				});
			} catch (error) {
				if (error.response) {
					if (error.response.data) {
						this.setState({
							errMsgSignUp: error.response.data.msg,
						});
					}
				}
			}
		}
	};

	render() {
		return (
			<div className="signup-container">
				<div className="signup-box">
					<h2>Tạo tài khoản</h2>
					<form className="signup-form">
						<div className="form-container">
							<div className="input-group">
								<label>Họ và tên:</label>
								<input
									type="text"
									name="fullName"
									id="fullName"
									autoComplete="off"
									value={this.state.fullName}
									onChange={(event) =>
										this.handleOnchangeInput(
											event,
											"fullName"
										)
									}
								/>
								<i className="fa-solid fa-user"></i>
							</div>
							<div className="input-group">
								<label>Email:</label>
								<input
									type="email"
									name="email"
									id="email"
									autoComplete="off"
									value={this.state.email}
									onChange={(event) =>
										this.handleOnchangeInput(event, "email")
									}
								/>
								<i className="fa-solid fa-envelope"></i>
							</div>
							<div className="input-group">
								<label>Mật khẩu:</label>
								<input
									type="password"
									name="password"
									id="password"
									autoComplete="off"
									value={this.state.password}
									onChange={(event) =>
										this.handleOnchangeInput(
											event,
											"password"
										)
									}
								/>
								<i className="fa-solid fa-lock"></i>
							</div>
							<div className="input-group">
								<label>Nhập lại mật khẩu:</label>
								<input
									type="password"
									name="cf-password"
									id="cf-password"
									autoComplete="off"
									value={this.state.confirmPass}
									onChange={(event) =>
										this.handleOnchangeInput(
											event,
											"confirmPass"
										)
									}
								/>
								<i className="fa-solid fa-lock"></i>
							</div>
						</div>
						<div className="errMsgSignUp">
							{this.state.errMsgSignUp}
						</div>
						<div className="signup-btn">
							<button
								type="button"
								className="btn-signup"
								onClick={() => this.handleAddNewUser()}
							>
								Sign up
							</button>
						</div>
						<p className="member">
							Đã có tài khoản ?<Link to="/login">Đăng nhập</Link>
						</p>
					</form>
				</div>
			</div>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
