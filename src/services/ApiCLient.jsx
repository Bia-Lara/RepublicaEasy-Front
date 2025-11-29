import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1', 
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * @param {string} url 
 * @param {object} [params] 
 * @returns {Promise<any>} 
 */
export const get = (url, params) => apiClient.get(url, { params });

/**
 * @param {string} url 
 * @param {object} data 
 * @returns {Promise<any>} 
 */
export const post = (url, data) => apiClient.post(url, data);

/**
 * @param {string} url 
 * @param {object} data 
 * @returns {Promise<any>} 
 */
export const put = (url, data) => apiClient.put(url, data);

/**
 * @param {string} url 
 * @returns {Promise<any>} 
 */
export const del = (url) => apiClient.delete(url);


export default {
  get,
  post,
  put,
  del,
};