<template>
  <div class="app-container">
    <el-tabs
        v-model="activeName"
    >
      <el-tab-pane label="本地存储" name="first">
        <Local/>
      </el-tab-pane>
      <el-tab-pane label="七牛云存储" name="second">
        <QiNiu/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Local from "@/views/tool/storage/local";
import QiNiu from "@/views/tool/storage/qiNiu";

export default {
  name: "storage",
  components: {QiNiu, Local},
  data() {
    return {
      activeName: 'second'
    }
  }
}
</script>

<style scoped>

</style>
