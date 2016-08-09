<template>
    <div class="article showArticle">
        <div class="head">
            <span>
                <img :src="topic.author.avatar_url" alt="">
            </span>
            <span>
                <p>{{ topic.title }}</p>
                <p>
                   {{ topic.author.loginname }}发表于{{topic.create_at | timeago}}
                </p>
            </span>
            
        </div>
        <div class="weui_article content">
            {{{ topic.content }}}
        </div>
        <loadding :show="$loadingRouteData"></loadding>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                topic : {
                    author : {}
                }
            }
        },
        route : {
            data( transition ) {
                let id = this.$route.params.id;
                this.$root.show = true;
                $.ajax({
                    url : apiRoot + "topic/" + id,
                    dataType : 'json'
                }).done(function( data ){
                    transition.next({
                        topic : data.data
                    });
                }).always(() => {
                    this.$root.show = false;
                });
            }
        }
    }
</script>