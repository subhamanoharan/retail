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
        const { response: {data: {message = 'Unable to add!'} = {}} = {}} = error;
        console.log('Error when adding:', message, 'where data:', data);
        return Promise.reject(message);
      });
  }

  edit(id, data){
    const axiosInstance = axiosHelper.getInstance();
    return axiosInstance.put(this.URLS.EDIT({id}), this.getPayload(data))
      .catch((error) => {
        const { response: {data: {message = 'Unable to edit!'} = {}} = {}} = error;
        console.log(`Error when editing:${id}`, message, 'where data:', data);
        return Promise.reject(message);
      });
  }

  list(){
    const axiosInstance = axiosHelper.getInstance();
    return axiosInstance.get(this.URLS.LIST)
      .then((response) => response.data)
      .catch((error) => {
        const { response: {data: {message = 'Unable to fetch!'} = {}} = {}} = error;
        console.log('Error when listing:', message);
        return Promise.reject(message);
      });
  }

  delete(item){
    const axiosInstance = axiosHelper.getInstance();
    return axiosInstance.delete(this.URLS.DELETE(item))
      .catch((error) => {
        const { response: {data: {message = 'Unable to delete!'} = {}} = {}} = error;
        console.log('Error when deleting item', message, item);
        return Promise.reject(message);
      });
  }
}

export default new ItemsService();
