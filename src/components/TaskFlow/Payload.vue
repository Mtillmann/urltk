<script setup>
import {defineProps} from 'vue';


const props = defineProps({
  type: {
    type: [String, Array],
    default: null
  }
})

const spanClasses = props.type === 'ERROR' ? 'bg-warning-subtle text-warning' : 'bg-body-tertiary text-success-emphasis';
const typeClasses = props.type === 'ERROR' ? 'bg-warning' : 'bg-success-subtle';


const type = (Array.isArray(props.type) ? props.type : [props.type]).join('|');

</script>
<template>

<span class="font-monospace small p-0dot5 px-2 rounded" :class="spanClasses">
    <span v-if="type" class="bg-success-subtle me-2 smaller" :class="typeClasses">{{ type }}</span>
    <slot></slot>
</span>

</template>