<template>
<div ref="scroll" v-bind:style="scrollComponent" @touchstart="onTouchStart($event)" @touchmove="onTouchMove($event)"  @touchend="onTouchEnd($event)" >
  <div v-show="upDivShow">
    {{upText}}
  </div>
  <ul ref="scrollUl" >
    <div  v-for="screenDom in screenDoms" :key="screenDom.id" v-html='screenDom.src'  ref="page">

    </div>
  </ul>
  <div  v-show="downDivShow">
    {{downText}}
  </div>
</div>

</template>
<script>
require('../raf.js')

let addId = 0;
let domCache = [];
export default {
  name: 'scroll',
  props: {
    height: '',
    upscroll: {
      default: 200
    },
    percentage: {
      default: 0.2
    },
    upHeight: {
      default: 500
    },
    downHeight: {
      default: 500
    },
    onload: Function,
    onrefresh: Function
  },
  data() {
    return {
      translate: 0,
      scrollHeight: this.height ? this.height + 'px' : '100vh',
      screenHeight: this.height ? this.height : document.documentElement.clientHeight,
      upDivShow: false,
      downDivShow: false,
      startY: 0,
      endY: 0,
      upText: '',
      downText: '',
      flag: false,
      screenDoms: [],
      begin: 0,
      end: 0,
      domHeight: 0
    }
  },
  computed: {
    scrollComponent: function () {
      return {
        height: this.scrollHeight,
        fontSize: '3rem',
        overflow: 'scroll',
        transform: 'translate(0,' + this.translate + 'px)'
      }
    }
  },
  created: function () {
       this.onload().then((resolve) => {
                  if (resolve.num == 0) {
                    this.downDivShow = true;
                    this.downText = '暂无数据';
                  } else {
                    this.screenDoms.push({ id: "page-" + addId, src: resolve.str});
                  }
                }).catch((e) => {
                  this.downText = '数据加载失败';
                  setTimeout(function () {
                     this.downDivShow = false;
                  }, 1000);
                });
  },
  methods: {
    getScrollTop: function () {
      return this.$refs.scroll.scrollTop;
    },
    onTouchStart(event) {
      this.startY = event.touches[0].clientY;
    },
    onTouchMove(event) {
      this.endY = event.touches[0].clientY;
      const per = (this.endY - this.startY) / this.screenHeight;
      const scrollTop = this.getScrollTop();
      if (!this.flag) {
        requestAnimationFrame(() => {
          if (per > 0 && scrollTop == 0 && this.onrefresh) {
            this.upDivShow = true;
            if (per >= this.percentage) {
              this.upText = '释放刷新';
            } else {
              this.upText = '下拉刷新';
            }
            this.translate = per * this.upHeight;
          }
          this.flag = false;
        })
        this.flag = true;
      }
    },
    onTouchEnd(event){
      let us = this;
      const scrollDom = us.$refs.scrollUl;
      const per = (us.endY - this.startY) / us.screenHeight;
      const scrollTop = us.getScrollTop();
      if(per > 0){
        if(scrollTop == 0 && us.onrefresh){
          if(per >= us.percentage){
            us.upText = "正在刷新...";
            us.onrefresh().then((resolve) => {
                  us.screenDoms.unshift({ id: "page-" + addId, src: resolve.str});
                  // let element = us.$refs.page[us.$refs.page.length-1];
                  // element.style.height = element.clientHeight +'px';
                 us.upText = '刷新成功,更新了' + resolve.num + '条数据';
                }).catch((e) => {
                  console.log("刷新错误" + e)
                  us.upText ='刷新失败...';
                  us.translate = 0;
                });

          }
           setTimeout(function () {
                  us.upDivShow = false;
                  us.translate = 0;
              }, 1000);
        }
      }else{
           if (this.$refs.scroll.scrollHeight -this.screenHeight - this.getScrollTop() <= this.downHeight) {
                this.onload().then((resolve) => {
                  if (resolve.num == 0) {
                    this.downDivShow = true;
                    this.downText = '加载完毕';
                  } else {
                    this.screenDoms.push({ id: "page-" + addId, src: resolve.str});
                    // let element = us.$refs.page[us.$refs.page.length-1];
                    // element.style.height = element.clientHeight +'px';
                  }
                }).catch((e) => {
                  this.downText = '加载失败';
                  setTimeout(function () {
                     this.downDivShow = false;
                  }, 1000);
                });
              }
      }
    }
  }
}
</script>
<style>
p {
  color: red;
}
</style>

