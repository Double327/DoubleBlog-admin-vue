<template>
  <div class="app-wrapper" :class="classObj">

    <div class="drawer-bg"/>
    <!--侧边栏导航-->
    <sidebar class="sidebar-container"/>
    <!--页面容器-->
    <div class="main-container">
      <!--顶部导航、设置-->
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
import {mapState} from 'vuex';

export default {
  name: "layout",
  components: {Navbar, Sidebar, RightPanel, AppMain},
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,

    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  }
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

  &.mobil.openSidebar {
    position: fixed;
    top: 0;
  }
}

//.drawer-bg {
//  background: #000;
//  opacity: 0.3;
//  width: 100%;
//  top: 0;
//  height: 100%;
//  position: absolute;
//  z-index: 999;
//}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.5s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}

.main-container {
}
</style>
