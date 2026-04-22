import axiosInstance from './axiosConfig';

const modelService = {
  // Get all models
  getAll: async () => {
    const response = await axiosInstance.get('/models');
    return response.data;
  },

  // Get model by ID
  getById: async (id) => {
    const response = await axiosInstance.get(`/models/${id}`);
    return response.data;
  },

  // Create new model
  create: async (modelData) => {
    const response = await axiosInstance.post('/models', modelData);
    return response.data;
  },

  // Update model
  update: async (id, modelData) => {
    const response = await axiosInstance.patch(`/models/${id}`, modelData);
    return response.data;
  },

  // Delete model
  delete: async (id) => {
    const response = await axiosInstance.delete(`/models/${id}`);
    return response.data;
  },

  // Get models by brand (client-side filtering)
  getByBrand: async (brandId) => {
    const allModels = await modelService.getAll();
    return allModels.filter(model => model.brand && model.brand.id === brandId);
  },
};

export default modelService;
