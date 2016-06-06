$(function(){
	$(".thumbnail .btn-success").click(function(){
//		; //将json字符串转json对象，反序列化
//		JSON.stringify(); //序列化 json对象转成json字符串
		add($(this).parents(".thumbnail").data("obj"));
	});
	
	$(".shopcar .removeAll").click(function(){
		$(".list-group input[type=checkbox]:checked").parents(".list-group-item").each(function(){
			$(this).queue('out',function(){
				$(this).removeClass("bounceIn").addClass("bounceOut");
			}).delay(800,'out').queue('out',function(){
				$(this).remove();
			}).dequeue('out').dequeue('out');
		});
	});
	
	$(".thumbnail").get().map(function( obj,i ){
		obj.ondragstart = function( event ){
			event.dataTransfer.setData("obj",JSON.stringify($(event.target).data("obj")));
		}
	});
	
	$(".shopcar").get(0).ondragover = function( event ) {
		event.preventDefault();//清除默认效果
	}
	$(".shopcar").get(0).ondrop = function( event ) {
		add( JSON.parse(event.dataTransfer.getData("obj")) );
	}
});

var products = {}
function add( obj ) {
	if( products[obj.id] ) {
		addMove( products[obj.id] );
	} else {
		var item = $('<li class="list-group-item animated">' + 
			'<span class="badge">1</span>' +
			'<h4 class="list-group-item-heading">' + obj.name + '</h4>' + 
			'<p class="list-group-item-text">' + 
				'<input type="checkbox" name="item" id="" value="" />&nbsp;' +
				'<img src="' + obj.img +'"/>&nbsp;' +
				'<span class="money">&yen;' + obj.price + '</span>&nbsp;' +
				'<span class="btn btn-default add">+</span>&nbsp;' +
				'<span class="btn btn-default reduce">-</span>&nbsp;' +
				'<span class="btn btn-default glyphicon glyphicon-trash"></span>' +
			'</p>' +
		'</li>');
		$(".shopcar .list-group").prepend(item);
		item.addClass("bounceIn");
		bind(item);
		
		products[obj.id] = item;
	}
}

function bind( item ) {
	item.find(".add").unbind().click(function(){
		addMove($(this).parents(".list-group-item"));
	});
	
	item.find(".reduce").unbind().click(function(){
		var item = $(this).parents(".list-group-item");
		item.find(".badge").html(function(){
			var num = parseInt($(this).html());
			return num <= 0 ? 0 : num - 1;
		});
		
		item.append("<p class='reduceMove'>+1</p>").find(".reduceMove").animate({
			bottom : "-50px",
			opacity : 0
		},500,"swing",function(){
			$(this).remove();
		});
	});
	
	item.find(".glyphicon-trash").unbind().click(function(){
		$(this).parents(".list-group-item").queue('out',function(){
			$(this).removeClass("bounceIn").addClass("bounceOut");
		}).delay(800,'out').queue('out',function(){
			$(this).remove();
		}).dequeue('out').dequeue('out');
//		var item = $(this).parents(".list-group-item");
//		item.removeClass("bounceIn").addClass("bounceOut");
//		
//		setTimeout(function(){
//			item.remove();
//		},800);
	});
}

function addMove( item ) {
	item.find(".badge").html(function(){
		return parseInt($(this).html()) + 1;
	});
	
	item.append("<p class='addMove'>+1</p>").find(".addMove").animate({
		top : "-50px",
		opacity : 0
	},500,"swing",function(){
		$(this).remove();
	});
}
