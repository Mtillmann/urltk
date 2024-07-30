<script setup>
import {inject} from 'vue';
import {actionsFromBase64} from "../util.js";

const store = inject('store');
const history = store.history.map((item) => {
  if (typeof item === 'string') {
    return {url: item, date: Date.now(), actions: null, query: {}}
  }

  const actions = actionsFromBase64(item.actions);

  const actionNames = actions ? actions.map(action => action.name) : [];
  const query = {actions: item.actions};

  return {...item, actionNames, query};


});
const {toast} = inject('toast');

function remove(index) {
  history.splice(index, 1);
}

function clear() {
  if (confirm('Are you sure you want to clear the history?')) {
    toast('History cleared');
    history.length = 0
  }
}


</script>
<template>
  <template v-if="history.length > 0">

    <div class="d-flex justify-content-center mb-4">
      <button class="btn btn-outline-danger" @click="clear">
        <i class="bi bi-x-lg"></i>
        Clear History
      </button>
    </div>

    <ul class="list-group list-group-flush" v-for="item, i in history" :key="i">
      <li class="list-group-item bg-transparent d-flex justify-content-between">
          <div class="mt-1 me-2">
            <button class="btn btn-sm btn-outline-danger" @click="remove(i)"><i class="bi bi-trash"></i></button>
          </div>
          <span class="flex-grow-1" :class="{'text-truncate' : store.settings.cropURLsInHistoryView}">
          <router-link :to="{ name: 'url', params: { url:item.url }, query: item.query}">
            {{ item.url }}
          </router-link>
          <br>
          <span class="badge text-bg-secondary">{{ new Date(item.date).toLocaleString() }}</span>
          <span class="ms-2 badge text-bg-info" v-for="action in item.actionNames"><i
              class="bi bi-wrench-adjustable"></i> {{ action }}</span>
         </span>
      </li>
    </ul>


  </template>
  <template v-else>
    <div class="alert alert-info" role="alert">
      No URLs in history
    </div>
  </template>
</template>