<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps()">
    <slot/>
  </component>
</template>

<script>
import {isExternal} from "@/utils/validate";

export default {
  name: "Link",
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    /**
     * 根据不同URL指定不同元素
     */
    linkProps() {
      let url = this.to;
      // 如果是外链则显示 a 标签
      if (isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank'
        }
      }
      // 不然则显示 router-link 标签
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
