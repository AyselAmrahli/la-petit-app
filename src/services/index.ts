import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

const getSearchValues = (data: any) => {
    let searchValues: any;
    // Fill url params
    Object.entries(data).map(([key, value]: any) => {
      if (!!value && typeof value !== 'object') {
        searchValues = { ...searchValues, [key]: value };
      }
      if (typeof value === 'object') {
        searchValues = { ...searchValues, [key]: value?.label };
      }
    });
  
    return searchValues;
  };


// endpoints for transactions
export const transactionsAPI = {
    get: (searchData: any) => {
        const url = `${API_BASE_URL}/transactions`;
        return axios.get(url, {
            params: {
                ...getSearchValues(searchData),
              },
        });
    },

    detail: (id: string | number) => {
        const url = `${API_BASE_URL}/transactions/${id}`;
        return axios.get(url);
    },
};


// endpoints for cards
export const cardsAPI = {

    get: (searchData: any) => {
        const url = `${API_BASE_URL}/cards`;
        return axios.get(url, {
            params: {
                ...getSearchValues(searchData),
              },
        });
    },

    detail: (id: string | number) => {
        const url = `${API_BASE_URL}/cards/${id}`;
        return axios.get(url);
    },
};