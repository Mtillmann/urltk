<script setup>
import TaskFlow from '../components/TaskFlow.vue';
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const store = inject('store');
const router = useRouter();
const { toast } = inject('toast');

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
  router.push({ name: 'editAction', params: { id: i } });
}

function addAction(position) {
  router.push({ name: 'editAction', params: { id: 'new' }, query: { position } });
}

function moveAction(from, to) {
  const action = store.actions[from];
  store.actions.splice(from, 1);
  store.actions.splice(to, 0, action);
}
</script>
<template>

  <div class="d-flex justify-content-center mb-4">
    <button @click="addAction(0)" class="btn btn-outline-primary"><i class="bi bi-plus-lg"></i> Add Action</button>
  </div>

  <div v-if="store.actions.length === 0">
    <div class="alert alert-info" role="alert">
      No actions yet
    </div>
  </div>
  <template v-else>
    
    <template v-for="action, i in store.actions" :key="i">
      
      <div class="card mb-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="card-title display-8 text-truncate">
            <i class="bi bi-wrench-adjustable"></i>
            {{ action.name }}
          </h5>
          
          <div class="btn-group btn-group-sm">

            <button :disabled="i === 0" class="btn btn-outline-secondary" @click="moveAction(i,i-1)"><i
                class="bi bi-caret-up-fill"></i></button>
            <button :disabled="i === store.actions.length - 1" class="btn btn-outline-secondary"
              @click="moveAction(i,i+1)"><i class="bi bi-caret-down-fill"></i></button>
          </div>
        </div>
        
        <div class="card-body small">

          <TaskFlow :action="action" />

        </div>
        
        <div class="card-footer d-flex justify-content-center">
          <div class="btn-group">
            <button class="btn btn-outline-primary" @click="editAction(i)"><i class="bi bi-pencil me-lg-1"></i>
              Edit
            </button>
            <button class="btn btn-outline-primary" @click="cloneAction(i)"><i class="bi bi-copy me-lg-1"></i>
              Clone
            </button>
            <router-link class="btn btn-outline-primary" :to="{name:'share', params : {id : i}}"><i
                class="bi bi-share me-lg-1"></i>
              Share
            </router-link>
            <router-link class="btn btn-outline-primary" :to="{name:'bookmarklet', query : {action : i}}"><i
                class="bi bi-bookmark me-lg-1"></i>
              <span class="d-none d-lg-inline">Bookmarklet</span>
              <span class="d-lg-none">Bkmrklt</span></router-link>
            <button class="btn btn-outline-danger" @click="removeAction(i)"><i class="bi bi-trash me-lg-1"></i>
              Delete
            </button>
          </div>
        </div>
        
      </div>

      <div class="d-flex justify-content-center my-4">
        <button @click="addAction(i+1)" class="btn btn-outline-primary"><i class="bi bi-plus-lg"></i> Add
          Action
        </button>
      </div>
    
    </template>
  
  </template>
</template>