(function( global,factory ){
	factory(global);
}( window,function( global ){
var fn = function( obj ){
	var that = this;
	this.shopcar = obj;
	obj.get(0).ondragover = function( event ) {
		event.preventDefault();
	}
	obj.get(0).ondrop = function( event ) {
		that.add(JSON.parse(event.dataTransfer.getData("obj")));
	}
	
	obj.find(".removeAll").click(function() {
		$(".list-group input[type=checkbox]:checked").parents(".list-group-item").each(function(){
			that.remove($(this));
		});
		that.total();
	});
}

//公开的方法
fn.prototype.products = {};
fn.prototype.add = function( option ) {
	if( this.products[option.id] ) {
		this._addMove( this.shopcar.find("[data-id=" + option.id + "]") );
		this.products[option.id].count ++;
	} else {
		this.products[option.id] = this.createProduct(option);
	}
	
	this.total();
	
	return this;
}
fn.prototype.createProduct = function( obj ) {
	var item = $('<li class="list-group-item animated" data-id='+ obj.id +'>' + 
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
	this.shopcar.find(".list-group").prepend(item);
	item.addClass("bounceIn");
	this._bind(item);
	
	obj.count = 1;
	return obj;
}
fn.prototype.remove = function( item ) {
	delete this.products[item.data("id")];
	this._removeMove(item).total();
	
	return this;
}
fn.prototype.total = function() {
	var total = temp = 0;
	for( var key in this.products ) {
		temp = this.products[key];
		total += temp.price * temp.count;
	}
	
	this.shopcar.find(".totalprice").html("&yen;" + total.toFixed(2));
	
	return this;
}

//私有的方法
fn.prototype._addMove = function( item ) {
	item.find(".badge").html(function(){
		return parseInt($(this).html()) + 1;
	});
	
	item.append("<p class='addMove'>+1</p>").find(".addMove").animate({
		top : "-50px",
		opacity : 0
	},500,"swing",function(){
		$(this).remove();
	});
	
	return this;
}
fn.prototype._reduceMove = function( item ) {
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
	
	return this;
}
fn.prototype._removeMove = function( item ) {
	item.queue('out',function(){
		$(this).removeClass("bounceIn").addClass("bounceOut");
	}).delay(800,'out').queue('out',function(){
		$(this).remove();
	}).dequeue('out').dequeue('out');
	
	return this;
}
fn.prototype._bind = function( item ) {
	var that = this;
	item.find(".add").unbind().click(function(){
		that.products[item.data("id")].count ++;
		that._addMove(item).total();
	});
	
	item.find(".reduce").unbind().click(function(){
		that.products[item.data("id")].count <= 0 ? 0 : that.products[item.data("id")].count --;
		that._reduceMove(item).total();
	});
	
	item.find(".glyphicon-trash").unbind().click(function(){
		that.remove(item);
	});
}

global.shopcar = fn;
}));