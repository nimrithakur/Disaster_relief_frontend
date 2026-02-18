import api from './api';

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.post('/uploads/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export default uploadImage;
