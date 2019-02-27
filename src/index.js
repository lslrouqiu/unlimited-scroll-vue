import scroll from './components/scroll.vue';

function install(Vue) {
  if (install.installed) {
    return;
  }
  install.installed = true;
  Vue.component('scroll-component', scroll);
}

const VueTest = {
  install
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueTest);
}

export default VueTest;


