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
import ReferenceDDGView from "./views/ReferenceDDGView.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {inNavigation: true, title: 'Remix, Enhance, Share', icon: 'house', navTitle: 'Home'}
        },
        {
            path: '/url/:url?',
            name: 'url',
            component: URLView,
            meta: {inNavigation: false, title: 'URL Results', icon: 'card-list'}
        },
        {
            path: '/history/',
            name: 'history',
            component: HistoryView,
            meta: {inNavigation: true, title: 'History', icon: 'clock-history'}
        },
        {
            path: '/actions',
            name: 'actions',
            component: ActionsView,
            meta: {inNavigation: true, title: 'Actions', icon: 'wrench-adjustable'}
        },
        {
            path: '/actions/:id',
            name: 'editAction',
            component: EditActionView,
            meta: {inNavigation: false, title: 'Edit Action', icon: 'wrench-adjustable'}
        },
        {
            path: '/settings',
            name: 'settings',
            component: SettingsView,
            meta: {inNavigation: true, title: 'Settings', icon: 'gear'}
        },
        {
            path: '/deref',
            name: 'deref',
            component: DerefView,
            meta: {inNavigation: false, title: 'Remove Referrer', icon: 'arrow-bar-right'}
        },
        {
            path: '/actions/:id/share',
            name: 'share',
            component: ShareActionView,
            meta: {inNavigation: false, title: 'Share Action', icon: 'share'}
        },
        {
            path: '/import-actions',
            name: 'importActions',
            component: ImportActionsView,
            meta: {inNavigation: false, title: 'Import Action/s', icon: 'file-arroww-up'}
        },
        {
            path: '/bookmarklet',
            name: 'bookmarklet',
            component: BookmarkletView,
            meta: {inNavigation: false, title: 'Create Bookmarklet', icon: 'bookmark-check'}
        },
        {
            path: '/reference',
            name: 'reference',
            component: ReferenceView,
            meta: {inNavigation: true, title: 'Reference', icon: 'book'}
        },
        {
            path: '/reference/actions',
            name: 'referenceActions',
            component: ReferenceActionsView,
            meta: {inNavigation: false, title: 'Reference - Actions', icon: 'book'}
        },
        {
            path: '/reference/tasks',
            name: 'referenceTasks',
            component: ReferenceTasksView,
            meta: {inNavigation: false, title: 'Reference - Tasks', icon: 'book'}
        },
        {
            path: '/reference/duckduckgo',
            name: 'referenceDDG',
            component: ReferenceDDGView,
            meta: {inNavigation: false, title: 'Reference - DuckDuckGo', icon: 'plugin'}
        }

    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = `URLtk - ${to.meta.title}`
    }

    if (to.hash) {
        document.querySelector(to.hash)?.scrollIntoView()
    }

    next()
})

export default router