<script setup>
import {inject} from 'vue';

const store = inject('store');
const history = store.history;
const {toast} = inject('toast');

function remove(url) {
  history.splice(history.indexOf(url), 1);
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

    <table class="table table-striped w-100">
      <tbody>
      <tr v-for="url, i in history" :key="i">
        <td class="">

            <router-link :to="{ name: 'url', params: { url } }">
              <span :class="{'text-truncate' : store.settings.cropURLsInHistoryView}">{{ url }}</span>

            </router-link>

        </td>
        <td class="w-0">
          <button class="btn btn-sm btn-outline-danger" @click="remove(url)"><i class="bi bi-trash"></i></button>
        </td>
      </tr>
      </tbody>
    </table>

    <ul class="list-group list-group-flush">
      <li class="px-0 list-group-item d-flex align-items-center justify-content-between" v-for="url, i in history"
          :key="i">
        <router-link :class="{'text-truncate' : store.settings.cropURLsInHistoryView}"
                     :to="{ name: 'url', params: { url } }">{{ url }}
        </router-link>
        <button class="btn btn-sm btn-outline-danger" @click="remove(url)"><i class="bi bi-trash"></i></button>
      </li>
    </ul>
  </template>
  <template v-else>
    <div class="alert alert-info" role="alert">
      No URLs in history
    </div>
  </template>
</template>