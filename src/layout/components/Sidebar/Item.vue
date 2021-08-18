<script>
export default {
  name: "Item",
  functional: true,
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const {title, icon} = context.props;

    let vNodes = []
    if (icon) {
      vNodes.push(<svg-icon icon-class={icon}/>)
    }
    if (title) {
      vNodes.push(<span slot="title">{(title)}</span>)
    }
    return vNodes;
  }
}
</script>

<style scoped>

</style>
