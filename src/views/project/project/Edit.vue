<template>
  <div class="app-container">
    <ProjectDetail :is-edit="true"/>
  </div>
</template>

<script>
import ProjectDetail from "@/views/project/project/ProjectDetail";
export default {
  name: "Edit",
  components: {ProjectDetail}
}
</script>

<style scoped>

</style>
