<script setup>
import {useRoute, useRouter} from 'vue-router';
import {inject, ref} from 'vue';
import TaskFlow from '../components/TaskFlow.vue';
import {inflateAction, validateAction} from '../util';

const {toast} = inject('toast');
const store = inject('store');
const route = useRoute();
const router = useRouter();
const actions = route.query.actions;
const error = ref(false);
const isValid = ref(false);
const plain = ref(null);
const parsed = ref(null);
const actionsToImport = ref([]);

if (actions) {
  try {
    plain.value = atob(actions);
  } catch (e) {
    error.value = 'The input is not valid base64.';
  }

  if (plain.value) {
    try {
      parsed.value = JSON.parse(plain.value);
    } catch (e) {
      error.value = 'The JSON is invalid.';
    }

    try {
      console.log(parsed.value);
      parsed.value = parsed.value.map(a => inflateAction(a));
    } catch (e) {
      console.log(e);
      error.value = 'one or more actions could not be inflated.';
      parsed.value = null;
    }

    if (parsed.value) {
      if (parsed.value.every(a => validateAction(a))) {
        isValid.value = true;
      } else {
        error.value = 'one or more actions could not be validated.';
      }

    }
  }
}

if (!error.value) {
  actionsToImport.value = parsed.value.map(a => true);
}

const addActions = () => {

  actionsToImport.value.forEach((a, i) => {
    if (a) {
      store.actions.push(parsed.value[i]);
    }
  });

  if (actionsToImport.value.filter(a => a).length === 1) {
    toast('Action imported');
  } else {
    toast('Actions imported');
  }

  router.push('/actions');
}

</script>
<template>

  <p v-if="!isValid">
    The action could not be imported: {{ error }}
  </p>
  <div v-else>
    <p class="lead">
      Please review all actions carefully before importing.
    </p>

    <table class="table table-bordered my-3" v-for="action, i in parsed" :key="i">
      <tbody>
      <tr>
        <th>Name</th>
        <td>{{ action.name }}</td>
      </tr>
      <tr>
        <th>Filter</th>
        <td>{{ action.filter || 'n/a' }}</td>
      </tr>
      <tr>
        <th>Tasks</th>
        <td>
          <div>
            <TaskFlow :action="action" :compact="true"/>
          </div>
        </td>
      </tr>
      <!--
      <tr>
          <th>JSON</th>
          <td>
              <pre>{{ JSON.stringify(action, null, 2) }}</pre>
          </td>
      </tr>
      -->
      <tr>
        <th></th>
        <td>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="actionsToImport[i]" :id="`cb${i}`">
            <label class="form-check-label" :for="`cb${i}`">
              Import this action
            </label>
          </div>
        </td>
      </tr>
      </tbody>
    </table>


    <div class="d-flex justify-content-center">
      <button v-if="actionsToImport.some(a => a)" @click="addActions" class="btn btn-primary">Import Actions</button>
      <p v-else>Please select at least one action to import</p>
    </div>
  </div>

</template>