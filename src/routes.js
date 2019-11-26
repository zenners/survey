import Capture from './components/Capture.vue';
import List from './components/List.vue';
// import Login from './components/Login.vue';

const routes = [
    { path: '/', redirect: '/capture' },

    { path: '/capture/:branch?', component: Capture },
    { path: '/list', component: List },
    // { path: '/login', component: Login },
];

export default routes;