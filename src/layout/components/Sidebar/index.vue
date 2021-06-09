<template>
  <div :class="{'has-logo': showLogo }">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="true"
          :active-text-color="settings.theme"
          :collapse-transition="false"
          mode="vertical"
      >
        <sidebar-item
            v-for="route in permission_routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import variables from '@/assets/style/variables.scss';
import SidebarItem from "@/layout/components/Sidebar/SidebarItem";

export default {
  name: "Sidebar",
  components: {SidebarItem},
  computed: {
    ...mapState(['settings']),
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      // 获取当前路由
      const route = this.$route;
      // 解构 获取meta和路径
      const {meta, path} = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
