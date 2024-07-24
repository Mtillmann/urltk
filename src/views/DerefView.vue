<script setup>
import {useRoute, useRouter} from 'vue-router'
import {isPwa} from "../util";
import {inject, ref} from "vue";

const route = useRoute();
const router = useRouter();

const url = route.query.url;
const {settings} = inject('store');
const {toast} = inject('toast');

const openInNewTab = settings.derefInNewTab === 'always' || (settings.derefInNewTab === 'pwa-only' && isPwa());

const failNotice = ref(false);
const waitNotice = ref(false);

if (!url) {
  toast('No URL provided to deref :(', 'danger');
  router.push({name: 'home'});
} else {

  setTimeout(() => {
    failNotice.value.classList.remove('d-none');
    waitNotice.value.classList.add('d-none');
    waitNotice.value.classList.remove('d-flex');
  }, 5000);


  const a = document.createElement('a');
  a.setAttribute('href', url);
  if (openInNewTab) {
    a.setAttribute('target', '_blank');
  }
  a.setAttribute('rel', 'noreferrer');
  a.dispatchEvent(new MouseEvent('click'));

}
</script>
<template>

  <div class="alert alert-info d-flex align-items-center" ref="waitNotice">
    <div>
      <div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="ms-3">
      You're being redirected without referrer header. This might take a moment&hellip;
    </div>
  </div>

  <div ref="failNotice" class="d-none alert alert-warning">
    <p>
      A new tab or window should have been opened.
    </p>
    <p>If nothing happened, you might need to
      allow popups for this site.
    </p>
    <p class="mb-0">Anyway, <a :href="url" target="_blank" rel="noreferrer">click here to
      open the link</a> without referer.
    </p>
  </div>

  <p class="text-muted">
    To change whether the link opens in a new tab or window, go to the
    <router-link :to="{name:'settings'}">settings dialog</router-link>
  </p>


</template>