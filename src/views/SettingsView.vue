<script setup>
import {inject, ref} from 'vue';
import {deflateAction, download} from '../util';
import {useRouter} from "vue-router";

const router = useRouter();
const store = inject('store');
const settings = store.settings;
const importInput = ref(null);
const {toast} = inject('toast');

function exportJSON() {
  const json = JSON.stringify(store.actions, null, 2);

  download(json, 'application/json', 'urltk-actions.json');
}

function makeURL() {
  const url = new URL(window.location.origin);
  const actions = store.actions.map(a => deflateAction(a));
  url.hash = `#/import-actions/?actions=${btoa(JSON.stringify(actions))}`;
  return url.toString();
}

function exportHTML() {
  const html = `<html>
<head>
<meta http-equiv="refresh" content="0; url=${makeURL()}" />
</head>
<body>
</body>
</html>`;

  download(html, 'text/html', 'urltk-actions.html');

}


function importActions(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    //make json from e.target.result

    try {
      const data = JSON.parse(new TextDecoder().decode(e.target.result));
      const actions = data.map(a => deflateAction(a));

      router.push({name: 'importActions', query: {actions: btoa(JSON.stringify(actions))}});

    } catch (e) {

      console.log(e);
      toast('Invalid JSON');
    }

  }

  reader.readAsArrayBuffer(file);
}

</script>
<template>

  <h5 class="display-7">UI</h5>

  <div class="form-floating">
    <select class="form-select" @change="store.setTheme()" id="theme" aria-label="Theme" v-model="settings.theme">
      <option value="system">system</option>
      <option value="light">light</option>
      <option value="dark">dark</option>
    </select>
    <label for="theme">Theme</label>
  </div>

  <h5 class="display-7 mt-4">URL View</h5>

  <div class="form-check form-switch mb-4">
    <input class="form-check-input" v-model="settings.showURLControls" type="checkbox" role="switch"
           id="showURLControls">
    <label class="form-check-lable" for="showURLControls">Show URL-Controls</label>
  </div>
  <div class="form-check form-switch mb-4">
    <input class="form-check-input" v-model="settings.showOpenButton" type="checkbox" role="switch" id="showOpenButton">
    <label class="form-check-lable" for="showOpenButton">Show Open-Button</label>
  </div>
  <div class="form-check form-switch mb-4">
    <input class="form-check-input" v-model="settings.showDiffButton" type="checkbox" role="switch" id="showDiffButton">
    <label class="form-check-lable" for="showDiffButton">Show Diff-Button</label>
  </div>
  <div class="form-check form-switch mb-4">
    <input class="form-check-input" v-model="settings.showCopyButton" type="checkbox" role="switch" id="showCopyButton">
    <label class="form-check-lable" for="showCopyButton">Show Copy-Button</label>
  </div>
  <div class="form-check form-switch mb-4">
    <input class="form-check-input" v-model="settings.showShareButton" type="checkbox" role="switch"
           id="showShareButton">
    <label class="form-check-lable" for="showShareButton">Show Share-Button</label>
  </div>
  <div class="form-check form-switch mb-4">
    <input class="form-check-input" v-model="settings.cropURLsInURLView" type="checkbox" role="switch"
           id="cropURLsInURLView">
    <label class="form-check-lable" for="cropURLsInURLView">Truncate URLs</label>
  </div>

  <h5 class="display-7 mt-4">History View</h5>

  <div class="form-check form-switch mb-4">
    <input class="form-check-input" v-model="settings.cropURLsInHistoryView" type="checkbox" role="switch"
           id="cropURLsInHistoryView">
    <label class="form-check-lable" for="cropURLsInHistoryView">Truncate URLs</label>
  </div>

  <label for="historyLimit" class="form-label">History Limit: <em>{{ settings.historyLimit }}</em></label>
  <input type="range" class="form-range" id="historyLimit" v-model.number="settings.historyLimit" min="0" max="255">
  <p class="small">Set to 0 to disable</p>

  <h5 class="display-7 mt-4">Deref View</h5>

  <label for="derefInNewTabPWAOnly" class="form-label">Open Links in new Tab/Window</label>
  <div class="form-check">
    <input class="form-check-input" type="radio" v-model="settings.derefInNewTab" value="pwa-only" name="derefInNewTab" id="derefInNewTabPWAOnly">
    <label class="form-check-label" for="derefInNewTabPWAOnly">
      Only in PWA installation
    </label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="radio" v-model="settings.derefInNewTab" value="always" name="derefInNewTab" id="derefInNewTabAlways">
    <label class="form-check-label" for="derefInNewTabAlways">
      Always
    </label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="radio" v-model="settings.derefInNewTab" value="never" name="derefInNewTab" id="derefInNewTabNever">
    <label class="form-check-label" for="derefInNewTabNever">
      Never
    </label>
  </div>

  <h5 class="display-7 mt-4">Actions</h5>

  <button class="d-block mx-auto my-3 btn btn-outline-secondary" @click="exportJSON">
    <i class="bi bi-filetype-json"></i>
    Export Actions as JSON
  </button>

  <button class="d-block mx-auto my-3 btn btn-outline-secondary" @click="exportHTML">
    <i class="bi bi-filetype-html"></i>
    Export Actions as <code>.html</code>
  </button>

  <button class="d-block mx-auto my-3 btn btn-outline-secondary" @click="importInput.click()">
    <i class="bi bi-upload"></i>
    Import Actions
  </button>

  <input class="d-none" type="file" ref="importInput" accept="application/json"
         @change="importActions($event)">


</template>