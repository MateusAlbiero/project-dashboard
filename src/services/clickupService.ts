import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module 'vue' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance;
        $api: AxiosInstance;
    }
}

const apiClickUp = axios.create({
    baseURL: 'http://localhost:3000/api/clickup',
});

export default boot(({ app }) => {
    app.config.globalProperties.$axios = axios;
    app.config.globalProperties.$api = apiClickUp;
});

export { apiClickUp };