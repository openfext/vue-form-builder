<template>
  <div id="app">
    <form-builder-preview></form-builder-preview>
  </div>
</template>

<script>
import FormBuilderPreview from './components/FormBuilderPreview.vue'

export default {
  name: 'app',
  components: {
    FormBuilderPreview
  }
}
</script>

<style>
html,
body {
  height: 100%;
}

#app {
  height: 100%;
}
</style>
