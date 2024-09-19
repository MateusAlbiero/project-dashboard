import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}


const apiClickUp = axios.create({
  baseURL: 'https://api.clickup.com/api/v2/team/31136150/space/',
  headers: {
    Authorization: 'Bearer 49016619_bc2ad9212ebafb2d89f99aff668053885ac8fe104a8f987405ae420eadac854c',
  }
});

export default boot(({ app }) => {
    
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = apiClickUp;

});

export { apiClickUp };
