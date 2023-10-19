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
import { getDoctorAcc } from "../../../services/userService";
const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrDoctors: [],
			arrClinics: [],
			arrSpecialty: [],
			arrDoctorAcc: [],
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
		await this.getAllClinicsReact();
		await this.getAllSpecialtyReact();
		await this.getAllDoctorAcc();
		await this.getAllDoctorsReact();
	}

	getAllDoctorAcc = async () => {
		this.setState({
			isLoading: true,
		});
		let res = await getDoctorAcc();
		console.log(res);
		if (res && res.code === 200) {
			this.setState({
				arrDoctorAcc: res.data,
				isLoading: false,
			});
		}
	};
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
			userId: this.state.userId,
			introduction: this.state.introduction,
			description: this.state.descriptionHTML,
			specialtyId: this.state.specialty,
			price: this.state.price,
			image: this.state.imageBase64,
			clinicId: this.state.clinic,
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
				userId: "",
				introduction: "",
				clinicId: "",
				specialtyId: "",
				descriptionHTML: "",
				price: "",
				imageBase64: "",
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
			arrDoctorAcc,
			setModalIsOpen,
			setModalEditUser,
			isLoading,
			confirmDelete,
		} = this.state;
		console.log("check doctor", arrDoctors);
		return (
			<>
				{this.props.isLoggedIn && <Header />}
				<div className="user-container">
					<div className="title text-center">Quản lý bác sĩ</div>
					<div className="mx-3">
						<button
							className="btn btn-primary px-3"
							onClick={() => this.handleOpenModal()}
						>
							Thêm mới bác sĩ
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
																: "https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg"
														})`,
													}}
												></div>
											</td>
											<td>{item.fullName}</td>
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
								<p>Thêm mới bác sĩ</p>
								<select
									name="doctor"
									id="doctor-select"
									value={this.state.userId}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"userId"
										)
									}
								>
									<option value="" disabled>
										Doctor
									</option>
									{arrDoctorAcc &&
										arrDoctorAcc.length > 0 &&
										arrDoctorAcc.map((item, index) => (
											<option key={index} value={item.id}>
												{item.fullName}
											</option>
										))}
								</select>
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
								<p>Thêm mới bác sĩ</p>
								<select
									name="doctor"
									id="doctor-select"
									value={this.state.userId}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"userId"
										)
									}
								>
									<option value="" disabled>
										Doctor
									</option>
									{arrDoctorAcc &&
										arrDoctorAcc.length > 0 &&
										arrDoctorAcc.map((item, index) => (
											<option key={index} value={item.id}>
												{item.fullName}
											</option>
										))}
								</select>
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

					{confirmDelete ? (
						<div className="confirm-delete">
							<div className="confirmation-text">
								Bạn có chắc chắn muốn xóa không?
							</div>
							<div className="button-container">
								<button
									className="cancel-button"
									onClick={() =>
										this.handleCloseConfirmDelete()
									}
								>
									Hủy
								</button>
								<button
									className="confirmation-button"
									onClick={() => this.handleDeleteUser()}
								>
									Xóa
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
