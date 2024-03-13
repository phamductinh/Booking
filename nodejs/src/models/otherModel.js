import db from "../configs/connectDB";
import {
	findAllNhanKhau,
	createNhanKhauQuery,
	updateNhanKhauQuery,
	deleteNhanKhauQuery,
} from "../database/queries";

let getAllNhanKhau = (callback) => {
	db.query(findAllNhanKhau, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let createNhanKhauModel = (data, callback) => {
	let {
		HoTen,
		BiDanh,
		NgayThangNamSinh,
		NoiSinh,
		NguyenQuan,
		NoiLamViec,
		QuanHeVoiChuHo,
		SoCMND_CCDC,
		NgheNghiep,
		HoKhauID,
		DiaChiTruocKhiChuyenDen,
		DanToc,
		NgayCapCCND_CCDC,
	} = data;

	db.query(
		createNhanKhauQuery,
		[
			HoTen,
			BiDanh,
			NgayThangNamSinh,
			NoiSinh,
			NguyenQuan,
			NoiLamViec,
			QuanHeVoiChuHo,
			SoCMND_CCDC,
			NgheNghiep,
			HoKhauID,
			DiaChiTruocKhiChuyenDen,
			DanToc,
			NgayCapCCND_CCDC,
		],
		(err, results) => {
			if (err) {
				return callback(err);
			}
			callback(null, results);
		}
	);
};

let updateNhanKhauModel = (data, callback) => {
	let values = [
		data.MaSoDinhDanh,
		data.HoTen,
		data.BiDanh,
		data.NgayThangNamSinh,
		data.NoiSinh,
		data.NguyenQuan,
		data.NoiLamViec,
		data.QuanHeVoiChuHo,
		data.SoCMND_CCDC,
		data.NgheNghiep,
		data.HoKhauID,
		data.DiaChiTruocKhiChuyenDen,
		data.DanToc,
		data.NgayCapCCND_CCDC,
	];
	db.query(updateNhanKhauQuery, values, callback);
};

let deleteNhanKhauModel = (MaSoDinhDanh, callback) => {
	return db.query(deleteNhanKhauQuery, [MaSoDinhDanh], callback);
};

module.exports = {
	getAllNhanKhau,
	createNhanKhauModel,
	updateNhanKhauModel,
	deleteNhanKhauModel,
};
