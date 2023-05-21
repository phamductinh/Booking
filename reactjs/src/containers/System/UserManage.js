import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.css";
import {
	getAllUsers,
	handleCreateUser,
	deleteUser,
	editUser,
} from "../../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import LoadingSpinner from "../../components/Common/Loading";

class UserManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrUsers: [],
			id: "",
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
			setModalIsOpen: false,
			setModalEditUser: false,
			isLoading: false,
			confirmDelete: false,
		};
	}

	async componentDidMount() {
		await this.getAllUsersReact();
	}

	getAllUsersReact = async () => {
		this.setState({
			isLoading: true,
		});
		let token = localStorage.getItem("token");
		let res = await getAllUsers(token);
		console.log("test");
		if (res && res.code === 200) {
			this.setState({
				arrUsers: res.data,
				isLoading: false,
			});
		}
	};

	handleOpenModal() {
		this.setState({
			setModalIsOpen: true,
		});
	}

	handleOpenModalEdit(user) {
		this.setState({
			setModalEditUser: true,
			newEmail: user.email,
			newPassword: user.password,
			fullName: user.fullName,
			address: user.address,
			gender: user.gender,
			role: user.role,
			phoneNumber: user.phoneNumber,
			userId: user.id,
		});
	}

	handleCloseModal() {
		this.setState({
			setModalEditUser: false,
			setModalIsOpen: false,
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
			"role",
			"phoneNumber",
		];
		for (let i = 0; i < arrInput.length; i++) {
			if (!this.state[arrInput[i]]) {
				isValid = false;
				this.setState({
					errMsgSignUp: "Missing input parameters !",
				});
				break;
			}
		}
		return isValid;
	};

	handleAddNewUser = async (data) => {
		let newUserData = {
			email: this.state.newEmail,
			password: this.state.newPassword,
			fullName: this.state.fullName,
			address: this.state.address,
			gender: this.state.gender,
			role: this.state.role,
			phoneNumber: this.state.phoneNumber,
		};
		let isValid = this.validateModalInput();
		if (newUserData.password !== this.state.confirmPass) {
			this.setState({
				errMsgSignUp: "Passwords are not the same !",
			});
		} else if (isValid === true) {
			try {
				this.setState({
					errMsgSignUp: "",
					isLoading: true,
				});
				let response = await handleCreateUser(newUserData);
				await this.getAllUsersReact();
				console.log("check response", response);
				toast.success("Add user successfully !");
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
					isLoading: false,
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

	handleDeleteUser = async () => {
		try {
			let token = localStorage.getItem("token");
			let res = await deleteUser(token, this.state.userId);
			if (res && res.code === 200) {
				await this.getAllUsersReact();
				toast.success("Delete successfully !");
				this.setState({
					confirmDelete: false,
				});
			}
		} catch (error) {
			console.log(error);
			toast.error("Something wrong !");
		}
	};

	handleEditUser = async () => {
		try {
			let userData = {
				fullName: this.state.fullName,
				address: this.state.address,
				gender: this.state.gender,
				role: this.state.role,
				phoneNumber: this.state.phoneNumber,
				id: this.state.userId,
			};

			let token = localStorage.getItem("token");
			let res = await editUser(token, userData);
			if (res && res.code === 200) {
				this.setState({
					setModalEditUser: false,
				});
				await this.getAllUsersReact();
				toast.success("Update successfully !");
			}
		} catch (error) {
			console.log(error);
			toast.error("Something wrong !");
		}
	};

	handleConfirmDelete = (user) => {
		this.setState({
			confirmDelete: true,
			userId: user.id,
		});
	};

	handleCloseConfirmDelete() {
		this.setState({
			confirmDelete: false,
		});
	}

	render() {
		let {
			arrUsers,
			setModalIsOpen,
			setModalEditUser,
			isLoading,
			confirmDelete,
		} = this.state;
		return (
			<>
				{this.props.isLoggedIn && <Header />}
				<div className="user-container">
					<div className="title text-center">Manage users</div>
					<div className="mx-3">
						<button
							className="btn btn-primary px-3"
							onClick={() => this.handleOpenModal()}
						>
							Add new user
						</button>
					</div>
					<div className="users-table mt-3 mx-3">
						<table id="customers">
							<tr>
								<th width="20%" className="text-center">
									Email
								</th>
								<th width="20%" className="text-center">
									Fullname
								</th>
								<th width="20%" className="text-center">
									Address
								</th>
								<th width="14%" className="text-center">
									Gender
								</th>
								<th width="14%" className="text-center">
									Role
								</th>
								<th width="12%" className="text-center">
									Actions
								</th>
							</tr>

							{arrUsers &&
								arrUsers.map((item, index) => {
									return (
										<tr key={index}>
											<td>{item.email}</td>
											<td>{item.fullName}</td>
											<td>{item.address}</td>
											<td>{item.gender}</td>
											<td>{item.role}</td>
											<td className="text-center">
												<button
													className="btn-edit"
													onClick={() =>
														this.handleOpenModalEdit(
															item
														)
													}
												>
													<i className="fas fa-pencil-alt"></i>
												</button>
												<button
													className="btn-delete"
													onClick={() =>
														this.handleConfirmDelete(
															item
														)
													}
												>
													<i className="fas fa-trash"></i>
												</button>
											</td>
										</tr>
									);
								})}
						</table>
					</div>

					{setModalIsOpen ? (
						<div id="add-new-modal" className="modal">
							<div className="modal-content">
								<p>Add new user</p>
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
										<option value="Male">Male</option>
										<option value="Female">Female</option>
										<option value="Other">Other</option>
									</select>

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
										<option value="Admin">Admin</option>
										<option value="Doctor">Doctor</option>
										<option value="User">User</option>
									</select>
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
					) : null}

					{setModalEditUser ? (
						<div id="add-new-modal" className="modal">
							<div className="modal-content">
								<p>Edit user</p>
								<input
									className="email"
									type="email"
									placeholder="Email"
									value={this.state.newEmail}
									disabled
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"newEmail"
										)
									}
								/>
								<div className="pass-field">
									<input
										className="password-edit"
										type="password"
										disabled
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
										<option value="Male">Male</option>
										<option value="Female">Female</option>
										<option value="Other">Other</option>
									</select>

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
										<option value="Admin">Admin</option>
										<option value="Doctor">Doctor</option>
										<option value="User">User</option>
									</select>
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
										onClick={() => this.handleEditUser()}
									>
										Save
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
					) : null}

					{confirmDelete ? (
						<div className="confirm-delete">
							<div className="confirmation-text">
								Are you sure ?
							</div>
							<div className="button-container">
								<button
									className="cancel-button"
									onClick={() =>
										this.handleCloseConfirmDelete()
									}
								>
									Cancel
								</button>
								<button
									className="confirmation-button"
									onClick={() => this.handleDeleteUser()}
								>
									Delete
								</button>
							</div>
						</div>
					) : null}

					{isLoading && <LoadingSpinner />}
				</div>
			</>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
