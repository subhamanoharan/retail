import axiosHelper from '../helpers/axiosHelper';
import constants from '../constants';

const {URLS: {CATEGORIES: CATEGORIES_URLS}} = constants;

class CategoriesService {
  constructor(){
    this.URLS = CATEGORIES_URLS
  }

  list(){
    const axiosInstance = axiosHelper.getInstance();
    return axiosInstance.get(this.URLS.LIST)
      .then((response) => response.data)
      .catch((error) => {
        const { response: {data: {errors = ['Unable to fetch categories!']} = {}} = {}} = error;
        console.log('Error when fetching categories:', errors);
        return Promise.reject(errors);
      });
  }
}

export default new CategoriesService();
