import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const update = (id, newInfo) => {
  return axios
    .put(`${baseUrl}/${id}`, newInfo)
    .then((response) => response.data);
};

const destroy = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default { getAll, create, update, destroy };
