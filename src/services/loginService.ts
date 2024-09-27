import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const apiAcessoRestrito = axios.create({
   baseURL: 'https://sgbr.com.br/acessorestrito/api/auth/login',
    headers: {
      Authorization: 'API Key 5L/8K//}#$@dwKgf/)XqqQB6ZnrhFHX4qm[Y*=wX&%sxSvU5S;nsBm&U=K=7',
    }
});


export default boot(({ app }) => {

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = apiAcessoRestrito;

});
export { apiAcessoRestrito };