<template>
    <div class="weui_panel weui_panel_access">
        <div class="weui_panel_bd">
            <div class="weui_media_box weui_media_small_appmsg">
                <div class="weui_cells weui_cells_access">
                    <a class="weui_cell cellfont" href="javascript:;" v-link="{path:'/topic/'+topic.id}" v-for="topic in topics">
                        <div class="weui_cell_hd">
                            <img :src="topic.author.avatar_url" :alt="topic.author.loginname" style="width:40px;margin-right:5px;display:block">
                        </div>
                        <div class="weui_cell_bd weui_cell_primary">
                            <p>{{ topic.title }}</p>
                            <p class="cellinfo">
                                <span>
                                {{ topic.reply_count}}/{{topic.visit_count}}
                                </span>

                                <span>
                                {{ topic.tab | reverse }}
                                <font v-if="topic.good" style="color:green;">精</font>
                                <font v-if="topic.top" style="color:red;">顶</font>
                                </span>
                            </p>
                        </div>
                        <span class="weui_cell_ft"></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                listtype : '',
                topics : {},
                page : 1
            }
        },
        route : {
            data( transition ){
                let listtype = transition.to.name;
                let data = sessionStorage.getItem(listtype);
                //滚动事件
                $("#page").unbind().scroll(()=>{
                    if( $(window).height() + $("#page").scrollTop() >= $("#page .weui_panel").height() ) {
                        //下拉加载
                        this.loadData();
                    }
                    if( $("#page").scrollTop() <= 0 ) {
                        //上拉刷新
                        this.flush();
                    }
                });
                if( data ) {
                    return {
                        listtype : listtype,
                        topics : JSON.parse( data )
                    }
                } else {
                    this.$root.show = true;
                    $.ajax({
                        url : apiRoot + 'topics?tab=' + listtype,
                        type : 'get',
                        dataType : 'json'
                    }).done(( data ) => {
                        //缓存数据
                        sessionStorage.setItem(listtype,JSON.stringify(data.data));
                        transition.next({
                            listtype : listtype,
                            topics : data.data
                        });
                    }).always(() => {
                        this.$root.show = false;
                    });
                }
            },
            canReuse : () => {
                return false;
            }
        },
        methods : {
            loadData(){
                this.page ++;
                this.$root.show = true;
                $.ajax({
                    url : `${apiRoot}topics?tab=${this.listtype}&page=${this.page}`,
                    type : 'get',
                    dataType : 'json'
                }).done(( data ) => {
                    //缓存数据
                    this.topics = this.topics.concat(data.data);
                    sessionStorage.setItem(this.listtype,JSON.stringify(this.topics));
                    $("#page").scrollTop($("#page").scrollTop() + 200);
                }).always(() => {
                    this.$root.show = false;
                });
            },
            flush() {
                this.$root.show = true;
                $.ajax({
                    url : `${apiRoot}topics?tab=${this.listtype}`,
                    type : 'get',
                    dataType : 'json'
                }).done(( data ) => {
                    //缓存数据
                    this.topics = data.data;
                    sessionStorage.setItem(this.listtype,JSON.stringify(this.topics));
                }).always(() => {
                    this.$root.show = false;
                });
            }
        }
    }
</script>