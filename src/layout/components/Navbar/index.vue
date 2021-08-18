<template>
  <div class="navbar">
    <!-- 汉堡图标 收起侧边栏 -->
    <hamburger
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
    />
    <!-- 面包屑导航 -->
    <breadcrumb/>

    <!-- 右边工具栏 -->
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <el-tooltip content="搜索" effect="dark" placement="bottom"></el-tooltip>
        <el-tooltip content="全屏" effect="dark" placement="bottom"></el-tooltip>
        <el-tooltip content="布局大小" effect="dark" placement="bottom"></el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="require(`@/assets/avatar/${this.$store.state.user.avatar}`)" alt="" class="user-avatar">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span @click="setting = true">布局设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Hamburger from "@/components/Hamburger";
import Breadcrumb from "@/components/Breadcrumb";
import {mapGetters} from 'vuex';

export default {
  name: "navbar",
  components: {Hamburger, Breadcrumb},
  computed: {
    ...mapGetters([
      'sidebar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    async logout() {
      this.$confirm('确定注销并退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: "warning"
      }).then(() => {
        this.$store.dispatch('').then(() => {
          location.reload();
        });
      });
    }
  }
}
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 50px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  overflow: hidden;
  background: #fff;

  .hamburger-container {
    height: 100%;
    padding-left: 10px;
    line-height: 46px;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025);
    }
  }

  .right-menu {
    flex: 1;
    height: 100%;
    line-height: 50px;
    text-align: right;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
