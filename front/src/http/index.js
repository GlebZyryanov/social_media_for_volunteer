import axios from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authAdminHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

const adminAuthInterceptor = async (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;

  try {
    const response = await $host.get('/user/role', {
      headers: {
        authorization: config.headers.authorization,
      },
    });

    if (response.data.role !== 'ADMIN') {
      throw new Error('Access denied (admin only)');
    }
  } catch (error) {
    throw new Error('Access denied (admin only)');
  }

  return config;
};

$authHost.interceptors.request.use(authInterceptor);
$authAdminHost.interceptors.request.use(adminAuthInterceptor);

export { $host, $authHost, $authAdminHost };
