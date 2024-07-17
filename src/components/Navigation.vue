<script setup>
import {useRouter} from 'vue-router';
import {computed, inject} from 'vue';

const {settings} = inject('store');
const router = useRouter();

const routes = computed(() => {
  const routesToUse = ['home', 'history', 'actions', 'settings', 'reference'];

  if (settings.historyLimit === 0) {
    routesToUse.splice(routesToUse.indexOf('history'), 1);
  }

  return routesToUse
      .map(name => router.getRoutes().find(r => r.name === name))
});


const isActive = (route) => {
  const currentPath = router.currentRoute.value.matched[0]?.path;
  const routePath = route?.path;

  if (routePath === '/') {
    return currentPath === routePath;
  }

  return router.currentRoute.value.matched[0]?.path.startsWith(route?.path);
}

</script>
<template>
  <nav class="flex-shrink-0 navbar bg-body-tertiary overflow-x-auto pt-0">
    <nav class="nav flex-nowrap">
      <template v-for="r,i in routes" :key="i">
        <router-link v-if="r.meta.inNavigation" class="pt-3 nav-link"
                     :class="{'active shadow':isActive(r)}" :to="r.path">
          {{ r.meta.title }}
        </router-link>
      </template>
    </nav>

  </nav>
</template>
<style scoped>
.active {
  color: var(--bs-primary);
  background-color: var(--bs-body-bg);
  border-bottom-left-radius: var(--bs-border-radius);
  border-bottom-right-radius: var(--bs-border-radius);


}
</style>