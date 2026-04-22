import axiosInstance from './axiosConfig';

const photoService = {
  // Add photo to advertisement
  addPhoto: async (advertisementId, photoData) => {
    const response = await axiosInstance.post(`/photos/advertisement/${advertisementId}`, photoData);
    return response.data;
  },

  // Get all photos for advertisement
  getByAdvertisement: async (advertisementId) => {
    const response = await axiosInstance.get(`/photos/advertisement/${advertisementId}`);
    return response.data;
  },

  // Delete photo
  delete: async (photoId) => {
    const response = await axiosInstance.delete(`/photos/${photoId}`);
    return response.data;
  },

  // Update photo order
  updateOrder: async (photoId, orderIndex) => {
    const response = await axiosInstance.put(`/photos/${photoId}/order?orderIndex=${orderIndex}`);
    return response.data;
  },

  // Set main photo
  setMainPhoto: async (photoId) => {
    const response = await axiosInstance.put(`/photos/${photoId}/set-main`);
    return response.data;
  },
};

export default photoService;
