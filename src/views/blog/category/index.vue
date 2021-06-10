<template>
  <div class="app-container">
    <!--搜索表单-->
    <el-form :inline="true">
      <el-form-item label="分类名称">
        <el-input
            size="small"
            v-model="queryParams.title"
            @keyup.enter.native="handleQuery"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类描述">
        <el-input
            size="small"
            v-model="queryParams.description"
            @keyup.enter.native="handleQuery"
        ></el-input>
      </el-form-item>
      <el-form-item label="创建日期">
        <el-date-picker
            style="width: 240px"
            size="small"
            type="daterange"
            start-placeholder="请选择开始日期"
            end-placeholder="请选择结束日期"
            v-model="dateRange"
            range-separator="-"
            value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
        <el-button size="mini" icon="el-icon-refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <!--操作按钮-->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
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

    <!--数据表格-->
    <el-table
        v-loading="loading"
        :data="list"
        default-expand-all
        row-key="id"
        :tree-props="{children: 'children'}"
    >
      <el-table-column type="selection"/>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="描述" prop="description"/>
      <el-table-column label="创建时间" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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

    <!--分页组件-->
    <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="init"
    />

    <el-dialog
        :close-on-click-modal="false"
        :close-on-press-escape="true"
        :title="title"
        :visible.sync="open"
        width="500px"

    >
      <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
      >
        <el-form-item label="上级分类" prop="parentId">
          <el-select
              style="width: 380px"
              v-model="form.parentId"
              clearable
              placeholder="请选择上级类别"
          >
            <el-option
                v-for="cate in parentCategoryOptions"
                :key="cate.id"
                :label="cate.title"
                :value="cate.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="title">
          <el-input v-model="form.title"/>
        </el-form-item>
        <el-form-item label="分类描述" prop="description">
          <el-input v-model="form.description"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import pagination from '@/components/pagination';
import {getParentCategory} from "@/api/blog/category";

export default {
  name: "category",
  mixins: [initData],
  components: {pagination},
  data() {
    return {
      parentCategoryOptions: [],
      rules: {
        title: [
          {required: true, message: '请填写分类名称', trigger: 'blur'},
          {min: 2, max: 50, message: '长度在 5 到 120 个字符', trigger: 'change'}
        ],
        description: [
          {required: true, message: '请填写分类描述', trigger: 'blur'},
          {min: 2, max: 50, message: '长度在 5 到 120 个字符', trigger: 'change'}
        ]
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.init();

    });
  },
  methods: {
    beforeInit() {
      this.base = '/blog/category';
      this.modalName = '博客分类';
      return true;
    },
    getParentCategoryTree() {
      getParentCategory().then(res => {
        if (res.code === 200) {
          this.parentCategoryOptions = res.data;
        }
      }).catch(err => {
        this.msgError(err);
      });
    },
    handleAdd() {
      this.reset();
      this.title = '添加博客分类';
      this.form = this.formReset;
      this.getParentCategoryTree();
      this.open = true;
    },
    handleEdit(row) {
      this.form = row;
      this.title = '修改博客分类';
      this.getParentCategoryTree();
      this.open = true;
    },
  }
}
</script>

<style scoped>

</style>
