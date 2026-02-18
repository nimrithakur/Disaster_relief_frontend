import axios from 'axios'
import { 
  getCachedData, 
  cacheData, 
  isOnline, 
  addPendingReport,
  registerSync 
} from '../utils/offlineDB'

const api = axios.create({ 
  baseURL: 'http://localhost:4000/api',
  timeout: 10000 // 10 second timeout
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  async (response) => {
    if (response.config.method === 'get') {
      const url = response.config.url;
      if (url.includes('/missing')) {
        await cacheData('missing-persons', response.data);
      } else if (url.includes('/found')) {
        await cacheData('found-reports', response.data);
      } else if (url.includes('/donations')) {
        await cacheData('donations', response.data);
      }
    }
    return response;
  },
  async (error) => {
    if (!isOnline() || error.message === 'Network Error') {
      const url = error.config?.url || '';
      
      if (error.config?.method === 'get') {
        if (url.includes('/missing')) {
          const cached = await getCachedData('missing-persons');
          return { data: cached, fromCache: true };
        } else if (url.includes('/found')) {
          const cached = await getCachedData('found-reports');
          return { data: cached, fromCache: true };
        } else if (url.includes('/donations')) {
          const cached = await getCachedData('donations');
          return { data: cached, fromCache: true };
        }
      }
      
      if (error.config?.method === 'post') {
        if (url.includes('/missing') || url.includes('/found') || url.includes('/donations')) {
          await addPendingReport({
            url: `http://localhost:4000${url}`,
            method: 'POST',
            headers: error.config.headers,
            body: error.config.data
          });
          await registerSync('sync-reports');
          
          return { 
            data: { 
              message: 'Your report has been queued and will be submitted when you are back online',
              offline: true 
            } 
          };
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api
