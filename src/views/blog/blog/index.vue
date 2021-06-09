<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="文章标题">
        <el-input v-model="queryParams.title" placeholder="请输入文章标题" clearable size="small" style="width: 240px"
                  @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input v-model="queryParams.description" placeholder="请输入摘要" clearable size="small" style="width: 240px"
                  @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="queryParams.status" placeholder="博客状态" clearable size="small">
          <el-option label="asdf" :value="1"/>
        </el-select>
      </el-form-item>
      <el-form-item label="推荐">
        <el-select v-model="queryParams.support" placeholder="推荐" clearable size="small">
          <el-option label="asdf" :value="1"/>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="dateRange" size="small" style="width: 240px" value-format="yyyy-MM-dd" type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            icon="el-icon-minus"
            size="mini"
            @click="handleDelete"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="warning"
            icon="el-icon-download"
            size="mini"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="list" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="标题" prop="title" :show-overflow-tooltip="true"/>
      <el-table-column label="分类" prop="category.title"/>
      <el-table-column label="摘要" prop="desc" :show-overflow-tooltip="true"/>
      <el-table-column label="封面" width="50">
        <template slot-scope="scope">
          <el-image
              style="width: 30px; height: 30px"
              :src="scope.row.thumbnail"
              :preview-src-list="[scope.row.thumbnail]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="是否私有">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.private"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handlePrivateChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="推荐" prop="support" align="center">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.support"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleSupportChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === true">发布</el-tag>
          <el-tag v-else type="warning">草稿</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" icon="el-icon-edit">
            <router-link :to="'blog/edit/'+scope.row.id">编辑</router-link>
          </el-button>
          <el-popover
              placement="top"
              width="180"
              :ref="scope.row.id"
          >
            <p>是否删除本条数据？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button type="primary" size="mini" :loading="delLoading" @click="handleSubDelete(scope.row.id)">确定
              </el-button>
            </div>
            <el-button slot="reference" type="text" size="mini" icon="el-icon-delete">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="init"
    />
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import {editBlogPrivate, editBlogSupport} from "@/api/blog";

export default {
  name: "blog",
  mixins: [initData],
  data() {
    return {}
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    beforeInit() {
      this.base = '/blog/blog';
      this.modalName = '博客';
      return true;
    },
    handleSupportChange(row) {
      let text = row.support ? '推荐' : '取消推荐';
      this.$confirm('确定要' + text + row.title + '博客吗?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(function () {
        return editBlogSupport(row.id, row.support);
      }).then(res => {
        if (res.code === 200) {
          this.msgSuccess(text + '成功');
        } else {
          this.msgError(text + '失败');
        }
      }).catch(function () {
        row.support = row.support === false;
      });
    },
    handlePrivateChange(row) {
      let text = row.private ? '私有' : '取消私有';
      this.$confirm('确定要将博客' + row.title + text + '吗?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(function () {
        console.log(row.private);
        return editBlogPrivate(row.id, row.private);
      }).then(res => {
        if (res.code === 200) {
          this.msgSuccess(text + '成功');
        } else {
          this.msgError(text + '失败');
        }
      }).catch(function () {
        row.private = row.private === false;
      });
    }
  }
}
</script>

<style scoped>

</style>
