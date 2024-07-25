<script setup>

import {useRoute} from 'vue-router';
import {computed, inject, ref, watch} from 'vue';
import {copyToClipboard, deflateAction} from '../util';


const route = useRoute();

const {toast} = inject('toast');
const store = inject('store');
const actionId = route.query.action;
const mode = ref('landing-page');
const selectedActions = ref(store.actions.map(a => false));

const tab = ref('Bookmarklet');
const tabs = ['Bookmarklet', 'Actions', 'Options'];
const useNewWindow = ref(false);
const openURL = ref(false);
const label = ref('URLtk');
const canShare = 'share' in navigator;
const addTitle = ref(false);

if (actionId && store.actions[actionId]) {
  selectedActions.value[actionId] = true;
  mode.value = 'single-action';
  openURL.value = true;
  label.value = store.actions[actionId].name;
}

function resetLabel() {
  if (selectedActions.value.filter(v => v).length === 1) {
    label.value = store.actions[selectedActions.value.findIndex(v => v)].name;
  } else {
    label.value = 'URLtk';
  }
}

watch(() => selectedActions, () => {
  const l = selectedActions.value.filter(v => v).length;
  if (l === 0) {
    mode.value = 'landing-page';
  } else if (l === 1) {
    mode.value = 'single-action';
  } else {
    mode.value = 'multi-action';
  }

  resetLabel();
}, {deep: true});

watch(() => mode, () => {
  if (mode.value === 'landing-page') {
    selectedActions.value = selectedActions.value.map(() => false);
  }
}, {deep: true});

function selectAll() {
  selectedActions.value = selectedActions.value.map(() => true);
}

const canOpenURL = computed(() => {
  const value = selectedActions.value.filter(a => a).length === 1;
  if (!value) {
    openURL.value = false;
  }

  return value;
});

const code = computed(() => {
  const link = new URL(location.origin + location.pathname);

  let href = 'const url=new URL(location);';
  if(addTitle.value) {
    href += `url.searchParams.set('___URLtk_title', document.title);`;
  }

  let hash = '#/url/\${encodeURIComponent(url.href)}';
  const query = []
  if (['single-action', 'multi-action'].includes(mode.value)) {
    const actions = selectedActions.value
        .map((v, i) => v ? store.actions[i] : false)
        .filter(v => v).map(deflateAction);

    const actionString = btoa(JSON.stringify(actions));
    query.push(`actions=${actionString}`);
  }
  if (openURL.value === true) {
    query.push('openURL=1');
  }

  if (query.length > 0) {
    hash += '?' + query.join('&');
  }

  link.hash = hash;



  return [
    'javascript:(_=>{',
    href,
    useNewWindow.value ? 'window.open(`' : 'location.href=`',
    link,
    useNewWindow.value ? '`);' : '`;',
    '})();'
  ].join('');
});

const copy = async () => {
  await copyToClipboard(code.value);
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

</script>
<template>

  <nav class="nav nav-pills mb-3">
    <a v-for="t in tabs" class="nav-link" :class="{'active' : t === tab}" :aria-current="t === tab ? 'page':false"
       href="#" @click.stop.prevent="tab = t">{{ t }}</a>
  </nav>



  <div v-if="tab === 'Actions'">
    <h4 class="display-8">All Actions</h4>
    <div class="list-group list-group-flush">
      <div class="list-group-item">
        <div class="form-check mb-3">
          <input class="form-check-input" v-model="mode" value="landing-page" type="radio"
                 id="defaultLandingPage">
          <label class="form-check-label" for="defaultLandingPage">
            URL landing page - all local actions
          </label>
        </div>
      </div>
    </div>

    <p>This option will always show the URL landing page with all your actions as authored. Works only
      in the current browser where the actions are stored.
    </p>

    <template v-if="selectedActions.length > 0">
      <h4 class="display-8">Selected Actions</h4>

      <div class="list-group list-group-flush mb-3">
        <div class="list-group-item" v-for="action, i in store.actions" :key="i">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="selectedActions[i]" :id="`acb_${i}`">
            <label class="form-check-label" :for="`acb_${i}`">
              {{ action.name }}
            </label>
          </div>
        </div>
      </div>

      <p>
        <a href="#" @click.stop.prevent="selectAll">Select all actions</a> to create a portable copy of your URL
        landing page.
        All selected actions in their current state are embedded in the bookmarklet's URL and can
        be imported when viewing the URL landing page.
      </p>

    </template>


  </div>

  <div v-if="tab === 'Options'">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" v-model="useNewWindow" value="" id="useNewWindow">
      <label class="form-check-label" for="useNewWindow">
        Open in new Window/Tab
      </label>
    </div>
    <p>When set, clicking the bookmarklet opens a new tab. Otherwise, the current tab is used.
    </p>


    <div class="form-check">
      <input :disabled="!canOpenURL" class="form-check-input" type="checkbox" v-model="openURL" value=""
             id="openURL">
      <label class="form-check-label" for="openURL">
        Go to URL
      </label>
    </div>
    <p>The resulting URL of the action is opened. If no URL is derived, the action default view is shown.
      Only available when a single action is selected.
    </p>

    <div class="form-check">
      <input class="form-check-input" type="checkbox" v-model="addTitle" value=""
             id="addTitle">
      <label class="form-check-label" for="addTitle">
        Add Document Title
      </label>
    </div>
    <p>The document title is added to the URLs query string as <code>___URLtk_title</code>. Useful if the action
      requires the title of the current page.
    </p>


    <div class="input-group mb-3">

      <div class="form-floating">
        <input v-model="label" type="text" class="form-control" id="customLabel">
        <label for="customLabel">Bookmarklet Label</label>
      </div>
      <button class="btn btn-secondary" @click="resetLabel"><i class="bi bi-arrow-counterclockwise"></i></button>
    </div>

  </div>
  <div v-if="tab === 'Bookmarklet'">
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-center">
        <i class="bi bi-arrow-down-short"></i>
      </div>
      <div class="col-1 col-md-2 col-lg-3 d-flex align-items-center justify-content-end">
        <i class="bi bi-arrow-right-short"></i>
      </div>
      <div class="col-10 col-md-8 col-lg-6">
        <a :href="code" @click.stop.prevent="void" class="text-truncate my-3 btn w-100 btn-info btn-lg">
          {{ label }}
        </a>
      </div>
      <div class="col-1 col-md-2 col-lg-3 d-flex align-items-center justify-content-start">
        <i class="bi bi-arrow-left-short"></i>
      </div>
      <div class="col-12 d-flex justify-content-center">
        <i class="bi bi-arrow-up-short"></i>
      </div>
    </div>

    <p class="lead text-center">
      Drag the button above to your bookmarks bar&hellip;
    </p>

    <p class="text-center">
      or copy the bookmarklet code and create a bookmark manually
    </p>
    <code class="break-all d-block rounded p-2 border-secondary border">{{ code }}</code>
    <div class="d-flex justify-content-center mb-3">
      <button @click="copy" class="my-3 btn btn-outline-secondary">
        <i class="bi bi-copy"></i> Copy Bookmarklet to Clipboard
      </button>
    </div>
    <p v-if="mode !== 'landing-page'">The bookmarklet includes the action/s and tasks and works
      without further setup in any browser.</p>
  </div>

</template>
