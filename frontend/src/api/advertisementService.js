import axiosInstance from './axiosConfig';

const advertisementService = {
  // Get all advertisements
  getAll: async () => {
    const response = await axiosInstance.get('/advertisements');
    return response.data;
  },

  // Get advertisement by ID
  getById: async (id) => {
    const response = await axiosInstance.get(`/advertisements/${id}`);
    return response.data;
  },

  // Create new advertisement
  create: async (adData) => {
    const response = await axiosInstance.post('/advertisements', adData);
    return response.data;
  },

  // Update advertisement
  update: async (id, adData) => {
    const response = await axiosInstance.patch(`/advertisements/${id}`, adData);
    return response.data;
  },

  // Delete advertisement
  delete: async (id) => {
    const response = await axiosInstance.delete(`/advertisements/${id}`);
    return response.data;
  },

  // Search by year
  findByYear: async (year) => {
    const response = await axiosInstance.get(`/advertisements/find?year=${year}`);
    return response.data;
  },

  // Advanced search with pagination
  search: async (params) => {
    const response = await axiosInstance.get('/advertisements/search', { params });
    return response.data;
  },

  // Native search (alternative)
  searchNative: async (params) => {
    const response = await axiosInstance.get('/advertisements/searchNative', { params });
    return response.data;
  },
};

export default advertisementService;
