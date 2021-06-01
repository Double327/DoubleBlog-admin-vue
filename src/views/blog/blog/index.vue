<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="文章标题">
        <el-input size="small" clearable style="width: 240px"/>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input size="small" clearable style="width: 240px"/>
      </el-form-item>
      <el-form-item label="推荐">
        <el-select value="" clearable size="small">
          <el-option label="推荐" :value="0"></el-option>
          <el-option label="不推荐" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select value="" size="small" clearable>
          <el-option label="已发表" :value="0"></el-option>
          <el-option label="草稿箱" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker style="width: 240px" clearable size="small" time-format="yyyy-MM-dd" type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search">搜索</el-button>
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

    <el-table :data="list">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="分类" prop="category.title"></el-table-column>
      <el-table-column label="摘要" prop="desc"></el-table-column>
      <el-table-column label="封面">
        <template slot-scope="scope">
          <el-image
              style="width: 30px; height: 30px"
              :src="scope.row.thumbnail"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="评论">

      </el-table-column>
      <el-table-column label="推荐"></el-table-column>
      <el-table-column label="状态"></el-table-column>
      <el-table-column label="创建时间"></el-table-column>
      <el-table-column label="评论"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "blog",
  data() {
    return {
      list: [
        {
          title: '标题',
          category: {
            id: 1,
            title: '分类1'
          },
          desc: '摘要',
          thumbnail: '',
          support: 1,
          status: 1,
          createTime: '2000-03-27',
          comment: 10
        },
        {
          title: '标题',
          category: {
            id: 1,
            title: '分类1'
          },
          desc: '摘要',
          thumbnail: '',
          support: 1,
          status: 1,
          createTime: '2000-03-27',
          comment: 10
        },
        {
          title: '标题',
          category: {
            id: 1,
            title: '分类1'
          },
          desc: '摘要',
          thumbnail: '',
          support: 1,
          status: 1,
          createTime: '2000-03-27',
          comment: 10
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
