<template>
  <div class="createPost-container">
    <el-form
        ref="form"
        class="form-container"
        :rules="rules"
        :model="form"
    >
      <sticky :z-index="10" :class-name="'sub-navbar '+(form.status==null?'publish':'draft')">
        <el-button :loading="loading" style="margin-left: 10px" icon="el-icon-check" type="success" plain
                   @click="handleSubmitBlog">
          发布
        </el-button>
        <el-button :loading="loading" icon="el-icon-message" type="warning" plain @click="draftBlog">
          保存草稿
        </el-button>
      </sticky>
      <div class="createPost-main-container">
        <!-- 其他选项 -->
        <el-row>
          <el-col :span="18">
            <el-form-item label="标题" label-width="60px" prop="title">
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
                <el-form-item label-width="60px" label="分类" prop="categoryId">
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
                <el-form-item label="推荐" label-width="60px" prop="support">
                  <el-switch v-model="form.support" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="评论" label-width="60px" prop="comment">
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
                      value>

                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否私有" label-width="60px" prop="comment">
                  <el-radio-group v-model="form.private">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
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
                  <i v-else class="el-icon-plus avatar-uploader-icon" @click="imagePickerOpen = true"></i>
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

    <el-dialog
        title="图片选择"
        :visible.sync="imagePickerOpen"
    >
      <ImagePicker
          @handleThumbnailSelect="handleThumbnailSelect"
      ></ImagePicker>
    </el-dialog>
  </div>
</template>

<script>
import ImagePicker from "@/components/ImagePicker";
import Sticky from "@/components/Sticky";
import marked from 'marked';
import initData from "@/mixins/initData";
import {addBlog, editBlog, getBlogDetail} from "@/api/blog";
import MyLocalStorage from "@/utils/MyLocalStorage";
import {getBlogCategoryTree} from "@/api/blog/category";

export default {
  name: "BlogDetail",
  mixins: [initData],
  components: {ImagePicker, Sticky},
  data() {
    return {
      imagePickerOpen: false,
      form: {
        categoryId: undefined,
        title: '',
        desc: '',
        thumbnail: '',
        content: '',
        htmlContent: '',
        private: '',
        support: false,
        comment: false,
      },
      categoryOptions: [],
      rules: {
        title: [
          {required: true, message: '请输入博文标题', trigger: 'blur'},
          {min: 2, max: 150, message: '长度在 2 到 150 个字符', trigger: 'change'}
        ],
        desc: [
          {required: true, message: '请输入博文概要', trigger: 'blur'},
          {min: 10, max: 150, message: '长度在 10 到 256 个字符', trigger: 'change'}
        ],
        categoryId: [
          {required: true, message: "请选择博文分类", trigger: "change"}
        ],
        comment: [
          {required: true, message: "请选择是否允许评论", trigger: "change"}
        ]
      }
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  created() {
    let blogCache = MyLocalStorage.Cache.get('blogCache');
    let fetch = true;
    if (blogCache !== undefined && blogCache.content !== undefined && blogCache.content.length !== 0) {
      this.$confirm('检测到本地存在未发布博文,是否继续编辑', '提示', {
        confirmButtonText: '继续编辑',
        cancelButtonText: '删除本地记录并新建博文',
        type: 'warning'
      }).then(() => {
        this.msgSuccess('已成功恢复');
        fetch = false;
        this.form = blogCache;
      }).catch(err => {
        console.log(err);
        this.msgInfo('已删除');
        // 删除缓存
        MyLocalStorage.Cache.remove('blogCache');
      });
    }
    if (fetch && this.isEdit) {
      const id = this.$route.params && this.$route.params.id;
      this.fetchData(id);
    }
    this.getCategory();
    // 5分钟自动保存一次
    setInterval(() => {
      MyLocalStorage.Cache.put('blogCache', this.form);
    }, 5000);
  },
  methods: {
    // 修改分类
    handleCategoryChange(val) {
      this.form.categoryId = val[val.length - 1]
    },
    handleThumbnailSelect(url) {
      this.form.thumbnail = url;
    },
    /**提交表单*/
    handleSubmitBlog() {
      this.form.htmlContent = marked(this.form.content);
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          this.form.status = true;
          let obj = JSON.parse(JSON.stringify(this.form));
          if (obj.id === undefined) {
            addBlog(obj).then(res => {
              if (res.code === 200) {
                this.msgSuccess('发布成功');
                this.$router.push({path: '/blogManager/blog'});
              } else {
                this.msgError(res.msg);
              }
              this.loading = false;
            }).catch(err => {
              console.log(err);
              this.loading = false;
            });
          } else {
            editBlog(obj).then(res => {
              if (res.code === 200) {
                this.msgSuccess('发布成功');
                this.$router.push({path: '/blogManager/blog'});
              } else {
                this.msgError(res.msg);
              }
            }).catch(err => {
              console.log(err);
            })
          }
        }
      })
    },
    /**保存草稿*/
    draftBlog() {

    },
    /**获取博文信息*/
    fetchData(id) {
      getBlogDetail(id).then(res => {
        if (res.code !== 200) {
          this.msgError(res.msg);
          return;
        }
        this.form = res.data;
      });
    },
    /**获取博文分类*/
    getCategory() {
      getBlogCategoryTree().then(res => {
        if (res.code === 200) {
          this.categoryOptions = res.data;
        } else {
          this.msgError(res.msg);
        }
      });
    },
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
