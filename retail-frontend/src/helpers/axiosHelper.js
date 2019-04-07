import axios from 'axios';
import constants from './../constants';

class AxiosHelper {
  setUpAuthorizationInterceptors(onUnauthorised, onAuthorised){
    this.onUnauthorised = onUnauthorised;
    this.onAuthorised = onAuthorised;
  }

  setUpNetworkStatusInterceptors(onNetworkReq, onNetworkRes){
      this.onNetworkReq =  onNetworkReq;
      this.onNetworkRes =  onNetworkRes;
  }

  getInstance(){
    const axiosInstance = axios.create({
      baseURL: '/api',
      timeout: 25000,
      withCredentials: true
    });
    axiosInstance.interceptors.request.use((config) => {
      this.onNetworkReq && this.onNetworkReq();
      return config;
    });
    axiosInstance.interceptors.response.use((response) => {
      this.onNetworkRes && this.onNetworkRes();
      const {request: {responseURL}} = response
      if(this.onAuthorised && responseURL.endsWith(constants.URLS.USERS.LOGIN)){
        this.onAuthorised();
      } else if(this.onUnauthorised && responseURL.endsWith(constants.URLS.USERS.LOGOUT)){
        this.onUnauthorised();
      }
      return response;
    },
    (error) => {
      this.onNetworkRes && this.onNetworkRes();
      const {response: {status = ''} = {}} = error;
      if(status === 401 && this.onUnauthorised){
        this.onUnauthorised();
      }
      return Promise.reject(error);
    });
    return axiosInstance;
  }
}

export default new AxiosHelper();
