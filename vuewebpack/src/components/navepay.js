'use strict';

var template = `<nav>
            <ul>
                <li>
                    <a @click="change('home')" href="javascript:;">
                        <img src="img/17.png" alt="">
                        <p>主页</p>
                    </a>
                </li>
                <li>
                    <a @click="change('goods')" href="javascript:;">
                        <img src="img/18.png" alt="">
                        <p>商品</p>
                    </a>
                </li>
                <li>
                    <a @click="change('order')" href="javascript:;">
                        <img src="img/19.png" alt="">
                        <p>订单</p>
                    </a>
                </li>
                <li>
                    <a @click="change('me')" href="javascript:;">
                        <img src="img/20.png" alt="">
                        <p>我的</p>
                    </a>
                </li>
            </ul>
        </nav>`;

var navepay = Vue.extend({
    template : template,
    methods : {
        change : function( msg ) {
            this.$dispatch('change',msg);
        }
    }
});

module.exports = navepay;