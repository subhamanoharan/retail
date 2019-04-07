import lodash from 'lodash';
import constants from '../constants';
import axiosHelper from '../helpers/axiosHelper';

const {URLS: {USERS: USERS_URLS}} = constants;

class UsersService {
  constructor(){
    this.URLS = USERS_URLS
  }

  login(email, password){
    const axiosInstance = axiosHelper.getInstance();
    return axiosInstance.post(this.URLS.LOGIN, {}, {auth: {username: email, password }})
      .catch((error) => {
        const { response: {data: {errors = ['Unable to login!']} = {}} = {}} = error;
        console.log('Error when logging in', errors);
        return Promise.reject(errors);
      });
  }

  logout(){
    const axiosInstance = axiosHelper.getInstance();
    return axiosInstance.post(this.URLS.LOGOUT)
      .catch((error) => {
        const { response: {data: {errors = ['Unable to logout!']} = {}} = {}} = error;
        console.log('Error when logging out', errors);
        return Promise.reject(errors);
      });
  }

  getLoggedInUserDetails() {
    const axiosInstance = axiosHelper.getInstance();
    return axiosInstance.get(this.URLS.GET_ME)
      .then((response) => response.data)
      .catch((error) => {
        const { response: {data: {errors = ['Unable to get user details!']} = {}} = {}} = error;
        console.log('Error when getting user details', errors);
        return Promise.reject(errors);
      });
  }
}

export default new UsersService();
