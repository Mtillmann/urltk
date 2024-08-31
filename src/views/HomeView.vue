<script setup>
import {onMounted, ref, watch} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const url = ref('');
const input = ref('');
const isValid = ref(false);

watch(() => url.value, (value) => {
  const valid = input.value.validity.valid;
  input.value.classList.toggle('is-invalid', !valid);
  isValid.value = url.value.length > 0 && valid;

});


onMounted(() => {
  //input.value.focus();
});

function go() {
  if (isValid.value) {
    router.push({name: 'url', params: {url: url.value}});
  }
}

</script>
<template>
  <div class="position-absolute translate-middle top-50 start-50 container-md container-fluid">
    <div class="input-group has-validation">
      <div class="form-floating">
        <input ref="input" type="url" class="form-control" id="url" placeholder="URL" v-model="url"
               @keyup.enter="go"/>
        <label for="url">URL</label>
      </div>
      <button :class="{disabled : !isValid}" class="btn btn-primary" type="button" @click="go"><i
          class="bi bi-collection-play me-1"></i> Run
      </button>
      <div class="small text-danger-emphasis text-center w-100" v-if="!isValid && url.length > 0">
        Please enter a valid URL
      </div>
    </div>
  </div>

</template>
<style>
#url{
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
</style>