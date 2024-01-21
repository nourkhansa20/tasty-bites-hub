import axios from "axios";


const axiosClient = axios.create({
  baseURL: `http://localhost:3001/api`,
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
