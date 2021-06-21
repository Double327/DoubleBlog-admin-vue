import Vue from 'vue';

// 引入组件
import SvgIcon from '@/components/SvgIcon';

// 注册SvgIcon组件并更名为svg-icon
Vue.use('svg-icon', SvgIcon);

const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req)
