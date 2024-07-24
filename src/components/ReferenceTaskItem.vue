<script setup>
import Transformer from "../Transformer.js";

const props = defineProps({
  taskName: {
    type: String,
    required: true
  },
});

const task = Transformer.tasks[props.taskName];
</script>
<template>
  <div class="mb-3 card" :id="`task_${taskName}`">
    <div class="card-header">
      <h2 class="mb-0 card-title display-8">
        <router-link :to="{name:'referenceTasks', hash:`#task_${taskName}`}"><i class="text-muted bi bi-link-45deg"></i></router-link>
        {{ task.description }} &ndash; <code>{{ taskName }}</code></h2>
    </div>
    <div class="card-body pb-0">
      <table class="table small table-responsive table-sm">
        <tbody>
          <tr>
            <th scope="row" class="w-0">Accepts</th>
            <td><code>{{ task.accepts.join(' | ') }}</code></td>
          </tr>
          <tr>
            <th scope="row" class="w-0">Returns</th>
            <td><code>{{ task.returns.join(' | ') }}</code></td>
          </tr>
        </tbody>
      </table>

      <template v-if="task.args.length > 0">
        <h3 class="display-9 mb-0">Arguments</h3>
        <table class="small table table-responsive table-sm">
          <tbody>
          <tr v-for="arg, i in task.args" :key="i">
            <th scope="row" class="w-0 text-nowrap">{{ arg.name }}</th>
            <td class="w-0">{{ arg.type ?? 'string' }}<span v-if="arg.default">(={{ arg.default }})</span></td>
            <td>{{ arg.hint }}</td>
          </tr>
          </tbody>
        </table>
      </template>

      <slot/>
    </div>
  </div>


</template>