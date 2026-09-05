import axios from "axios";

const API_URL =
  "http://localhost:5001/api/expense-types";

export const getExpenseTypes = () => {
  return axios.get(API_URL);
};

export const addExpenseType = (data) => {
  return axios.post(API_URL, data);
};

export const updateExpenseType = (
  id,
  data
) => {
  return axios.put(
    `${API_URL}/${id}`,
    data
  );
};

export const deleteExpenseType = (
  id
) => {
  return axios.delete(
    `${API_URL}/${id}`
  );
};