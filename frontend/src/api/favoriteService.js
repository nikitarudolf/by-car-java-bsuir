import axiosInstance from './axiosConfig';

const favoriteService = {
  // Add to favorites
  addToFavorites: async (userId, advertisementId) => {
    const response = await axiosInstance.post(`/favorites?userId=${userId}&advertisementId=${advertisementId}`);
    return response.data;
  },

  // Remove from favorites
  removeFromFavorites: async (userId, advertisementId) => {
    const response = await axiosInstance.delete(`/favorites?userId=${userId}&advertisementId=${advertisementId}`);
    return response.data;
  },

  // Get user's favorites
  getUserFavorites: async (userId) => {
    const response = await axiosInstance.get(`/favorites/user/${userId}`);
    return response.data;
  },

  // Check if favorite
  isFavorite: async (userId, advertisementId) => {
    const response = await axiosInstance.get(`/favorites/check?userId=${userId}&advertisementId=${advertisementId}`);
    return response.data;
  },
};

export default favoriteService;
