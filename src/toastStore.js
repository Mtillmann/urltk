import {defineStore} from "pinia";

export default defineStore('toasts', {

    state: () => ({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        notice: null,
        confirm: null,
        noticeTimeout: null,
    }),
    actions: {
        setXY(event) {
            this.x = event.clientX;
            this.y = event.clientY;
        },
        toast(message, type = 'success', ttl = 1000) {
            this.notice = {message, type, ttl};
            if (this.noticeTimeout) {
                clearTimeout(this.noticeTimeout);
            }
        }
    }
});
