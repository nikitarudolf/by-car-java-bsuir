import axiosInstance from './axiosConfig';

const brandService = {
  // Get all brands
  getAll: async () => {
    const response = await axiosInstance.get('/brands');
    return response.data;
  },

  // Get brand by ID
  getById: async (id) => {
    const response = await axiosInstance.get(`/brands/${id}`);
    return response.data;
  },

  // Create new brand
  create: async (brandData) => {
    const response = await axiosInstance.post('/brands', brandData);
    return response.data;
  },

  // Update brand
  update: async (id, brandData) => {
    const response = await axiosInstance.patch(`/brands/${id}`, brandData);
    return response.data;
  },

  // Delete brand
  delete: async (id) => {
    const response = await axiosInstance.delete(`/brands/${id}`);
    return response.data;
  },
};

export default brandService;
