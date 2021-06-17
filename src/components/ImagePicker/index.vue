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
            :auto-upload="true"
            :file-list="fileList"
            :before-upload="beforeImageUpload"
            :on-success="handleImageUploadSuccess"
            :http-request="uploadRequest"
            multiple
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
        <el-progress v-show="loadPercent > 0 && loadPercent !== 100" :percentage="loadPercent"
                     status="success"></el-progress>
      </el-tab-pane>
      <el-tab-pane label="网络图片">
        网络地址
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {getUploadToken} from "@/api/tool/qiNiu";
import * as qiniu from 'qiniu-js'
import {formatDate} from "element-ui/src/utils/date-util";

export default {
  name: "ImagePicker",
  data() {
    return {
      imageUrl: '',
      dialogImageUrl: '',
      disabled: false,
      dialogVisible: false,
      loadPercent: 0,
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      zones: {
        '华东': "z0",
        '华北': "z1",
        '华南': "z2",
        '北美': "na0",
        '东南亚': "as0",
        '华东-浙江2': "cn-east-2"
      }
    }
  },
  methods: {
    uploadRequest(request) {
      getUploadToken().then(res => {
        let token = res.token;
        let host = res.host;
        let zone = res.zone;
        this.qiNiuUpload(token, request, zone, next => {
          // total:上传进度
          let total = next.total;
          this.loadPercent = total.percent;
          if (this.loadPercent === 100) {
            this.loadPercent = 0;
          }
        }, err => {
          this.msgError('图片上传失败:' + err);
        }, complete => {
          let hash = complete.hash;
          let key = complete.key;
          this.msgSuccess('图片上传成功:' + hash);
          this.fileList.push({
            'name': key,
            'url': 'http://' + host + '/' + key
          });
          return complete;
        });
      });
      return true;
    },
    qiNiuUpload(token, obj, zone, next, err, complete) {
      const {file} = obj;
      // 文件名
      const key = formatDate(new Date(), 'yyyyMMddmmss') + file.name;
      const putExtra = {
        fname: file.name,
        params: {},
        mineType: ['image/jpeg', 'image/png', 'image/gif'] || null

      }, config = {
        useCdnDomain: true,
        region: this.zones[zone]
      }
      // 压缩选项
      let compressOptions = {
        quality: 0.92,
        noCompressIfLarger: true,
        // 最大宽度
        maxWidth: 1000,
        // 最大高度
        maxHeight: 618
      }

      // 图片压缩
      qiniu.compressImage(file, compressOptions).then(data => {
        // 调用sdk上传接口获得相应的observable，控制上传和暂停
        let observable = qiniu.upload(data.dist, key, token, putExtra, config);
        // subscribe方法激活上传操作
        return observable.subscribe(next, err, complete)
      }).catch(res => {
        return res
      });
    },
    handleImageUploadSuccess(res, file, fileList) {
      console.log('upload Success begin');
      console.log(res);
      console.log(file);
      console.log(fileList);
      console.log('upload Success end');
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeImageUpload(file) {
      const isLt10M = (file.size / 1024 / 1024) < 10;
      if (!isLt10M) {
        this.msgError("图片大小不能超过10MB");
        return isLt10M;
      }
    },
    handleSelected(file) {
      this.$emit('handleThumbnailSelect', file.url);
      this.$emit('closeImagePicker');
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
