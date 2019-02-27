# 使用方法
## index.html:
    <div id="app">
        <scroll-component :onload="onLoad" :onrefresh="onRefresh"></scroll-component>  //参数通过props传递， onload下拉加载函数，onrefresh上拉刷新函数，height元素高度


    </div>
## index.js:
    import app from './app/index.js'; //引入插件文件

    Vue.use(app); //注册插件
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
