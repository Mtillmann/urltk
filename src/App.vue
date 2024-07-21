<script setup>
import Navi from './components/Navigation.vue';
import {RouterView, useRoute} from 'vue-router';
import PopperToast from "./components/PopperToast.vue";

const route = useRoute();

</script>

<template>
  <div class="dvh-100 d-flex flex-column">
    <div class="flex-grow-1 overflow-y-auto">
      <div class="container-fluid container-md">
        <div class="row">
          <div class="col-12 py-4">
            <h1 class="display-6">
              <i :class="`bi bi-${ route.meta.icon }`"></i>
              {{ route.meta.title }}</h1>
            <hr>
            <RouterView/>
          </div>
        </div>
      </div>
    </div>

    <Navi/>


  </div>
  <PopperToast></PopperToast>
</template>