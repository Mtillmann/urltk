<script setup>
import {ref, watch} from 'vue';

const url = ref('');
const input = ref('');
const isValid = ref(false);

watch(() => url.value, (value) => {
  const valid = input.value.validity.valid;
  input.value.classList.toggle('is-invalid', !valid);
  isValid.value = url.value.length > 0 && valid;

});

</script>
<template>

  <div class="form-floating mb-3 mt-5">
    <input ref="input" type="url" class="form-control" id="url" placeholder="URL" v-model="url"/>
    <label for="url">URL</label>
    <div class="invalid-feedback">
      Please enter a valid URL
    </div>
  </div>
  <div class="d-flex justify-content-center">
    <router-link :class="{disabled : !isValid}" :to="{ name: 'url', params : {url} }"
                 class="btn btn-primary"><i class="bi bi-collection-play"></i> Run Actions
    </router-link>
  </div>


</template>