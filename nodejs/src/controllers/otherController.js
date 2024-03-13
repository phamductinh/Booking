import otherModel from "../models/otherModel";
import db from "../configs/connectDB";

let getAllNhanKhau = (req, res) => {
	otherModel.getAllNhanKhau((error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				msg: "Failed!",
			});
		} else {
			return res.status(200).send({
				code: 200,
				data: results,
			});
		}
	});
};

let createNhanKhau = (req, res) => {
	let data = req.body;
	otherModel.createNhanKhauModel(data, (err, results) => {
		if (err) {
			return res.status(err.statusCode).send({
				code: err.statusCode,
				msg: err.message,
			});
		}
		return res.status(201).send({
			code: 200,
			msg: "Tạo nhân khẩu thành công!",
		});
	});
};

let updateNhanKhau = (req, res) => {
	let data = req.body;
	otherModel.updateNhanKhauModel(data, (error, results, fields) => {
		if (error) throw error;
		return res.send({
			code: 200,
			msg: "Cập nhật thành công!",
		});
	});
};

let deleteNhanKhau = (req, res) => {
	let MaSoDinhDanh = req.query.MaSoDinhDanh;
	if (!MaSoDinhDanh) {
		return res.status(400).send({ code: 400, msg: "Failed!" });
	}
	otherModel.deleteNhanKhauModel(MaSoDinhDanh, (error, results, fields) => {
		if (error) throw error;
		return res.send({
			code: 200,
			msg: "Xoa thanh cong!",
		});
	});
};

let getNhanKhauByName = (req, res) => {
	const keyword = req.query.keyword;
	let findNhanKhauByKeyword = "SELECT * FROM nhankhau WHERE HoTen LIKE ?";
	db.query(findNhanKhauByKeyword, [`%${keyword}%`], (error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				message: "An error occurred while fetching data",
				error: error.message,
			});
		}
		return res.status(200).send({
			code: 200,
			data: results,
		});
	});
};

// let getNhanKhauByName = (req, res) => {
// 	const keyword = req.query.keyword;
// 	let findNhanKhauByKeyword = `SELECT * FROM nhankhau WHERE HoTen LIKE '%${keyword}%'`;
// 	db.query(findNhanKhauByKeyword, (error, results) => {
// 		if (error) {
// 			throw error;
// 		}
// 		console.log(results);
// 		return res.send({
// 			code: 200,
// 			data: results,
// 		});
// 	});
// };

module.exports = {
	getAllNhanKhau,
	createNhanKhau,
	updateNhanKhau,
	deleteNhanKhau,
	getNhanKhauByName,
};
