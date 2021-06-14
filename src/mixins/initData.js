import {add, del, edit, list} from "@/api/initData";
import {addDateRange} from "@/utils/doubleblog";

export default {
    data() {
        return {
            // 弹窗标题
            title: '',
            // 模组名称
            modalName: '',
            // 选中数组
            ids: [],
            // 非单个禁用 ???
            single: true,
            // 非多个禁用 ???
            multiple: true,
            // 选中行数据
            row: [],
            // 表格遮罩层
            loading: false,
            // 删除按钮遮罩层
            delLoading: false,
            // 总条数
            total: 0,
            // 表格数据
            list: [],
            // 是否显示弹出层
            show: false,
            // 是否显示对话框
            open: false,
            // 日期范围
            dateRange: [],
            //用来重置表单的form,有些属性清空不了
            formReset: {},
            // 表单参数
            form: {},
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                orderByColumn: "create_time",
                isAsc: "desc"
                //此处和具体的组件合并后可以设置查询参数
            },
            //操作延时时间
            time: 50,
            //URL前缀
            base: ''
        }
    },
    methods: {
        /** 初始化*/
        /** */
        async init() {
            if (!await this.beforeInit()) {
                return;
            }
            return new Promise((resolve, reject) => {
                this.loading = true;
                list(this.base, addDateRange(this.queryParams, this.dateRange)).then(res => {
                    this.total = res.total;
                    this.list = res.rows;
                    setTimeout(() => {
                        this.loading = false;
                    }, this.time);
                    resolve(res);
                }).catch(err => {
                    this.loading = false;
                    reject(err);
                });
            });
        },
        /** 搜索查询 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.init();
        },
        /**重置当前搜索框*/
        resetQuery() {
            this.dateRange = [];
            this.resetForm('queryForm');
            this.queryParams = {};
            this.handleQuery();
        },
        /**多选框选中数据*/
        handleSelectionChange(selection) {
            this.row = selection[0];
            this.ids = selection.map(item => item.id);
            this.single = selection.length !== 1;
            this.multiple = !selection.length;
        },
        /**删除单条数据*/
        handleSubDelete(id) {
            this.delLoading = true;
            return new Promise((resolve, reject) => {
                del(this.base, id).then(res => {
                    this.delLoading = false;
                    if (res.code === 200) {
                        this.$refs[id].doClose();
                        this.init();
                        this.msgSuccess('删除成功');
                    } else {
                        this.msgError('删除失败')
                    }
                    resolve(res);
                }).catch(err => {
                    this.delLoading = false;
                    reject(err);
                });
            })
        },
        handleAdd() {
            this.reset();
            this.title = '添加' + this.modalName;
            this.form = this.formReset;
            this.open = true;
        },
        /**更新数据*/
        handleEdit(row) {
            this.row = row || this.row;
            this.title = '修改' + this.modalName;
            this.open = true;
        },
        /**删除数据*/
        handleDelete() {
            this.delLoading = true;
            let $this = this;
            this.$confirm('是否删除主键为"' + $this.ids + '"的数据项?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(function () {
                del($this.base, $this.ids).then(res => {
                    if (res.code === 200) {
                        $this.init();
                        $this.msgSuccess('删除成功');
                    } else {
                        $this.msgError('删除失败');
                    }
                }).catch(() => {
                    $this.delLoading = false;
                });
            }).catch(()=>{
                $this.delLoading = false;
            });
        },
        /**数据导出*/
        handleExport() {

        },
        /**提交表单*/
        submitForm(refName) {
            if (this.$refs[refName] === undefined) {
                refName = 'form';
            }
            let obj = JSON.parse(JSON.stringify(this.form));
            this.$refs[refName].validate(valid => {
                if (valid) {
                    if (this.form.id !== undefined) {
                        edit(this.base, obj).then(response => {
                            if (response.code === 200) {
                                this.msgSuccess("修改成功");
                                this.open = false;
                                this.init();
                            } else {
                                this.msgError(response.msg);
                            }
                        });
                    } else {
                        add(this.base, obj).then(response => {
                            if (response.code === 200) {
                                this.msgSuccess("新增成功");
                                this.open = false;
                                this.init();
                            } else {
                                this.msgError(response.msg);
                            }
                        });
                    }
                }
            });
        },
        /**清空数据*/
        handleClean() {

        },
        cancel() {
            this.open = false;
            this.reset();
        },
        /**重置表单*/
        reset() {
            this.$nextTick(() => {
                if (this.$refs['form'] !== undefined) {
                    this.$refs['form'].resetFields();
                }
            });
            this.form = {};
        }

    }
}
