<script setup>
import Icon from "./Icon.vue";

const props = defineProps({
  compact: {
    type: Boolean,
    default: true
  }
})
</script>
<template>
  <div v-if="!compact">
    <Icon>arrow-down</Icon>
  </div>
  <Icon v-else>arrow-right-short</Icon>
</template>