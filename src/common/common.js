import axios from 'axios';

const apiRequest = async (method, url, data,params, onSuccess, onError) => {
  try {
    
    const response = await axios({
      method: method,
      maxBodyLength: Infinity,
      url: url,
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${localStorage.getItem('user')}`
      },
      params:params,
      data: data,
    });
    onSuccess(response.data);
  } catch (error) {
    onError(error);
  }
};
const apiRequestWithImage = async (method, url, data,params, onSuccess, onError) => {
  try {
    
    const response = await axios({
      method: method,
      maxBodyLength: Infinity,
      url: url,
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept":"application/json",
        "Authorization":`Bearer ${localStorage.getItem('user')}`
      },
      params:params,
      data: data,
    });
    onSuccess(response.data);
  } catch (error) {
    onError(error);
  }
};

export { apiRequest, apiRequestWithImage};
 