<template>
  <div class="app-container">
    <project-detail :is-edit="false"/>
  </div>
</template>

<script>
import ProjectDetail from "@/views/project/project/ProjectDetail";

export default {
  name: "Add",
  components: {ProjectDetail}
}
</script>

<style scoped>

</style>
