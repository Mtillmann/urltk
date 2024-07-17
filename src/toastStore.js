import {defineStore} from "pinia";

export default defineStore('toasts', {

    state: () => ({
        x: 0,
        y: 0,
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


            return;

            this.noticeTimeout = setTimeout(() => {
                this.notice = null;
            }, ttl);
        }
    }
});
