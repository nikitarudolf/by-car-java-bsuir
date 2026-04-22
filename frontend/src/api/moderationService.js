import axiosInstance from './axiosConfig';

const moderationService = {
  // Start moderation (async)
  startModeration: async (advertisementId) => {
    const response = await axiosInstance.post(`/moderation/start/${advertisementId}`);
    return response.data;
  },

  // Check moderation status
  getStatus: async (taskId) => {
    const response = await axiosInstance.get(`/moderation/status/${taskId}`);
    return response.data;
  },
};

export default moderationService;
