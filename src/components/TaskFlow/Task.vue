<script setup>

import {cropText} from "../../util.js";

const props = defineProps({
  args: {
    type: Array,
    default: []
  },
  crop: {
    type: Number,
    default: null
  }
})

</script>
<template>
  <span class="small rounded font-monospace p-0dot5 px-2 me-2 bg-body-tertiary">
  <slot/>(<span v-for="(arg, i) in args" :key="i">`<var class="bg-info-subtle text-body-emphasis">{{
      cropText(arg, crop)
    }}</var>`<template v-if="i < args.length - 1">, </template></span>)</span>
</template>