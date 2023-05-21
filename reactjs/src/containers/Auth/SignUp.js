import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { handleLoginAPI, handleCreateUser } from "../../services/userService";
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
			<div className="signup-container">
				<div class="signup-box">
					<h2>Create an Account</h2>
					<form class="signup-form">
						<div class="form-container">
							<div class="input-group">
								<label for="username">Fullname</label>
								<input
									type="text"
									name="username"
									id="username"
								/>
								<i class="fa-solid fa-user"></i>
							</div>
							<div class="input-group">
								<label for="username">Email</label>
								<input
									type="text"
									name="username"
									id="username"
								/>
								<i class="fa-solid fa-envelope"></i>
							</div>
							<div class="input-group">
								<label for="password">Password</label>
								<input
									type="password"
									name="password"
									id="password"
								/>
								<i class="fa-solid fa-lock"></i>
							</div>
							<div class="input-group">
								<label for="password">Confirm Password</label>
								<input
									type="password"
									name="password"
									id="password"
								/>
								<i class="fa-solid fa-lock"></i>
							</div>
						</div>
						<div class="signup-btn">
							<button class="btn-signup">Sign up</button>
						</div>
						<p class="member">
							Already have an account ?
							<Link to="/login">Login</Link>
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
		userLoginSuccess: (userInfor) =>
			dispatch(actions.userLoginSuccess(userInfor)),
		adminLoginSuccess: (adminInfor) =>
			dispatch(actions.adminLoginSuccess(adminInfor)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
