<script setup>
import {checkTypeConflicts} from '../util';
import Task from './TaskFlow/Task.vue';
import Payload from './TaskFlow/Payload.vue';
import Icon from "./TaskFlow/Icon.vue";
import Next from "./TaskFlow/Next.vue";

const props = defineProps({
  action: {
    type: Object,
    required: true
  },
  crop: {
    type: Number,
    default: null
  },
  trace: {
    type: Array,
    default: []
  },
  startUrl: {
    type: URL,
    default: null
  },
  compact: {
    type: Boolean,
    default: true
  }
})


const conflicts = checkTypeConflicts(props.action.tasks.map((t) => t.name));


</script>
<template>
  <div class="break-all" :class="{'text-center' : !compact}">

    <Icon class="text-info">play-fill</Icon>
    <Task :crop="crop">start</Task>

    <Next :compact="compact"></Next>

    <Payload v-if="startUrl" :type="'URL'">{{ startUrl }}</Payload>

    <Next :compact="compact" v-if="startUrl"></Next>

    <template v-if="!['', '*'].includes(action.filter)">
      <Task :crop="crop" :args="[action.filter]">filter</Task>
      <Next :compact="compact"></Next>
      <Payload v-if="trace.length > 0" :type="'Bool'">true</Payload>
    </template>

    <template v-for="t, i in action.tasks" :key="i">
      <Icon v-if="!!conflicts[i]" class="text-warning">exclamation-octagon-fill</Icon>
      <Task :crop="crop" :args="t.args">{{ t.name }}</Task>

      <template v-if="trace[i]">
        <Next :compact="compact"></Next>
        <Payload v-if="trace[i].error" type="ERROR" styles="bg-warning">{{ trace[i].error }}</Payload>
        <Payload v-else :type="trace[i].url.constructor.name">{{ trace[i].url }}</Payload>
      </template>

      <Next :compact="compact"></Next>
      <template v-if="i === action.tasks.length -1">
        <Task>done</Task>
        <Icon class="text-success">stop-fill</Icon>
      </template>
    </template>
  </div>


</template>