<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <!-- 显示叶子菜单 -->
    <template
        v-if="hasOnlyOneChild(item.children, item) && (!onlyOneMenu.children || onlyOneMenu.noShowingChild) && !item.alwaysShow">
      <app-link :to="resolvePath(onlyOneMenu.path)">
        <el-menu-item :index="resolvePath(onlyOneMenu.path)" :class="{'submenu-title-noDropdown': !isNest}">
          <item
              :title="onlyOneMenu.meta.title"
              :icon="onlyOneMenu.meta.icon"
          />
        </el-menu-item>
      </app-link>
    </template>
    <!-- 继续遍历子菜单 -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item :title="item.meta.title" :icon="item.meta.icon"/>
      </template>
      <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
          :is-nest="true"
          class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import Link from './Link';
import Item from './Item';
import {isExternal} from "@/utils/validate";

export default {
  name: 'SidebarItem',
  components: {
    'app-link': Link,
    Item
  },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneMenu: undefined
    }
  },
  methods: {
    /**
     * 判断该节点是否只拥有1个子节点
     * @param children 子节点数组
     * @param parent 当前节点
     * @returns {boolean} True：只有一个子节点或没有子节点 False：多于1个子节点
     */
    hasOnlyOneChild(children = [], parent) {
      let childList = children.filter(child => {
        if (child.hidden) {
          return false;
        }
        this.onlyOneMenu = child;
        return true;
      });
      // 如果该节点的可显示子节点数量为 1 则返回 True，且显示该子节点
      if (childList.length === 1) {
        return true;
      }
      // 如果该节点的可显示子节点数量为 0 则显示节点本身
      if (childList.length === 0) {
        this.onlyOneMenu = {...parent, path: '', noShowingChild: true};
        return true;
      }
      // 其他情况，节点数大于 1
      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    }
  }
}
</script>
