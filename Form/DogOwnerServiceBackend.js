import Notifier from "../helpers/notifier.js";
import axiosInstance from '../config/axios.config'


const headers = {};

const baseUrl = `${process.env.REACT_APP_BASEPATH}/dogOwners`;

export function create(dogOwnerData) {
  const config = {
    method: "POST",
    data: dogOwnerData
  };

  return axiosInstance(baseUrl, config)
    .then(responseSuccessHandler)
    .then(
      Notifier.notify({
        title: "Dog Owner successfully saved.",
        autoDismiss: 3,
        level: "success",
        position: "tr",
        dismissible: "button"
      })
    )
    .catch(responseErrorHandler);
}

export function update(dogOwnerData) {
  const config = {
    method: "PUT",
    data: dogOwnerData
  };

  return axiosInstance(`${baseUrl}/${dogOwnerData._id}`, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function del(id) {
  const config = {
    method: "DELETE"
  };

  return axiosInstance(`${baseUrl}/${id}`, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function readAll() {
  const config = {
    method: "GET"
  };
  return axiosInstance
    .get(baseUrl, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

const responseSuccessHandler = response => {
  return response.data;
};

const responseErrorHandler = error => {
  console.log(error);
  return Promise.reject(error);
};
