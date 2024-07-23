<script setup>
import {useRoute, useRouter} from 'vue-router';
import {inject, ref, watch} from 'vue';
import Transformer from '../Transformer'
import {checkTypeConflicts} from '../util';

const store = inject('store');
const route = useRoute();
const router = useRouter();

const action = ref({});

const position = route.query.position ?? 'bottom';
const conflicts = ref([]);
const {toast} = inject('toast');

if (route.params.id === 'new') {
  action.value = {
    version: 1,
    name: 'New Action',
    filter: '*',
    tasks: []
  }

} else {
  action.value = JSON.parse(JSON.stringify(store.actions[route.params.id]));
  conflicts.value = checkTypeConflicts(action.value.tasks.map((t) => t.name));
}

function saveAction() {
  store.saveAction(action.value, route.params.id, position);
  toast('Action saved');

  router.push('/actions');
}

function unshift() {
  action.value.tasks.unshift({
    name: 'noop',
    args: Transformer.tasks['noop'].args.map((a) => a.default ?? '')
  });


  conflicts.value = checkTypeConflicts(action.value.tasks.map((t) => t.name));
}

function splice(index) {

  action.value.tasks.splice(index, 0, {
    name: 'noop',
    args: Transformer.tasks['noop'].args.map((a) => a.default ?? '')
  });

  conflicts.value = checkTypeConflicts(action.value.tasks.map((t) => t.name));
}

function remove(index) {

  action.value.tasks.splice(index, 1);
  conflicts.value = checkTypeConflicts(action.value.tasks.map((t) => t.name));
}

function resetArgs(index) {
  action.value.tasks[index].args = Transformer.tasks[action.value.tasks[index].name].args.map((a) => a.default ?? '');
}


</script>
<template>

  <div class="form-floating mb-3">
    <input ref="input" type="url" class="form-control" id="url" placeholder="Name" v-model="action.name"/>
    <label for="url">Name</label>
  </div>

  <div class="form-floating mb-3">
    <input ref="input" type="url" class="form-control" id="url" placeholder="URL Filter" v-model="action.filter"/>
    <label for="url">URL Filter</label>
  </div>

  <div class="mb-3 d-flex justify-content-center">
    <button @click="unshift()" class="btn btn-outline-primary"><i class="bi bi-plus-lg"></i> Add
      Task
    </button>
  </div>

  <template v-for="task, i in action.tasks" :key="i">
    <div class="card">
      <div class="card-header">
        <p v-if="conflicts[i]" class="small py-1 px-2 alert alert-warning">
          <i class="bi bi-exclamation-octagon"></i>
          This will likely fail because the previous transformer yields an unsupported Data Type:
          <kbd>{{ conflicts[i].join(',') }}</kbd>
        </p>
        <div class="d-flex">
          <div class="form-floating flex-grow-1">
            <select class="form-select" :id="`task_${i}`" aria-label="Action"
                    v-model="action.tasks[i].name" @change="resetArgs(i)">
              <optgroup v-for="group, groupname in Transformer.grouped" :label="groupname">
                <option v-for="transformer, key in group" :value="key">{{
                    transformer.description
                  }}
                </option>
              </optgroup>
            </select>
            <label :for="`task_${i}`">Task</label>
          </div>
          <button v-if="action.tasks.length > 1"
                  @click="remove(i)"
                  class="ms-2 btn btn-outline-danger"><i class="bi bi-trash"></i></button>
        </div>
        <p class="small text-muted mb-0 mt-2 d-none">{{
            Transformer.tasks[task.name].description
          }}</p>
        <div class="small d-none">
          <kbd class="bg-info"><i class="bi bi-box-arrow-in-right"></i> {{
              Transformer.tasks[task.name].accepts.join('|')
            }}</kbd>
          <kbd class="bg-success ms-2"><i class="bi bi-box-arrow-right"></i> {{
              Transformer.tasks[task.name].returns
            }}</kbd>
        </div>

      </div>
      <div class="card-body pb-0"
           v-if="Transformer.tasks[task.name].args.length !== 0">
        <template v-for="a, j in Transformer.tasks[task.name].args" :key="j">
          <template v-if="!('type' in a) || a.type === 'input'">
            <div class="form-floating" :class="{'mb-3': !a.hint}">
              <input type="text" autocomplete="off" class="form-control form-control-sm" :id="`arg_${i}_${j}`"
                     :placeholder="a.name" v-model="task.args[j]"/>
              <label :for="`arg_${i}_${j}`">{{ a.name }}</label>
            </div>

          </template>
          <template v-else-if="a.type === 'checkbox'">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                     v-model.bool="task.args[j]" :id="`arg_${i}_${j}`">
              <label class="form-check-label" :for="`arg_${i}_${j}`">
                {{ a.name }}
              </label>
            </div>

          </template>
          <p v-if="a.hint" class="small text-muted mb-3">{{ a.hint }}</p>
        </template>
      </div>
    </div>

    <div class="d-flex my-3 justify-content-center">
      <button @click="splice(i+1)" class="btn btn-outline-primary"><i
          class="bi bi-plus-lg"></i>Add Task
      </button>
    </div>
  </template>


  <template v-if="action.tasks.length > 0">
    <hr>

    <div class="d-flex justify-content-center">
      <button @click="saveAction" class="btn btn-primary"><i class="bi bi-floppy"></i> Save
        Action
      </button>
    </div>
  </template>


</template>