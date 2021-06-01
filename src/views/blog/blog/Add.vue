<template>
  <BlogDetail :is-edit="false"/>
</template>

<script>
import BlogDetail from "@/views/blog/blog/BlogDetail";

export default {
  name: "Add",
  components: {BlogDetail}
}
</script>

<style scoped>

</style>
