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
  <div class="mb-3">
    <h2 class="mb-0 display-7"><code>{{taskName}}</code> &bdquo;{{ task.description }}&ldquo;</h2>
    <div>Accepts: <code>{{task.accepts.join('|')}}</code>, Returns: <code>{{task.returns}}</code>
    <template v-if="task.args.length > 0"><br>Arguments:

        <span v-for="arg, i in task.args">

          <code class="bg-body-secondary"><small>{{arg.type ?? 'string'}}</small> "{{arg.name}}"<span v-if="arg.default">(={{String(arg.default)}})</span></code><span v-if="i < task.args.length - 1">, </span>

        </span>

    </template>
      </div>

    <slot />
  </div>



</template>