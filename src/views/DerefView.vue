<script setup>
import {useRoute} from 'vue-router'
import {isPwa} from "../util";
import {inject} from "vue";

const route = useRoute();
const url = route.query.url;
const {settings} = inject('store');

const openInNewTab = settings.derefInNewTab === 'always' || (settings.derefInNewTab === 'pwa-only' && isPwa());

const a = document.createElement('a');
a.setAttribute('href', url);
if (openInNewTab) {
  a.setAttribute('target', '_blank');
}
a.setAttribute('rel', 'noreferrer');
a.dispatchEvent(new MouseEvent('click'));

</script>
<template>

  <p>A new tab or window should have been opened. If nothing happened, you might need to
    allow popups for this site. <a :href="url" target="_blank" rel="noreferrer">Click here to
      open the link</a> without referer.
  </p>
  <p>
    To change whether the link opens in a new tab or window, go to the <router-link :to="{name:'settings'}">settings dialog</router-link>.
  </p>


</template>