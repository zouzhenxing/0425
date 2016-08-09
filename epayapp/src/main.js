//引入支持包
import Vue from 'vue';
import vueRouter from 'vue-router';

//样式引入
import './css/weui.min.css';
import './css/style.css';
import './css/animate.css';

//jq引入
import jquery from './js/jquery-1.10.2.min.js';

//引入自定义组件
import home from './home.vue';
import login from './login.vue';
import listall from './components/listtopic.vue';
import showtopic from './showtopic.vue';
import loadding from './components/loadding.vue';

//全局配置
global.$ = jquery;
global.apiRoot = 'https://cnodejs.org/api/v1/';
$.crossDomain = true;

//定义全局过渡
Vue.transition('bounce', {
  enterClass: 'bounceInLeft',
  leaveClass: 'bounceOutRight'
})

//自定义过滤器
Vue.filter('reverse', function (value) {
    switch( value ) {
      case 'share': return '分享';
      case 'ask'  : return '问答';
      case 'job'  : return '招聘';
    }
})
//timeago过滤器
Vue.filter('timeago', function (value) {
    let diff = new Date().getTime() - new Date(value).getTime();
    if( diff < (60 * 1000) ) {
        return parseInt(diff / 1000) + "秒钟之前";
    } else if( diff < (60000 * 60) ) {
        return parseInt(diff / 60000) + "分钟之前";
    } else if( diff < (3600000 * 24) ) {
        return parseInt(diff / 3600000) + "小时之前";
    } else {
        return "long long ago";
    }
})
//注册全局loadding组件
Vue.component('loadding', loadding);

Vue.use(vueRouter);
var app = Vue.extend({
  data() {
    return {show:false}
  }
});
var router = new vueRouter();
router.map({
  '/login' : {
    component : login
  },
  '/home' : {
    component : home,
    subRoutes : {
      '/all' : {
        name : 'all',
        component : listall
      },
      '/share' : {
        name : 'share',
        component : listall
      },
      '/ask' : {
        name : 'ask',
        component : listall
      },
      '/good' : {
        name : 'good',
        component : listall
      },
      '/job' : {
        name : 'job',
        component : listall
      }
    }
  },
  '/topic/:id' : {
    component : showtopic
  }
});

router.beforeEach((transition) => {
  var tockn = sessionStorage.getItem("tockn");
  if( !tockn ) {

  }
});

router.go("/login");
router.start(app,"#app");