// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import app from './index'

Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.use(app);
let j =0;
new Vue({
   el: '#app',
   methods: {
    onLoad: function(){
      var str = "";
      var num = 20;
      for (var i = 0 ; i < 20 ; i++) {
        str += '<li>'+ j++ +'</li>'
      }
      return Promise.resolve({num,str});
    },
    onRefresh: function(){
      console.log("Dfsfd")
      var str = "";
      var num = 20;
      for (var i = 0 ; i < 20 ; i++) {
          str += '<li>'+ j++ +'</li>'
      }
      return Promise.resolve({num,str});
    }
   }
});
