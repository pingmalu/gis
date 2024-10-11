<template>
  <div class="app">
    <Mapmode />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Mapmode from './components/Mapmode.vue';

export default defineComponent({
  name: 'App',
  components: { Mapmode },
});
</script>

<style scoped>
.app { width: 100%; height: 100%; }
</style>
