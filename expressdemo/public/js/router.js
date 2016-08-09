$(function(){
    //创建路由管理器
    var router = new Router({
        container : "#content",
        enter : "bounceIn",
        enterTimeout : 750
        // leave : "bounceOut",
        // leaveTimeout : 750
    });

    var home = {
        url : "/",
        className : 'animated',
        render : function() {
            return '<h1>欢迎来到epay后台管理</h1>'
        }
    }
    var logout = {
        url : "/logout",
        render : function() {
            $._ajax({
                url : '/login/logout'
            }).done(function( data ){
                if( data.success ) {
                    window.location = "/index.html";
                }
            });
        }
    }
    var admin = {
        url : "/admin",
        className : 'animated',
        render : function() {
            var d = $.Deferred();
            $._ajax({
                url : '/admin/admin',
                dataType : 'text'
            }).done(function( html ){
                d.resolve(html);
            }).fail(function( err ) {
                d.reject(err);
            });

            return d.promise();
        },
        bind : function() {
            //找到所有选中的checkbox
            $("#delAll").click(function(){
                var ids = [];
                $(".table tbody input[type=checkbox]:checked").each(function(i,v){
                    ids.push(v.value);
                });

                $._ajax({
                    url : '/admin/admin',
                    type : 'delete',
                    data : {ids:ids.join(',')}
                }).done(function( obj ){
                    if( obj.success ) {
                        router.go("/admin");
                    } else {
                        $.alt({
                            type : 'danger',
                            msg : obj.msg,
                            el : '#message'
                        });
                    }
                });
            });
        }
    }
    var goAdmin = {
        url : "/goAddAdmin/:id",
        className : 'animated',
        render : function() {
            var d = $.Deferred();
            $._ajax({
                url : '/admin/admin',
                type : 'put',
                dataType : 'text',
                data : {id:this.params.id}
            }).done(function( html ){
                d.resolve(html);
            }).fail(function( err ) {
                d.reject(err);
            });

            return d.promise();
        },
        bind : function() {
            $(".form-horizontal").submit(function(){
                var flag = true;

                if( $.validate.isEmail($("#username").val()) ) {
                    $("#username").parents(".form-group").removeClass("has-error has-feedback").addClass("has-success has-feedback");
                    $("#username").next().removeClass("glyphicon glyphicon-remove form-control-feedback").addClass("glyphicon glyphicon-ok form-control-feedback");
                } else {
                    flag = false;
                    $("#username").parents(".form-group").removeClass("has-success has-feedback").addClass("has-error has-feedback");
                    $("#username").next().removeClass("glyphicon glyphicon-ok form-control-feedback").addClass("glyphicon glyphicon-remove form-control-feedback");
                }

                if( $("#password").val().length >= 6 ) {
                    $("#password").parents(".form-group").removeClass("has-error has-feedback").addClass("has-success has-feedback");
                    $("#password").next().removeClass("glyphicon glyphicon-remove form-control-feedback").addClass("glyphicon glyphicon-ok form-control-feedback");
                } else {
                    flag = false;
                    $("#password").parents(".form-group").removeClass("has-success has-feedback").addClass("has-error has-feedback");
                    $("#password").next().removeClass("glyphicon glyphicon-ok form-control-feedback").addClass("glyphicon glyphicon-remove form-control-feedback");
                }
                
                if( $("#repwd").val() != $("#password").val() ) {
                    flag = false;
                    $("#password").parents(".form-group").removeClass("has-success has-feedback").addClass("has-error has-feedback");
                    $("#password").next().removeClass("glyphicon glyphicon-ok form-control-feedback").addClass("glyphicon glyphicon-remove form-control-feedback");
                    $("#repwd").parents(".form-group").removeClass("has-success has-feedback").addClass("has-error has-feedback");
                    $("#repwd").next().removeClass("glyphicon glyphicon-ok form-control-feedback").addClass("glyphicon glyphicon-remove form-control-feedback");
                }

                if( flag ) {
                    var add = {
                        url : '/admin/admin',
                        type : 'post',
                        data : {id:$("#aid").val(),"username":$("#username").val(),"password":$("#password").val()}
                    }
                    
                    $._ajax(add).done(function( obj ){
                        if( obj.success ) {
                            router.go("/admin");
                        } else {
                            $.alt({
                                type : 'danger',
                                msg : obj.msg,
                                el : '#message'
                            });
                        }
                    });
                }
                return false;
            });
        }
    }
    var delAdmin = {
        url : '/delAdmin/:id',
        className : 'animated',
        render : function() {
            $._ajax({
                url : "/admin/admin",
                type : 'delete',
                data : {id:this.params.id}
            }).done(function( obj ){
                if( obj.success ) {
                    router.go("/admin");
                } else {
                    $.alt({
                        type : 'danger',
                        msg : obj.msg,
                        el : '#message'
                    });
                }
            });
        }
    }
    
    var types = {
        url : '/types',
        className : 'animated',
        render : function() {
            var d = $.Deferred();
            $._ajax({
                url : '/admin/types',
                dataType : 'text'
            }).done(function( html ){
                d.resolve(html);
            }).fail(function( err ){
                d.reject(err);
            });

            return d.promise();
        }
    }
    var goAddType = {
        url : "/goAddType/:id",
        className : 'animated',
        render : function() {
            var d = $.Deferred();
            $._ajax({
                url : "/admin/types",
                type : 'put',
                dataType : 'text',
                data : {id:this.params.id}
            }).done(function( html ){
                d.resolve(html);
            }).fail(function( err ){
                d.reject(err);
            });

            return d.promise();
        },
        bind : function() {
            $("#addtype").submit(function(){
                $._ajax({
                    url : '/admin/types',
                    type : 'post',
                    data : {typename:$("#typename").val(),pid:$("#pid").val()}
                }).done(function( obj ){
                    if( obj.success ) {
                        router.go("/types");
                    } else {
                         $.alt({
                            type : 'danger',
                            msg : obj.msg,
                            el : '#message'
                        });
                    }
                });

                return false;
            });
        }
    }

    var goods = {
        url : "/goods",
        className : 'animated',
        render : function() {
            var d = $.Deferred();

            $._ajax({
                url : "/admin/goods",
                dataType : "html"
            }).done(function( html ){
                d.resolve(html);
            }).fail(function( err ){
                d.reject(err);
            });

            return d.promise();
        }
    }
    var goAddGoods = {
        url : "/goAddGoods/:id",
        className : 'animated',
        render : function() {
            var d = $.Deferred();
            $._ajax({
                url : '/admin/goods',
                type : 'put',
                data : {id:this.params.id},
                dataType : 'text'
            }).done(function( html ){
                d.resolve(html);
            }).fail(function( err ){
                d.reject(err);
            });

            return d.promise();
        },
        bind : function() {
            $("#addgoods").submit(function(){
                var file = $("#img").get(0).files[0];
                //文件类型和文件大小
                if( /^image.*/.test(file.type) == false ) {
                    $.alt({
                        type : 'warning',
                        msg : '只能上传图片!',
                        el : "#message"
                    });

                    return false;
                }
                if( file.size > 1024 * 512 ) {
                    $.alt({
                        type : 'warning',
                        msg : '只能上传小于512k的文件!',
                        el : "#message"
                    });

                    return false;
                }

                var data = new FormData();
                data.append("gname",$("#gname").val());
                data.append("price",$("#price").val());
                data.append("img",file);
                data.append("strock",$("#strock").val());
                data.append("type",$("#type").val());
                data.append("info",$("#info").val());

                $._ajax({
                    url : "/admin/goods",
                    type : 'post',
                        cache: false,
                        processData: false,
                        contentType: false,
                        data : data
                }).done(function( obj ){
                    if( obj.success ) {
                        router.go("/goods");
                    } else {
                         $.alt({
                            type : 'danger',
                            msg : obj.msg,
                            el : '#message'
                        });
                    }
                });
                return false;
            });

            $("#img").change(function(){
                //预览图片
                var fr = new FileReader();
                fr.readAsDataURL($(this).get(0).files[0]);
                fr.onload = function( data ) {
                    $("#preshow").attr("src",this.result);
                }
            });
        }
    }

    var news = {
        url : '/news',
        className : 'animated',
        render : function() {
            var d = $.Deferred();
            $._ajax({
                url : '/admin/news',
                dataType : 'text'
            }).done(function( html ){
                d.resolve(html);
            }).fail(function( err ){
                d.reject(err);
            });

            return d.promise();
        }
    }
    var newsadd = {
        url : '/newsadd/:id',
        className : 'animated',
        render : function() {
            var d = $.Deferred();
            $._ajax({
                url : "/admin/news",
                type : 'put',
                dataType : 'html'
            }).done(function( html ){
                d.resolve(html);
            }).fail(function(err) {
                d.reject(err);
            });

            return d.promise();
        },
        bind : function() {
            var mditor = new Mditor("#editor",{
                height:300,
                fixedHeight:true
            });

            $("#addnews").submit(function(){
                $._ajax({
                    url : "/admin/news",
                    type : "post",
                    data : {"title":$("#title").val(),"content":$("#editor").val()}
                }).done(function( obj ) {
                    if( obj.success ) {
                        router.go("/news");
                    } else {
                         $.alt({
                            type : 'danger',
                            msg : obj.msg,
                            el : '#message'
                        });
                    }
                });

                return false;
            });
        }
    }
    var preview = {
        url : '/news/preview/:nid',
        className : 'animated',
        render : function() {
            var d = $.Deferred();
            $._ajax({
                url : '/admin/news/' + this.params.nid,
                dataType : 'text'
            }).done(function( html ){
                var p = new Parser();
                d.resolve(p.parse(html));
            }).fail(function(err) {
                d.reject(err);
            });

            return d.promise();
        }
    }

    router.push(home).push(logout)
          .push(admin).push(goAdmin)
          .push(delAdmin)
          .push(types).push(goAddType)
          .push(goods).push(goAddGoods)
          .push(news).push(newsadd).push(preview)
          .setDefault("/").init();
});