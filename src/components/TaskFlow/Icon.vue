<script setup>
import {useSlots} from "vue";


const slots = useSlots();
const icon = slots.default?.()[0].children ?? 'x';
</script>
<template>
  <span class="bg-body-secondary small p-0dot5 rounded me-2">
    <i class="bi" :class="`bi-${icon}`"></i>
  </span>
</template>