<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item
        v-for="(item, index) in levelList"
        :key="item.path"
    >
      <span v-if="item.redirect === 'noRedirect' || index === levelList.length - 1" class="no-redirect">
        {{ item.meta.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
let pathToRegexp = require("path-to-regexp")

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      if (route.path.startsWith('/redirect/')) {
        return;
      }
      this.getBreadcrumbList();
    }
  },
  created() {
    this.getBreadcrumbList();
  },
  methods: {
    /**
     * 从「 $route.matched 」中获取路由路径
     */
    getBreadcrumbList() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
      let firstMatched = matched[0];
      // 如果当前路由不是首页，则在最前面添加首页
      if (!this.judgeDashboard(firstMatched)) {
        matched = [{path: '/index', meta: {title: '首页'}}].concat(matched);
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title)
    },
    /**
     * 判断当前路由是否为主页
     * @param route 路由
     * @returns {boolean} True：是 False：不是
     */
    judgeDashboard(route) {
      const name = route.meta && route.meta.title;
      if (!name) {
        return false;
      }
      return name.trim() === '首页';
    },
    pathCompile(path) {
      const {params} = this.$route;
      let toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(route) {
      const {redirect, path} = route;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    }
  }
}
</script>

<style lang="scss" scoped>

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  margin-left: 16px;
  line-height: 50px;
  font-size: 14px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
