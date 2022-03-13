import axios from 'axios';

export const uploadImage = (bodyFormData: FormData) => (
  axios.post('/api/v1/upload', bodyFormData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
);
