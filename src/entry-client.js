import { createApp } from './main';

const { app, router } = createApp();
console.log(123);
router.isReady().then(() => {
    app.mount('#app');

    console.log('success started');
})