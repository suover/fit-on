import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

// axios 인스턴스 생성
const instance = axios.create({
  withCredentials: true,
});

// 토큰 갱신 로직
const refreshAuthLogic = (failedRequest: any) => {
  return axios
    .post('/api/auth/refresh')
    .then((tokenRefreshResponse) => {
      localStorage.setItem(
        'accessToken',
        tokenRefreshResponse.data.accessToken,
      );
      failedRequest.response.config.headers['Authorization'] =
        'Bearer ' + tokenRefreshResponse.data.accessToken;

      // React 상태 업데이트 이벤트 디스패치
      const event = new Event('tokenRefreshed');
      window.dispatchEvent(event);

      return Promise.resolve();
    })
    .catch((error) => {
      console.error('토큰 갱신 실패:', error);
      localStorage.removeItem('accessToken');
      window.location.href = '/sign-in';
      return Promise.reject(error);
    });
};

// 인터셉터 추가
createAuthRefreshInterceptor(instance, refreshAuthLogic);

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    console.error('요청 오류:', error);
    return Promise.reject(error);
  },
);

export default instance;
