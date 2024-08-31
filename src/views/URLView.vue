<script setup>
import { useRoute, useRouter } from 'vue-router';
import { inject, ref } from 'vue';
import Transformer from '../Transformer'
import { diffChars } from 'diff';
import { actionsFromBase64, copyToClipboard, deflateAction } from '../util';
import TaskFlow from '../components/TaskFlow.vue';
import { Dropdown } from 'bootstrap';

(() => typeof Dropdown)();


const store = inject('store');
const route = useRoute();
const router = useRouter();
const { toast } = inject('toast');
const openURL = route.query.openURL === '1';

const canShare = 'share' in navigator;
const transformed = ref([]);
const isUsingQueryActions = ref(false);
const view = ref(route.query.view || 'url');
const tabs = ref([]);
const unmatched = ref([]);


let url;
try {
  let urlParam = route.params.url;
  if (!urlParam.startsWith('http')) {
    //assume it's base64 encoded
    urlParam = atob(urlParam);
  }

  url = new URL(urlParam);
} catch (e) {
  toast('Invalid URL', 'danger');
  router.push({ name: 'home' });
}

const queryActions = actionsFromBase64(route.query.actions);
if (queryActions) {
  isUsingQueryActions.value = true;
}

const actions = queryActions ? queryActions : store.actions;

const noActions = ref(store.actions.length === 0 && actions.length === 0);

if (!noActions.value) {


  if (!Transformer.filter(url, actions)) {
    url = null
    toast('No actions available for given URL', 'warning', 5000);
    router.push({ name: 'home' })
  }

  if (url) {
    store.pushHistory(url, isUsingQueryActions ? route.query.actions : null);

    transformed.value = actions
      .map((action, i) => ({ ...action, index: i }))
      .filter(action => {
        const matches = Transformer.filter(url, [action]);

        if (!matches) {
          unmatched.value.push(action);
        }

        return matches;
      })
      .map(action => {
        const transformed = Transformer.run(url, action.tasks);
        let result = transformed.url;
        let isURL = false;
        try {
          result = new URL(result);
          isURL = true;
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
          isURL,
          action,
          diff,
          deflated: btoa(JSON.stringify([deflateAction(action)]))
        }

      });

    tabs.value = transformed.value.map(() => view.value);

    if (actions.length === 1 && transformed.value[0].isURL && openURL) {
      window.location.href = transformed.value[0].url;
    }
  }
}

async function copy(text) {
  await copyToClipboard(text);
  toast('Copied to clipboard');
}

function share(name, url) {
  try {
    navigator.share({
      title: `URLtk - ${name}`,
      url
    });
  } catch (e) {
    console.error(e);
  }
}

function permalink(transformed) {
  const actions = btoa(JSON.stringify([deflateAction(transformed.action)]));
  const shareURL = new URL(window.location.href);
  const hash = router.resolve({ name: 'url', params: { url: url.href }, query: { actions, view: transformed.view } });
  shareURL.hash = hash.href;

  copy(shareURL.toString());
  toast('Copied to clipboard');

}

</script>
<template>

  <div v-if="noActions">
    No actions created yet. <router-link :to="{name: 'editAction', params: {id:'new'}}">Create a new one</router-link>
    or check out the <router-link :to="{name: 'reference'}">reference</router-link>.
  </div>

  <div class="alert alert-info d-flex align-items-center"
    v-if="openURL && actions.length === 1 && transformed[0].isURL">
    <div>
      <div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="ms-3">
      You're being redirected. This might take a moment&hellip;
    </div>
  </div>

  <div v-for="t,i in transformed" :key="i" class="card mb-3">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="card-title display-8 text-truncate"><i class="bi bi-wrench-adjustable"></i> {{ t.action.name }}</h5>

      <div class="dropdown">
        <button class="btn btn-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-three-dots-vertical"></i>
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" href="#" @click.stop.prevent="tabs[i] = 'url'">
              Show
              <template v-if="t.isURL">URL</template>
              <template v-else>Result</template>

            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click.stop.prevent="tabs[i] = 'diff'">
              Show Diff
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click.stop.prevent="copy(t.url)">
              Copy URL
            </a>
          </li>
          <li v-if="canShare">
            <a class="dropdown-item" href="#" @click.stop.prevent="share(t.action.name, t.url)">
              Share URL
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click.stop.prevent="tabs[i] = 'debug'">
              Debug
            </a>
          </li>
          <li v-if="isUsingQueryActions">
            <router-link class="dropdown-item" :to="{name : 'importActions', query: {actions: t.deflated}}">
              Import Action
            </router-link>
          </li>
          <li>
            <a href="#" class="dropdown-item" @click.stop.prevent="permalink(t)">
              Permalink current view
            </a>
          </li>
          <li>
            <router-link :to="{name:'share', params : {id : t.action.index}}" class="dropdown-item">
              Share Action
            </router-link>
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
        <div v-if="tabs[i] === 'url'" class="break-all" :class="{'text-truncate' : store.settings.cropURLsInURLView}">
          <div v-if="t.error" class="px-2 bg-warning-subtle text-warning rounded"><i
              class="bi bi-exclamation-octagon"></i>
            {{ t.error }}
            <a href="#" @click.stop.prevent="tabs[i] = 'debug'"><i class="bi bi-bug"></i>debug</a>
          </div>
          <a v-if="t.isURL" :href="t.result" target="_blank">{{ t.result }}</a>
          <span v-else>{{ t.result }}</span>
        </div>
        <div class="diff" v-if="tabs[i] === 'diff'" v-html="t.diff"></div>
        <div class="debug" v-if="tabs[i] === 'debug'">
          <TaskFlow :action="t.action" :trace="t.trace" :start-url="url" :compact="false" />
        </div>
      </div>
    </div>
    <div class="card-footer d-flex justify-content-between" v-if="store.settings.showURLControls">
      <div class="btn-group w-100">
        <a href="#" class="btn btn-outline-primary" :class="{'active' : tabs[i] === 'url'}"
          @click.stop.prevent="tabs[i] = 'url'">
          <i class="bi" :class="{'bi-link' : t.isURL, 'bi-quote' : !t.isURL}"></i>
          <template v-if="t.isURL">URL</template>
          <template v-else>Result</template>
        </a>
        <!--
        <a href="#" class="btn btn-outline-primary" :class="{'active' : tabs[i] === 'diff'}"
           @click.stop.prevent="tabs[i] = 'diff'" v-if="store.settings.showDiffButton">
          <i class="bi bi-file-diff"></i> Diff</a>
          -->
        <a href="#" class="btn btn-outline-primary" @click.stop.prevent="copy(t.url)"
          v-if="store.settings.showCopyButton">
          <i class="bi bi-copy"></i> Copy</a>
        <a v-if="canShare && store.settings.showShareButton" href="#" class="btn btn-outline-primary"
          @click.stop.prevent="share(t.action.name, t.url)">
          <i class="bi bi-share"></i> Share</a>
        <a class="btn btn-outline-primary" target="_blank" :href="t.url"
          v-if="t.isURL && store.settings.showOpenButton">
          <i class="bi bi-box-arrow-up-right"></i> Open</a>
      </div>
    </div>
  </div>

  <div v-if="unmatched.length > 0" class="alert alert-info small">

    <i class="bi bi-info-circle me-2"></i>Actions omitted because their URL filter did not match:
    <template v-for="action, i in unmatched" :key="i">
      <em>{{ action.name }}</em>
      <template v-if="i < unmatched.length - 1">,</template>

    </template>

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