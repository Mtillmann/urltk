<script setup>
import TaskFlow from '../components/TaskFlow.vue';
import {inject} from 'vue';
import {useRouter} from 'vue-router';

const store = inject('store');
const router = useRouter();
const {toast} = inject('toast');

function cloneAction(i) {
  const action = JSON.parse(JSON.stringify(store.actions[i]));
  action.name += ' (copy)';
  store.actions.splice(i + 1, 0, action);
  toast('Action cloned');
}

function removeAction(i) {
  const name = store.actions[i].name;
  if (confirm(`Delete "${name}"?`)) {
    store.actions.splice(i, 1);
    toast('Action deleted');
  }
}

function editAction(i) {
  router.push({name: 'editAction', params: {id: i}});
}

function addAction(position) {
  router.push({name: 'editAction', params: {id: 'new'}, query: {position}});
}

</script>
<template>

  <div class="d-flex justify-content-center mb-4">
    <button @click="addAction('top')" class="btn btn-primary"><i class="bi bi-plus-lg"></i> Add Action</button>
  </div>

  <div v-if="store.actions.length === 0">
    <div class="alert alert-info" role="alert">
      No actions yet
    </div>
  </div>
  <template v-else>
    <div class="card mb-3" v-for="action, i in store.actions" :key="i">
      <div class="card-header">
        <h5 class="card-title text-truncate">{{ action.name }}</h5>
      </div>
      <div class="card-body small">

        <TaskFlow :action="action"/>

      </div>
      <div class="card-footer d-flex justify-content-center">
        <div class="btn-group">
          <button class="btn btn-outline-primary" @click="editAction(i)"><i class="bi bi-pencil"></i>
            Edit
          </button>
          <button class="btn btn-outline-primary" @click="cloneAction(i)"><i class="bi bi-copy"></i>
            Clone
          </button>
          <router-link class="btn btn-outline-primary" :to="{name:'share', params : {id : i}}"><i
              class="bi bi-share"></i>
            Share
          </router-link>
          <router-link class="btn btn-outline-primary" :to="{name:'bookmarklet', query : {action : i}}"><i
              class="bi bi-bookmark"></i>
            <span class="d-none d-lg-inline">Bookmarklet</span>
            <span class="d-lg-none">Bkmrklt</span></router-link>
          <button class="btn btn-outline-danger" @click="removeAction(i)"><i class="bi bi-trash"></i>
            Delete
          </button>
        </div>
      </div>
    </div>
  </template>

  <div class="d-flex justify-content-center mt-4">
    <button @click="addAction('bottom')" class="btn btn-primary"><i class="bi bi-plus-lg"></i> Add Action</button>
  </div>


</template>