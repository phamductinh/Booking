import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageDoctor.css";
import {
	findAllDoctorService,
	handleCreateDoctor,
	deleteDoctor,
	updateDoctor,
	getDoctorById,
} from "../../../services/doctorService";
import { getALLSpecialty } from "../../../services/specialtyService";
import { getAllClinics } from "../../../services/clinicService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../Header/Header";
import LoadingSpinner from "../../../components/Common/Loading";
import { CommonUtils } from "../../../utils";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrDoctors: [],
			arrClinics: [],
			arrSpecialty: [],
			id: "",
			name: "",
			address: "",
			image: "",
			imageBase64: "",
			setModalIsOpen: false,
			setModalEditUser: false,
			isLoading: false,
			confirmDelete: false,
		};
	}

	async componentDidMount() {
		await this.getAllDoctorsReact();
		await this.getAllClinicsReact();
		await this.getAllSpecialtyReact();
	}

	getAllDoctorsReact = async () => {
		this.setState({
			isLoading: true,
		});
		let res = await findAllDoctorService();
		if (res && res.code === 200) {
			this.setState({
				arrDoctors: res.data,
				isLoading: false,
			});
		}
	};
	getAllSpecialtyReact = async () => {
		this.setState({
			isLoading: true,
		});
		let res = await getALLSpecialty();
		if (res && res.code === 200) {
			this.setState({
				arrSpecialty: res.data,
				isLoading: false,
			});
		}
	};
	getAllClinicsReact = async () => {
		this.setState({
			isLoading: true,
		});
		let res = await getAllClinics();
		if (res && res.code === 200) {
			this.setState({
				arrClinics: res.data,
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
			name: user.name,
			introduction: user.introduction,
			clinicId: user.clinicId,
			specialtyId: user.specialtyId,
			description: user.description,
			address: user.address,
			price: user.price,
		});
	}

	handleCloseModal() {
		this.setState({
			setModalEditUser: false,
			setModalIsOpen: false,
			name: "",
			introduction: "",
			clinicId: "",
			specialtyId: "",
			description: "",
			address: "",
			price: "",
			image: "",
			isLoading: false,
			errMsgSignUp: "",
		});
	}

	handleOnchangeModalInput = async (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		await this.setState({
			...copyState,
		});
		console.log("check state", this.state);
	};

	handleEditorChange = async ({ html, text }) => {
		await this.setState({
			descriptionHTML: html,
		});
	};

	handleOnchangeImage = async (event) => {
		let data = event.target.files;
		let file = data[0];
		if (file) {
			let base64 = await CommonUtils.getBase64(file);
			await this.setState({
				imageBase64: base64,
			});
		}
	};

	handleAddNewDoctor = async () => {
		let newDoctorData = {
			name: this.state.name,
			introduction: this.state.introduction,
			clinicId: this.state.clinic,
			specialtyId: this.state.specialty,
			description: this.state.descriptionHTML,
			address: this.state.address,
			price: this.state.price,
			image: this.state.imageBase64,
		};
		console.log("data", newDoctorData);
		try {
			this.setState({
				errMsgSignUp: "",
				isLoading: true,
			});
			let response = await handleCreateDoctor(newDoctorData);
			await this.getAllDoctorsReact();
			console.log("check response", response);
			toast.success("Add doctor successfully !");
			this.setState({
				name: "",
				introduction: "",
				clinicId: "",
				specialtyId: "",
				description: "",
				address: "",
				price: "",
				image: "",
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
	};

	handleDeleteUser = async () => {
		try {
			let res = await deleteDoctor(this.state.userId);
			if (res && res.code === 200) {
				await this.getAllDoctorsReact();
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
			let res = await updateDoctor(token, userData);
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
			arrDoctors,
			arrClinics,
			arrSpecialty,
			setModalIsOpen,
			setModalEditUser,
			isLoading,
			confirmDelete,
		} = this.state;
		console.log(arrClinics);
		return (
			<>
				{this.props.isLoggedIn && <Header />}
				<div className="user-container">
					<div className="title text-center">Manage Doctors</div>
					<div className="mx-3">
						<button
							className="btn btn-primary px-3"
							onClick={() => this.handleOpenModal()}
						>
							Add new doctor
						</button>
					</div>
					<div className="users-table mt-3 mx-3">
						<table id="customers">
							<tr>
								<th width="5%" className="text-center">
									Id
								</th>
								<th width="20%" className="text-center">
									Image
								</th>
								<th width="20%" className="text-center">
									Name
								</th>
								<th width="20%" className="text-center">
									Introduction
								</th>
								<th width="15%" className="text-center">
									Address
								</th>
								<th width="10%" className="text-center">
									Price
								</th>
								<th width="10%" className="text-center">
									Actions
								</th>
							</tr>

							{arrDoctors &&
								arrDoctors.map((item, index) => {
									return (
										<tr key={index}>
											<td>{item.id}</td>
											<td>
												<div
													className="doctor-img-table"
													style={{
														backgroundImage: `url(${
															item.image
																? new Buffer(
																		item.image,
																		"base64"
																  ).toString(
																		"binary"
																  )
																: "https://ihfeducation.ihf.info/images/no_avatar.gif"
														})`,
													}}
												></div>
											</td>
											<td>{item.name}</td>
											<td>{item.introduction}</td>
											<td>{item.address}</td>
											<td>{item.price}</td>
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
								<p>Add new doctor</p>
								<input
									className="name"
									type="text"
									placeholder="Name"
									value={this.state.name}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"name"
										)
									}
								/>
								<textarea
									name="introduction"
									id="introduction"
									placeholder="Introduction"
									cols="30"
									rows="5"
									value={this.state.introduction}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"introduction"
										)
									}
								></textarea>

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
								<div className="price-field">
									<input
										className="price"
										name="price"
										type="text"
										placeholder="Price"
										value={this.state.price}
										onChange={(event) =>
											this.handleOnchangeModalInput(
												event,
												"price"
											)
										}
									/>
									<input
										className="doctor-image"
										name="image"
										type="file"
										accept="image/png, image/jpeg"
										onChange={(event) =>
											this.handleOnchangeImage(
												event,
												"image"
											)
										}
									/>
								</div>
								<div className="modal-select">
									<select
										name="clinic"
										id="clinic-select"
										value={this.state.clinic}
										onChange={(event) =>
											this.handleOnchangeModalInput(
												event,
												"clinic"
											)
										}
									>
										<option value="" disabled>
											Clinic
										</option>
										{arrClinics &&
											arrClinics.length > 0 &&
											arrClinics.map((item, index) => (
												<option
													key={index}
													value={item.id}
												>
													{item.name}
												</option>
											))}
									</select>

									<select
										name="specialty"
										id="specialty-select-doctor"
										value={this.state.specialty}
										onChange={(event) =>
											this.handleOnchangeModalInput(
												event,
												"specialty"
											)
										}
									>
										<option value="" disabled>
											Specialty
										</option>
										{arrSpecialty &&
											arrSpecialty.length > 0 &&
											arrSpecialty.map((item, index) => (
												<option
													key={index}
													value={item.id}
												>
													{item.name}
												</option>
											))}
									</select>
								</div>
								<MdEditor
									style={{ height: "250px" }}
									renderHTML={(text) => mdParser.render(text)}
									onChange={this.handleEditorChange}
									value={this.state.description}
								/>
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
										onClick={() =>
											this.handleAddNewDoctor()
										}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
