import axiosHelper from '../helpers/axiosHelper';
import constants from '../constants';

const {URLS: {ITEMS: ITEMS_URLS}} = constants;

class ItemsService {
  constructor(){
    this.URLS = ITEMS_URLS
  }

  getPayload(data){
    return data;
  }

  add(data){
    const axiosInstance = axiosHelper.getInstance();
    return axiosInstance.post(this.URLS.ADD, this.getPayload(data))
      .catch((error) => {
        const { response: {data: {errors = ['Unable to add!']} = {}} = {}} = error;
        console.log('Error when adding:', errors, 'where data:', data);
        return Promise.reject(errors);
      });
  }

  edit(id, data){
    const axiosInstance = axiosHelper.getInstance();
    return axiosInstance.put(this.URLS.EDIT({id}), this.getPayload(data))
      .catch((error) => {
        const { response: {data: {errors = ['Unable to edit!']} = {}} = {}} = error;
        console.log(`Error when editing:${id}`, errors, 'where data:', data);
        return Promise.reject(errors);
      });
  }

  list(){
    const axiosInstance = axiosHelper.getInstance();
    return axiosInstance.get(this.URLS.LIST)
      .then((response) => response.data)
      .catch((error) => {
        const { response: {data: {errors = ['Unable to fetch items!']} = {}} = {}} = error;
        console.log('Error when listing:', errors);
        return Promise.reject(errors);
      });
  }

  delete(item){
    const axiosInstance = axiosHelper.getInstance();
    return axiosInstance.delete(this.URLS.DELETE(item))
      .catch((error) => {
        const { response: {data: {errors = ['Unable to delete!']} = {}} = {}} = error;
        console.log('Error when deleting item', errors, item);
        return Promise.reject(errors);
      });
  }
}

export default new ItemsService();
