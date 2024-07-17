import {createApp} from 'vue'
import {createPinia} from 'pinia'
import './style.css'
import App from './App.vue'
import piniaStore from './store'
import router from './routes'
import toastStore from "./toastStore.js";
import {registerSW} from "./util.js";


const app = createApp(App);
app.use(createPinia());
app.use(router)

const store = piniaStore()
const toast = toastStore();

app.provide('store', store)
app.provide('toast', toast);

document.body.addEventListener('click', (e) => toast.setXY(e));
document.body.addEventListener('mousemove', (e) => toast.setXY(e));

registerSW()

store.$subscribe(
    () => {
        localStorage.setItem(store.storage_key, JSON.stringify(store.$state))
    },
    {detached: true}
)

app.mount('#app')