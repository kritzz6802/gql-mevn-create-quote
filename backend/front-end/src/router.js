import { createWebHistory, createRouter } from 'vue-router';
import homePage from './components/homePage.vue'
import login from './components/logIn.vue'
import signUp from './components/signUp.vue'
import profileUser from './components/profileUser.vue'
import otherUserProfile from './components/otherUserProfile.vue'
import createQuote from './components/createQuote.vue'
import notFound from './components/notFound.vue'

const routes = [{
    name: 'homePage',
    path: '/',
    component: homePage
},
{
    name: 'login',
    path: '/login',
    component: login
},
{
    name: 'signup',
    path: '/signup',
    component: signUp
},
{
    name: 'profile',
    path: '/profile',
    component: profileUser
},
{
    name: 'create',
    path: '/create',
    component: createQuote
},
{
    name: 'otherUserProfile',
    path: '/profile/:userid',
    component: otherUserProfile
},
{
    name: 'notFound',
    path: '/:catchAll(.*)',
    component: notFound
}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;