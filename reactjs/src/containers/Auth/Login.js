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
			newEmail: "",
			newPassword: "",
			confirmPass: "",
			fullName: "",
			address: "",
			gender: "",
			role: "",
			phoneNumber: "",
			errMsg: "",
			errMsgSignUp: "",
			setModalIsOpen: false,
			setLoginOpen: true,
			isShowRole: false,
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
				localStorage.setItem("token", data.token);
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

	handleOpenModal() {
		this.setState({
			setModalIsOpen: true,
			setLoginOpen: false,
		});
	}

	handleCloseModal() {
		this.setState({
			setModalIsOpen: false,
			setLoginOpen: true,
			newEmail: "",
			newPassword: "",
			confirmPass: "",
			fullName: "",
			address: "",
			gender: "",
			role: "",
			phoneNumber: "",
			errMsgSignUp: "",
		});
	}

	handleOnchangeModalInput = (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		this.setState({
			...copyState,
		});
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

	handleAddNewUser = async (data) => {
		this.setState({
			errMsgSignUp: "",
		});
		let newUserData = {
			email: this.state.newEmail,
			password: this.state.newPassword,
			fullName: this.state.fullName,
			address: this.state.address,
			gender: this.state.gender,
			role: this.state.role ? this.state.role : "User",
			phoneNumber: this.state.phoneNumber,
		};
		let isValid = this.validateModalInput();
		if (newUserData.password !== this.state.confirmPass) {
			this.setState({
				errMsgSignUp: "Passwords are not the same !",
			});
		} else if (isValid === true) {
			try {
				let response = await handleCreateUser(newUserData);
				toast.success("Create user successfully!");
				console.log("check response", response);
				this.setState({
					newEmail: "",
					newPassword: "",
					confirmPass: "",
					fullName: "",
					address: "",
					gender: "",
					role: "",
					phoneNumber: "",
					setModalIsOpen: false,
					setLoginOpen: true,
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
			<>
				<div className="login-container">
					<div class="login-box">
						<h2>Login</h2>
						<form class="login-form">
							<div class="user-box">
								<input
									type="text"
									name=""
									required=""
									id="email"
									value={this.state.email}
									onChange={(event) =>
										this.handleOnchangeEmail(event)
									}
								/>
								<label>Email</label>
								<i class="fa-solid fa-envelope"></i>
							</div>
							<div class="user-box">
								<input
									type="password"
									name=""
									required=""
									id="password"
									value={this.state.password}
									onChange={(event) =>
										this.handleOnchangePassword(event)
									}
								/>
								<label>Password</label>
								<i class="fa-solid fa-lock"></i>
							</div>
							<div className="errMsg" style={{ color: "red" }}>
								{this.state.errMsg}
							</div>
							<Link to="/" class="forgot-pass">
								Forgot password ?
							</Link>
							<div>
								<button
									class="btn-login"
									onClick={() => this.handleLogin()}
								>
									Login
								</button>
							</div>
							<p class="not-member">
								Not a member ?<Link to="/sign-up">Sign Up</Link>
							</p>
						</form>
					</div>
				</div>

				{/* {setModalIsOpen ? (
					<div id="add-new-modal" className="modal">
						<div className="modal-content">
							<p>Create user</p>
							<input
								className="email"
								type="email"
								placeholder="Email"
								value={this.state.newEmail}
								onChange={(event) =>
									this.handleOnchangeModalInput(
										event,
										"newEmail"
									)
								}
							/>
							<div className="pass-field">
								<input
									className="password"
									type="password"
									autoComplete="off"
									placeholder="Password"
									value={this.state.newPassword}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"newPassword"
										)
									}
								/>
								<input
									className="confirm-password"
									type="password"
									autoComplete="off"
									placeholder="Confirm Password"
									value={this.state.confirmPass}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"confirmPass"
										)
									}
								/>
							</div>
							<input
								className="fullname"
								name="fullName"
								type="text"
								placeholder="Fullname"
								value={this.state.fullName}
								onChange={(event) =>
									this.handleOnchangeModalInput(
										event,
										"fullName"
									)
								}
							/>
							<input
								className="address"
								name="address"
								type="text"
								placeholder="Address"
								value={this.state.address}
								onChange={(event) =>
									this.handleOnchangeModalInput(
										event,
										"address"
									)
								}
							/>

							<div className="modal-select">
								<input
									className="phoneNumber"
									type="tel"
									placeholder="Phone"
									value={this.state.phoneNumber}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"phoneNumber"
										)
									}
								/>
								<select
									name="gender"
									id="gender-select"
									value={this.state.gender}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"gender"
										)
									}
								>
									<option value="" disabled>
										Gender
									</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
									<option value="other">Other</option>
								</select>

								{isShowRole ? (
									<select
										name="role"
										id="role-select"
										value={this.state.role}
										onChange={(event) =>
											this.handleOnchangeModalInput(
												event,
												"role"
											)
										}
									>
										<option value="" disabled>
											Role
										</option>
										<option value="admin">Admin</option>
										<option value="doctor">Doctor</option>
										<option value="user">User</option>
									</select>
								) : null}
							</div>
							<div
								className="errMsgSignUp"
								style={{ color: "red" }}
							>
								{this.state.errMsgSignUp}
							</div>

							<div className="modal-btn">
								<button
									className="btn-add-new"
									type="button"
									onClick={() => this.handleAddNewUser()}
								>
									Add
								</button>
								<button
									className="btn-cancel"
									type="button"
									onClick={() => this.handleCloseModal()}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				) : null} */}
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
		userLoginSuccess: (userInfor) =>
			dispatch(actions.userLoginSuccess(userInfor)),
		adminLoginSuccess: (adminInfor) =>
			dispatch(actions.adminLoginSuccess(adminInfor)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
