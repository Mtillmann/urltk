<script setup>

import {inject, onMounted, ref, watch} from "vue";
import {createPopper} from '@popperjs/core';
import flip from '@popperjs/core/lib/modifiers/flip';
import offset from '@popperjs/core/lib/modifiers/offset';

const toast = inject('toast');
const toastbox = ref(null);
const popup = ref(null);
const visible = ref(false);
const popper = ref(null);
let timeout = null;

onMounted(() => {
  popper.value = createPopper(toastbox.value, popup.value, {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top', 'right'],
        },
      },
    ],
  });
})

watch(() => toast.notice, (value) => {
  clearTimeout(timeout);
  if (value) {
    popup.value.innerHTML = value.message;
    visible.value = true;
    popper.value.update();
    timeout = setTimeout(() => {
      visible.value = false;
    }, toast.notice.ttl);
  } else {
    visible.value = false;
  }
});


</script>
<template>
  <div ref="popup" id="popup" class="p-2 shadow shadow-sm alert"
       :class="{'d-none': !visible, [`alert-${toast.notice?.type}`] : true}"></div>
  <div ref="toastbox" id="toastbox" :class="{'d-none': !visible}" class="position-absolute translate-middle"
       :style="visible ? `left:${toast.x}px;top:${toast.y}px` : ''"></div>
</template>

<style scoped>
#toastbox {
  width: 1px;
  height: 1px;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

#popup {
  z-index: 9999;
  animation: fadein 0.5s;
  transition: opacity 0.5s;
}

</style>