<template>
  <div id="app">
  <Mapmode />
  </div>
</template>

<script>
import Mapmode from './components/Mapmode.vue';

export default {
  name: 'App',
  components: {
    Mapmode,
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
