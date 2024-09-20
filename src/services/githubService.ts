import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}


const apiGitHub = axios.create({
  //Header com o token disponível no link devido ao GitGuardian: https://app.clickup.com/t/86a4wcjqk
});


export default boot(({ app }) => {

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = apiGitHub;

});

export { apiGitHub };
