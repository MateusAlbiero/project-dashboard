import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module 'vue' {
    interface ComponentCustomProperties {
        $apiGitHub: AxiosInstance;
    }
}

const apiGitHub = axios.create({
    baseURL: 'http://localhost:3000/api/github',
});

export default boot(({ app }) => {
    app.config.globalProperties.$apiGitHub = apiGitHub;
});

export { apiGitHub };