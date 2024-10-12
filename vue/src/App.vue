<template>
  <div class="app">
    <keymove />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import keymove from './components/keymove.vue';
// import Buildings from './components/Buildings.vue';

export default defineComponent({
  name: 'App',
  components: { keymove },
});
</script>

<style scoped>
.app { width: 100%; height: 100%; }
</style>
