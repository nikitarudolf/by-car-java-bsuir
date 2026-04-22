import axiosInstance from './axiosConfig';

const userService = {
  // Get all users
  getAll: async () => {
    const response = await axiosInstance.get('/users');
    return response.data;
  },

  // Get user by ID
  getById: async (id) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },

  // Create new user
  create: async (userData) => {
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  },

  // Update user
  update: async (id, userData) => {
    const response = await axiosInstance.patch(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  delete: async (id) => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  },
};

export default userService;
