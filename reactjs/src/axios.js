import axios from "axios";
import _ from "lodash";

const instance = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	// withCredentials: true
});

instance.interceptors.response.use(
	(response) => {
        // Xử lý phản hồi thành công
        return response.data;
      },
    //   (error) => {
    //     // Xử lý lỗi
    //     if (error.response) {
    //       // Xử lý lỗi phản hồi từ server
    //       return Promise.reject(error.response.data);
    //     } else if (error.request) {
    //       // Xử lý lỗi không có phản hồi từ server
    //       return Promise.reject('No response from server');
    //     } else {
    //       // Xử lý lỗi không thể gửi yêu cầu
    //       return Promise.reject(error.message);
    //     }
    //   }
);

export default instance;
