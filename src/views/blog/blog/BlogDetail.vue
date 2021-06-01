<template>
  <div class="createPost-container">
    <el-form
        ref="form"
        class="form-container"
    >
      <div class="createPost-main-container">
        <!-- 其他选项 -->
        <el-row>
          <el-col :span="18">
            <el-form-item label="标题" label-width="60px">
              <el-input
                  v-model="form.title"
                  placeholder="请输入标题"
                  maxlength="150"
                  show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label-width="60px" label="摘要: " prop="desc">
              <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 2, maxRows: 3}"
                        maxlength="256"
                        show-word-limit
                        placeholder="请输入摘要"></el-input>
            </el-form-item>
            <!-- 分类、推荐、评论 -->
            <el-row>
              <el-col :span="6">
                <el-form-item label-width="60px" label="分类">
                  <el-cascader
                      :value="form.categoryId"
                      :options="categoryOptions"
                      :props="{expandTrigger: 'hover', label: 'title', value: 'id'}"
                      :show-all-levels="false"
                      @change="handleCategoryChange"
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="推荐" label-width="60px">
                  <el-switch v-model="form.support" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="评论" label-width="60px">
                  <el-radio-group v-model="form.comment">
                    <el-radio :label="true">开启</el-radio>
                    <el-radio :label="false">关闭</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="60px" label="标签">
                  <el-select
                      default-first-option
                      filterable
                      remote
                      multiple
                      allow-create
                      placeholder="请选择标签"
                  >

                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-form-item
                prop="thumbnail"
                label-width="60px"
                label="封面"
            >
              <div class="avatar-uploader">
                <div class="el-upload el-upload--text">
                  <img v-if="form.thumbnail" :src="form.thumbnail" alt="" class="avatar"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 文章正文 -->
        <el-form-item>
          <mavon-editor ref="editor" v-model="form.content"></mavon-editor>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "BlogDetail",
  data() {
    return {
      form: {
        title: '',
        desc: '',
        categoryId: 9,
        support: false,
        comment: false,
      },
      categoryOptions: [
        {
          id: 1,
          title: '一级分类1',
          children: [
            {
              id: 4,
              title: '二级分类4',
              children: [
                {
                  id: 9,
                  title: '三级分类1'
                }
              ]
            },
            {
              id: 5,
              title: '二级分类5'
            },
            {
              id: 6,
              title: '二级分类6'
            },
            {
              id: 7,
              title: '二级分类7'
            },
          ]
        }, {
          id: 2,
          title: '一级分类1',
          children: [
            {}
          ]
        }, {
          id: 3,
          title: '一级分类1',
          children: [
            {}
          ]
        }
      ]
    }
  },
  methods: {
    // 修改分类
    handleCategoryChange(val) {
      this.form.categoryId = val[val.length - 1]
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/mixin.scss";

.createPost-container {
  .createPost-main-container {
    padding: 30px 45px 20px 50px;

    .postInfo-container {
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }
}


.avatar-uploader .el-upload {
  position: relative;
  width: 100%;
  height: 224px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  width: 100%;
  height: 224px;
  line-height: 224px;
  text-align: center;
  font-size: 28px;
  color: #8c939d;
}

.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
