import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import NotYet from './views/NotYet.vue'
import About from './views/About.vue'
import Chat from './views/Chat.vue'
import ChatList from './views/ChatList.vue'
import ReportLocation from "./views/ReportLocation.vue"
import CreateChatRoom from "./views/CreateChatRoom.vue"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/report-location',
            name: 'report-location',
            component: ReportLocation
        }, {
            path: '/not-yet',
            name: 'not-yet',
            component: NotYet
        }, {
            path: '/chat/:id',
            name: 'chat',
            component: Chat
        }, {
            path: '/',
            name: 'about',
            component: About
        }, {
            path: '/about',
            name: 'about',
            component: About
        }, {
            path: '/login',
            name: 'login',
            component: Login
        }
        , {
            path: '/chat-list',
            name: 'chat-list',
            component: ChatList,
        }, {
            path: '/create-chat-room',
            name: 'create-chat-room',
            component: CreateChatRoom
        }
    ]
})
