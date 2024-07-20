import {createRouter, createWebHashHistory} from 'vue-router'

import HomeView from './views/HomeView.vue'
import HistoryView from './views/HistoryView.vue'
import SettingsView from './views/SettingsView.vue'
import ActionsView from './views/ActionsView.vue'
import EditActionView from './views/EditActionView.vue'
import URLView from './views/URLView.vue'
import ReferenceView from './views/ReferenceView.vue'
import DerefView from './views/DerefView.vue'
import ShareActionView from './views/ShareActionView.vue'
import ImportActionsView from './views/ImportActionsView.vue'
import BookmarkletView from './views/BookmarkletView.vue'
import ReferenceTasksView from "./views/ReferenceTasksView.vue";
import ReferenceActionsView from "./views/ReferenceActionsView.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {inNavigation: true, title: 'URL Toolkit'}
        },
        {
            path: '/url/:url?',
            name: 'url',
            component: URLView,
            meta: {inNavigation: false, title: 'URL Results'}
        },
        {
            path: '/history/',
            name: 'history',
            component: HistoryView,
            meta: {inNavigation: true, title: 'History'}
        },
        {
            path: '/actions',
            name: 'actions',
            component: ActionsView,
            meta: {inNavigation: true, title: 'Actions'}
        },
        {
            path: '/actions/:id',
            name: 'editAction',
            component: EditActionView,
            meta: {inNavigation: false, title: 'Edit Action'}
        },
        {
            path: '/settings',
            name: 'settings',
            component: SettingsView,
            meta: {inNavigation: true, title: 'Settings'}
        },
        {
            path: '/deref',
            name: 'deref',
            component: DerefView,
            meta: {inNavigation: false, title: 'Remove Referrer'}
        },
        {
            path: '/actions/:id/share',
            name: 'share',
            component: ShareActionView,
            meta: {inNavigation: false, title: 'Share Action'}
        },
        {
            path: '/import-actions',
            name: 'importActions',
            component: ImportActionsView,
            meta: {inNavigation: false, title: 'Import Action/s'}
        },
        {
            path: '/bookmarklet',
            name: 'bookmarklet',
            component: BookmarkletView,
            meta: {inNavigation: false, title: 'Create Bookmarklet'}
        },
        {
            path: '/reference',
            name: 'reference',
            component: ReferenceView,
            meta: {inNavigation: true, title: 'Reference'}
        },
        {
            path: '/reference/actions',
            name: 'referenceActions',
            component: ReferenceActionsView,
            meta: {inNavigation: false, title: 'Reference - Actions'}
        },
        {
            path: '/reference/tasks',
            name: 'referenceTasks',
            component: ReferenceTasksView,
            meta: {inNavigation: false, title: 'Reference - Tasks'}
        }

    ]
})

router.beforeEach((to, from, next) => {
    if(to.meta.title) {
        document.title = `URLtk - ${to.meta.title}`
    }

    if(to.hash){
        document.querySelector(to.hash)?.scrollIntoView()
    }

    next()
})

export default router