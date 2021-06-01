<template>
  <BlogDetail :is-edit="true"/>
</template>

<script>
import BlogDetail from "@/views/blog/blog/BlogDetail";

export default {
  name: "edit",
  components: {BlogDetail}
}
</script>

<style scoped>

</style>
