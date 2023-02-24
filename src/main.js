import { createPinia } from 'pinia';
// import 'virtual:svg-icons-register';

import { createSSRApp } from 'vue';

import App from './App.vue'
import router from './router'

import './assets/scss/app.scss';

// const app = createApp(App)


// app.use(createPinia())
// app.use(router)

// app.mount('#app')

export function createApp() {
    const app = createSSRApp(App);
    const pinia = createPinia();

    app.use(pinia);
    app.use(router);

    return { app, router}
}