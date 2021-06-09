<template>
  <div>
    <svg-icon v-if="icon" :icon-class="icon"></svg-icon>
    <span v-if="title">{{ title }}</span>
  </div>
</template>
<script>
import SvgIcon from "@/components/SvgIcon";

export default {
  name: 'MenuItem',
  components: {SvgIcon},
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
