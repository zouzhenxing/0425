require("./css/epay.css");
require("./css/animate.css");

global.Vue = require("./js/vue.js");
var navepay = require("./components/navepay.js");
var epayconent = require("./components/epayconent.js");

var vm = new Vue({
    el : "#app",
    components : {
        'home' : epayconent,
        'goods': epayconent,
        'order': epayconent,
        'me' : epayconent,
        'navepay' : navepay,
    },
    data : {
        isshow : 'home',
        istrans : false
    },
    computed : {
        name : function() {
            switch(this.isshow) {
                case 'home': return "主页"
                case 'goods': return "商品"
                case 'order': return "订单"
                case 'me': return "我的"
            }
        }
    },
    methods : {
        change : function( msg ) {
            if( !this.istrans ) {
                this.isshow = msg;    
            }
        }
    }
});