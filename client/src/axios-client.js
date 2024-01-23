import axios from "axios";


const axiosClient = axios.create({
  baseURL: `http://localhost:3001/api`,
});

axiosClient.interceptors.request.use(
  (config) => {
    const localStorageToken = localStorage.getItem('@@auth0spajs@@::IhNRP2w9YJrLozs5AuF61vGyhUnBYcn9::https://www.tastybiteshub-api.com::openid profile email offline_access');
    const token = JSON.parse(localStorageToken);
    if (token) {
      config.headers.Authorization = `Bearer ${token.body.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
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
