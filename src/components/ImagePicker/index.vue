<template>
  <div>
    <el-tabs>
      <el-tab-pane label="七牛云服务器" style="height: 400px;overflow-y: auto">

      </el-tab-pane>
      <el-tab-pane label="本地服务器">

      </el-tab-pane>
      <el-tab-pane label="本地上传">
        <el-upload
            class="avatar-uploader"
            action="http://up.qiniup.com"
            :show-file-list="false"
            accept="image/*"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadRequest"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
      imageUrl: ''
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
    }
  }
}
</script>

<style scoped lang="scss">
.avatar-uploader {
  text-align: center;
}

.avatar-uploader .el-upload {
  width: 100%;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
