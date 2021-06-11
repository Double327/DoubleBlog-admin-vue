<template>
  <el-dialog
      :visible.sync="dialog"
      title="七牛云配置"
      append-to-body
      width="580px"
      :close-on-click-modal="false"
  >
    <el-form
        ref="form"
        label-width="110px"
        :model="form"
        :rules="rules"
        size="small"
        style="margin-top: 6px;"
    >
      <el-form-item
          label="Access Key"
          prop="accessKey"
      >
        <el-input v-model="form.accessKey" style="width: 95%;"/>
      </el-form-item>
      <el-form-item
          label="Secret Key"
          prop="secretKey"
      >
        <el-input v-model="form.secretKey" type="password" style="width: 95%;"/>
      </el-form-item>
      <el-form-item
          label="Bucket"
          prop="bucket"
      >
        <el-input v-model="form.bucket" style="width: 95%;"/>
      </el-form-item>
      <el-form-item
          label="外链域名"
          prop="host"
      >
        <el-input v-model="form.host" style="width: 95%;"/>
      </el-form-item>
      <el-form-item
          label="存储区域"
          prop="zone"
      >
        <el-select
            v-model="form.zone"
            placeholder="请选择存储区域"
            style="width: 408.5px;"
        >
          <el-option
              v-for="zone in zones"
              :key="zone"
              :label="zone"
              :value="zone"
          />
        </el-select>
      </el-form-item>
      <el-form-item
          label="空间类型"
          prop="type"
      >
        <el-radio v-model="form.type" label="公开">公开</el-radio>
        <el-radio v-model="form.type" label="私有">私有</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="dialog=false">取消</el-button>
      <el-button :loading="loading" type="primary" @click="handleSubmit" size="small">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {editQiNiuConfig, getQiNiuConfig} from "@/api/tool/qiNiu";

export default {
  name: "QiNiuConfig",
  data() {
    return {
      zones: ['华东', '华北', '华南', '北美', '东南亚'],
      dialog: false,
      loading: false,
      form: {
        accessKey: '',
        secretKey: '',
        bucket: '',
        host: '',
        zone: '',
        type: ''
      },
      rules: {
        accessKey: [
          {required: true, message: '请输入accessKey', trigger: 'blur'}
        ],
        secretKey: [
          {required: true, message: '请输入secretKey', trigger: 'blur'}
        ],
        bucket: [
          {required: true, message: '请输入空间名称', trigger: 'blur'}
        ],
        host: [
          {required: true, message: '请输入外链域名', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请输入空间类型', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    getConfig() {
      getQiNiuConfig().then(res => {
        this.form = res.data;
      });
    },
    handleSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true;
          editQiNiuConfig(this.form).then(res => {
            if (res.code === 200) {
              this.msgSuccess('修改成功');
              this.dialog = false;
            } else {
              this.msgError(res.msg);
            }
          }).catch(err => {
            this.loading = false;
            console.log(err);
          });
        } else {
          this.loading = false;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
