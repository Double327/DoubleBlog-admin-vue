<template>
  <div class="createPost-container">
    <el-form
        ref="form"
        class="form-container"
        :rules="rules"
        :model="form"
        label-width="80px"
    >
      <sticky :z-index="10" :class-name="'sub-navbar '+(form.status==null?'publish':'draft')">
        <el-button :loading="loading" style="margin-left: 10px" icon="el-icon-check" type="success" plain
                   @click="handleSubmitProject">
          发布
        </el-button>
        <el-button :loading="loading" icon="el-icon-message" type="warning" plain @click="draftProject">
          保存草稿
        </el-button>
      </sticky>
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="18">
            <el-form-item label="标题: " prop="title">
              <el-input
                  placeholder="请输入标题"
                  v-model="form.title"
                  show-word-limit
                  maxlength="150"
              />
            </el-form-item>
            <el-form-item label="摘要: " prop="description">
              <el-input
                  type="textarea"
                  v-model="form.description"
                  :autosize="{ minRows: 2, maxRows: 3}"
                  maxlength="500"
                  show-word-limit
                  placeholder="请输入摘要"/>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="GitHub: " label-width="80px">
                  <el-input v-model="form.github" placeholder="请输入GitHub地址"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Gitee: " label-width="80px">
                  <el-input v-model="form.gitee" placeholder="请输入Gitee地址"/>
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
                  <img v-if="form.thumbnail" :src="form.thumbnail" alt="" class="avatar"
                       @click="imagePickerOpen = true"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon"
                     @click="handleOpenImagePicker(false)"></i>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-tabs>
          <el-tab-pane label="项目简介">
            <mavon-editor ref="baseInfoEditor" v-model="form.baseInfoContent"></mavon-editor>
          </el-tab-pane>
          <el-tab-pane label="项目截图">
            <div class="avatar-uploader">
              <div class="el-upload el-upload--text">
                <i class="el-icon-plus avatar-uploader-icon" @click="handleOpenImagePicker(true)"></i>
              </div>
            </div>
            <el-card
                v-for="screenshot in form.screenshots"
                :key="screenshot"
                class=""
            >
              <div class="screenshot-box">
                <img
                    style="width: 100%;"
                    :src="screenshot"
                    alt=""
                    class="screenshot-item"
                />
                <span class="screenshot-item-actions">
                  <span class="screenshot-item-delete" @click="handleRemoveScreenshot(screenshot)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="项目结构">
            <mavon-editor ref="structureEditor" v-model="form.structure"></mavon-editor>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-form>

    <el-dialog
        title="图片选择"
        :visible.sync="imagePickerOpen"
    >
      <ImagePicker
          :multiple.sync="multiple"
          @handleThumbnailSelect="handleThumbnailSelect"
          @handleScreenshotSelect="handleScreenshotSelect"
          @closeImagePicker="closeImagePicker"
      ></ImagePicker>
    </el-dialog>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import ImagePicker from "@/components/ImagePicker";
import Sticky from "@/components/Sticky";
import marked from "marked";
import MyLocalStorage from "@/utils/MyLocalStorage";
import {addProject, editProject} from "@/api/project";

export default {
  name: "ProjectDetail",
  components: {Sticky, ImagePicker},
  mixins: [initData],
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      multiple: false,
      form: {
        title: '',
        description: '',
        thumbnail: '',
        baseInfoContent: '',
        baseInfoHtml: '',
        structure: '',
        structureHtml: '',
        screenshots: []
      },
      imagePickerOpen: false,
      rules: {
        title: [
          {required: true, message: '请输入项目标题', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入项目描述', trigger: 'blur'}
        ],
        thumbnail: [
          {required: true, message: '请输入项目简介', trigger: 'blur'}
        ],
        github: [],
        gitee: [],
        baseInfoContent: [
          {required: true, message: '请输入项目简介', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    handleRemoveScreenshot(screenshot) {
      this.form.screenshots = this.form.screenshots.filter(screenshotObj => screenshotObj.url !== screenshot)
    },
    handleOpenImagePicker(multiple) {
      this.multiple = multiple;
      this.imagePickerOpen = true;
    },
    handleScreenshotSelect(urlList) {
      this.form.screenshots = urlList;
      this.imagePickerOpen = false;
    },
    handleThumbnailSelect(url) {
      console.log(url);
      this.form.thumbnail = url;
    },
    closeImagePicker() {
      this.imagePickerOpen = false;
    },
    handleSubmitProject() {
      this.form.baseInfoHtml = marked(this.form.baseInfoContent);
      this.form.structureHtml = marked(this.form.structure);
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          this.form.status = true;
          let obj = JSON.parse(JSON.stringify(this.form));
          if (obj.id === undefined) {
            addProject(obj).then(res => {
              if (res.code === 200) {
                this.msgSuccess('发布成功');
                this.$router.push({path: '/projectManager/project'});
              } else {
                this.msgError(res.msg);
              }
              this.loading = false;
            }).catch(err => {
              console.log(err);
              this.loading = false;
            });
          } else {
            editProject(obj).then(res => {
              if (res.code === 200) {
                this.msgSuccess('发布成功');
                MyLocalStorage.Cache.remove('projectCache');
                this.$router.push({path: '/projectManager/project'});
              } else {
                this.msgError(res.msg);
              }
            }).catch(err => {
              console.log(err);
            });
          }
        }
      })
    },
    draftProject() {

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

.screenshot-box {
  position: relative;

  .screenshot-item {


  }

  .screenshot-item-actions {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    line-height: 100%;
    opacity: 0;
    text-align: center;
    background-color: rgba(0, 0, 0, .3);
    z-index: 1000;

    &:hover {
      opacity: 1;
    }

    .screenshot-item-delete {
      position: absolute;
      top: calc(50% - 20px);
      font-size: 40px;
      color: #fff;

      &:hover {
        color: #8c939d;
      }
    }
  }
}
</style>
