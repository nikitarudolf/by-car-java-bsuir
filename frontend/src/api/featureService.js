import axiosInstance from './axiosConfig';

const featureService = {
  // Get all features
  getAll: async () => {
    const response = await axiosInstance.get('/feature');
    return response.data;
  },

  // Get feature by ID
  getById: async (id) => {
    const response = await axiosInstance.get(`/feature/${id}`);
    return response.data;
  },

  // Create new feature
  create: async (featureData) => {
    const response = await axiosInstance.post('/feature', featureData);
    return response.data;
  },

  // Create multiple features (bulk)
  createBulk: async (featuresArray) => {
    const response = await axiosInstance.post('/feature/bulk', featuresArray);
    return response.data;
  },

  // Update feature
  update: async (id, featureData) => {
    const response = await axiosInstance.patch(`/feature/${id}`, featureData);
    return response.data;
  },

  // Delete feature
  delete: async (id) => {
    const response = await axiosInstance.delete(`/feature/${id}`);
    return response.data;
  },
};

export default featureService;
