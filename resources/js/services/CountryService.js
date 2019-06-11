import API from '@/services/API'


export default {
  fetchAllData(token, URL) {
    return API(token).get(`${URL}`);
  },
}
