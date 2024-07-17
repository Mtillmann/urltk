<script setup>
import {useRoute, useRouter} from 'vue-router';
import {inject, ref} from 'vue';
import Transformer from '../Transformer'
import {diffChars} from 'diff';
import {actionsFromBase64, copyToClipboard, deflateAction} from '../util';
import TaskFlow from '../components/TaskFlow.vue';
import {Dropdown} from 'bootstrap';

(() => typeof Dropdown)();


const store = inject('store');
const route = useRoute();
const router = useRouter();
const {toast} = inject('toast');

const canShare = 'share' in navigator;
const transformed = ref([]);
const isUsingQueryActions = ref(false);
const view = ref(route.query.view || 'url');
const tabs = ref([]);

let url;
try {
  url = new URL(route.params.url);
} catch (e) {
  toast('Invalid URL', 'danger');
  router.push({name: 'home'});
}

const queryActions = actionsFromBase64(route.query.actions);
if (queryActions) {
  isUsingQueryActions.value = true;
}

const actions = queryActions ? queryActions : store.actions;
if (!Transformer.filter(url, actions)) {
  url = null
  toast('No actions available for given URL', 'warning');
  router.push({name: 'home'})
}

if (url) {
  store.pushHistory(url);
  transformed.value = actions
      .map((action, i) => ({...action, index: i}))
      .filter(action => Transformer.filter(url, [action]))
      .map(action => {
        const transformed = Transformer.run(url, action.tasks);
        let result = transformed.url;
        let resultIsURL = false;
        try {
          result = new URL(result);
          resultIsURL = true;
        } catch (e) {
          // ignore
        }


        const diff = diffChars(url.href, String(result)).reduce((string, part) => {
          const tag = part.added ? 'ins' :
              part.removed ? 'del' : 'span';
          string += `<${tag}>${part.value}</${tag}>`;
          return string;
        }, '');


        return {
          ...transformed,
          result,
          resultIsURL,
          action,
          diff,
          deflated: btoa(JSON.stringify(deflateAction(action)))
        }

      });

  tabs.value = transformed.value.map(() => view.value);

  if (actions.length === 1 && transformed.value[0].resultIsURL && route.query.openURL === '1') {
    window.location.href = transformed.value[0].url;
  }
}

const copy = async (text) => {
  await copyToClipboard(text);
  toast('Copied to clipboard');
}

const share = (url) => {
  try {
    navigator.share({
      url
    });
  } catch (e) {
    console.error(e);
  }
}

function permalink(transformed) {
  const actions = btoa(JSON.stringify([deflateAction(transformed.action)]));
  const shareURL = new URL(window.location.href);
  const hash = router.resolve({name: 'url', params: {url: url.href}, query: {actions, view: transformed.view}});
  shareURL.hash = hash.href;

  copy(shareURL.toString());
  toast('Copied to clipboard');

}

</script>
<template>

  <div v-for="t,i in transformed" :key="i" class="card mb-3">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="card-title text-truncate">{{ t.action.name }}</h5>

      <div class="dropdown">
        <button class="btn btn-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-three-dots-vertical"></i>
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" href="#" @click.stop.prevent="tabs[i] = 'url'">
              Show URL
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click.stop.prevent="tabs[i] = 'diff'">
              Show diff
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click.stop.prevent="copy(t.url)">
              Copy URL
            </a>
          </li>
          <li v-if="canShare">
            <a class="dropdown-item" href="#" @click.stop.prevent="share">
              Share URL
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click.stop.prevent="tabs[i] = 'debug'">
              Debug
            </a>
          </li>
          <li v-if="isUsingQueryActions">
            <router-link class="dropdown-item" :to="{name : 'importActions', query: {action: t.deflated}}">
              Import Action
            </router-link>
          </li>
          <li>
            <a href="#" class="dropdown-item" @click.stop.prevent="permalink(t)">
              Permalink current view
            </a>
          </li>
          <li v-if="!isUsingQueryActions">
            <router-link :to="{name:'bookmarklet', query : {action : t.action.index}}" class="dropdown-item">
              Make Bookmarklet
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="card-body">
      <div class="card-text">
        <div v-if="tabs[i] === 'url'" class="break-all"
             :class="{'text-truncate' : store.settings.cropURLsInURLView}">
          <div v-if="t.error" class="px-2 bg-warning-subtle text-warning rounded"><i
              class="bi bi-exclamation-octagon"></i> {{ t.error }}
              <a href="#" @click.stop.prevent="tabs[i] = 'debug'"><i class="bi bi-bug"></i>debug</a>
          </div>
          <a :href="t.result" target="_blank">{{ t.result }}</a>
        </div>
        <div class="diff" v-if="tabs[i] === 'diff'" v-html="t.diff"></div>
        <div class="debug" v-if="tabs[i] === 'debug'">
          <TaskFlow :action="t.action" :trace="t.trace" :start-url="url" :compact="false"/>
        </div>
      </div>
    </div>
    <div class="card-footer d-flex justify-content-between" v-if="store.settings.showURLControls">
      <div class="btn-group w-100">
        <a href="#" class="btn btn-outline-primary" :class="{'active' : tabs[i] === 'url'}"
           @click.stop.prevent="tabs[i] = 'url'">
          <i class="bi bi-link"></i> URL</a>
        <a href="#" class="btn btn-outline-primary" :class="{'active' : tabs[i] === 'diff'}"
           @click.stop.prevent="tabs[i] = 'diff'" v-if="store.settings.showDiffButton">
          <i class="bi bi-file-diff"></i> Diff</a>
        <a href="#" class="btn btn-outline-primary" @click.stop.prevent="copy(t.url)"
           v-if="store.settings.showCopyButton">
          <i class="bi bi-copy"></i> Copy</a>
        <a v-if="canShare && store.settings.showShareButton" href="#" class="btn btn-outline-primary" @click.stop.prevent="share">
          <i class="bi bi-share"></i> Share</a>
        <a class="btn btn-outline-primary" target="_blank" :href="t.url" v-if="store.settings.showOpenButton">
          <i class="bi bi-box-arrow-up-right"></i> Open</a>
      </div>
    </div>
  </div>
</template>

<style>
.diff ins {
  color: var(--bs-success);
}

.diff del {
  color: var(--bs-danger);
}

.diff span {
  color: var(--bs-secondary);
}
</style>