<template>
  <div class="app-wrapper">

    <div class="drawer-bg"></div>
    <!--侧边栏导航-->
    <sidebar class="sidebar-container"></sidebar>
    <!--页面容器-->
    <div class="main-container">
      <!--顶部导航、设置-->
      <div class="navbar"></div>
      <div>
        <navbar/>
      </div>
      <!--功能板块-->
      <AppMain/>
      <!--右边面板-->
      <RightPanel>
      </RightPanel>
    </div>
  </div>
</template>

<script>
import AppMain from "@/layout/components/AppMain";
import RightPanel from "@/layout/components/RightPanel";
import Sidebar from "@/layout/components/Sidebar";
import Navbar from "@/layout/components/Navbar";

export default {
  name: "layout",
  components: {Navbar, Sidebar, RightPanel, AppMain}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/mixin.scss";
@import "~@/assets/style/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
