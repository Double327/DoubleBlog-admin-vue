<template>
  <div>
    <el-tabs>
      <el-tab-pane label="七牛云服务器" style="height: 400px;overflow-y: auto">

      </el-tab-pane>
      <el-tab-pane label="本地服务器">

      </el-tab-pane>
      <el-tab-pane label="本地上传">
        <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :file-list="fileList"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}"
               style="width: 100%;height: 100%;">
            <img
                style="width: 100%;height: 100%;"
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
            >
            <span class="el-upload-list__item-actions">
              <span
                  class="el-upload-list__item-select"
                  @click="handleSelected(file)"
              >
                <i class="el-icon-check"></i>
              </span>
              <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="网络图片">
        网络地址
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {getUploadToken} from "@/api/tool/qiNiu";
import {upload} from '@/utils/QiNiu';

export default {
  name: "ImagePicker",
  data() {
    return {
      imageUrl: '',
      dialogImageUrl: '',
      disabled: false,
      dialogVisible: false,
      fileList: []
    }
  },
  methods: {
    uploadRequest(request) {
      getUploadToken().then(res => {
        let token = res.token;
        let host = res.host;
        upload(token, request, next => {
          let total = next.total;
          console.log(total);
        }, err => {
          console.log(err);
        }, complete => {
          let hash = complete.hash;
          let key = complete.key;
          this.imageUrl = "http://" + host + "/" + key;
          console.log(hash);
          console.log(key);
        })
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log((file.size / 1024 / 1024) < 10);
      const isLt10M = (file.size / 1024 / 1024) < 10;
      if (!isLt10M) {
        this.msgError("图片大小不能超过10MB");
        return isLt10M;
      }
    },
    handleSelected(file) {
      this.$emit('handleThumbnailSelect', file.url);
    },
    handleRemove() {

    }
  }
}
</script>

<style scoped lang="scss">
.drop-upload {
  text-align: center;
}
</style>
