<script setup>

import {useRoute} from 'vue-router';
import {inject} from 'vue';
import {copyToClipboard, deflateAction, download} from '../util';


const route = useRoute();
const actionId = route.params.id;
const store = inject('store');
const action = store.actions[actionId];
const {toast} = inject('toast');

const link = new URL(window.location.origin);
link.hash = `#/import-actions/?actions=${btoa(JSON.stringify([deflateAction(action)]))}`;

const canShare = 'share' in navigator;

const copy = async () => {
  await copyToClipboard(link);
  toast('Copied to clipboard');

}

const share = () => {
  try {
    navigator.share({
      url: link.toString(),
    });
  } catch (e) {
    console.error(e);
  }
}

const dl = () => {
  download(JSON.stringify([action], null, 2), 'application/json', `urltk - ${action.name}.json`);
}

</script>
<template>

  <h4 class="display-7">&bdquo;{{ action.name }}&rdquo;</h4>

  <p>
    The link will allow you to share this action with others.
  </p>
  <p>
    The import dialog will allow the user to preview the action before importing it.
  </p>
  <p>
    The JSON file can be downloaded and imported into the application in the settings dialog.
  </p>

  <code class="break-all d-block rounded p-2 border-secondary border">{{ link }}</code>

  {{ canShare }}

  <button @click="copy" class="my-3 mx-auto d-block btn btn-outline-secondary">
    <i class="bi bi-copy"></i> Copy Link to Clipboard
  </button>

  <button v-if="canShare" @click="share" class="my-3 mx-auto d-block btn btn-outline-secondary">
    <i class="bi bi-share"></i> Share Link
  </button>

  <button @click="dl" class="my-3 mx-auto d-block btn btn-outline-secondary">
    <i class="bi bi-download"></i> Download JSON
  </button>


</template>