<template>
  <div class="app-container">
    <QiNiuConfig ref="config"/>
    <el-form :inline="true" label-width="68px">
      <el-form-item label="文件名称">
        <el-input
            v-model="queryParams.name"
            placeholder="请输入文件名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上传时间">
        <el-date-picker
            type="daterange"
            v-model="dateRange"
            size="small"
            style="width: 240px"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            range-separator="-"
            value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search" @click="handleQuery">搜索</el-button>
        <el-button size="small" icon="el-icon-refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb5">
      <el-col :span="1.5">
        <el-button type="primary" size="mini" icon="el-icon-upload">上传文件</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" size="mini" icon="el-icon-edit">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" size="mini" icon="el-icon-s-tools" @click="handleEditConfig">七牛云配置</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" size="mini" icon="el-icon-download">导出</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import QiNiuConfig from "@/views/tool/storage/qiNiu/QiNiuConfig";

export default {
  name: "QiNiu",
  components: {QiNiuConfig},
  mixins: [initData],
  methods: {
    beforeInit() {
      this.base = '/tool/qiNiu';
      this.modalName = '七牛存储';
    },
    handleEditConfig() {
      const this_ = this.$refs.config;
      this_.getConfig();
      this_.dialog = true;
    }

  }
}
</script>

<style scoped>

</style>
