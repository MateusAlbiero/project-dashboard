import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}


const apiGitHub = axios.create({
  baseURL: 'https://api.github.com/'
});


export default boot(({ app }) => {

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = apiGitHub;

});

export { apiGitHub };
