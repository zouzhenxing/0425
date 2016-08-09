<template>
    <div id="page" class="page" >
        <router-view class="animated" transition="bounce" transition-mode="out-in"></router-view>
        <div class="weui_tabbar">
            <a href="javascript:;" v-link="{path:'/home/all',activeClass:'weui_bar_item_on'}"  class="weui_tabbar_item">
                <div class="weui_tabbar_icon">
                    <img src="img/5.png" alt="">
                </div>
                <p class="weui_tabbar_label">全部</p>
            </a>
            <a href="javascript:;" v-link="{path:'/home/share',activeClass:'weui_bar_item_on'}" class="weui_tabbar_item">
                <div class="weui_tabbar_icon">
                    <img src="img/17.png" alt="">
                </div>
                <p class="weui_tabbar_label">分享</p>
            </a>
            <a href="javascript:;" v-link="{path:'/home/ask',activeClass:'weui_bar_item_on'}" class="weui_tabbar_item">
                <div class="weui_tabbar_icon">
                    <img src="img/18.png" alt="">
                </div>
                <p class="weui_tabbar_label">问答</p>
            </a>
            <a href="javascript:;" v-link="{path:'/home/good',activeClass:'weui_bar_item_on'}" class="weui_tabbar_item">
                <div class="weui_tabbar_icon">
                    <img src="img/19.png" alt="">
                </div>
                <p class="weui_tabbar_label">精华</p>
            </a>
            <a href="javascript:;" v-link="{path:'/home/job',activeClass:'weui_bar_item_on'}" class="weui_tabbar_item">
                <div class="weui_tabbar_icon">
                    <img src="img/20.png" alt="">
                </div>
                <p class="weui_tabbar_label">招聘</p>
            </a>
        </div>
    </div>
</template>