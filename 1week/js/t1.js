(function( global,factory ){
	factory(global);
}( window,function( global ){
	var myjq = function( obj ) {
		if( obj instanceof HTMLElement ) {
			this.dom = obj;
		} else {
			this.dom = document.getElementById(obj);
		}
	}
	
	var factory = function( obj ) {
		return new myjq(obj);
	}
	
	factory.extend = myjq.prototype.extend = function( obj ) {
		for(var key in obj) {
			this[key] = obj[key];
		}
	}
	
	myjq.prototype.extend({
		click : function(fn) {
			this.dom.onclick = fn;
			return this;
		},
		show : function() {
			this.dom.setAttribute("class","show");
			return this;
		},
		hide : function() {
			this.dom.setAttribute("class","hide");
			return this;
		},
		val : function( value ) {
			if( value ) {
				this.dom.innerHTML = value;
				return this;
			} else {
				return this.dom.innerHTML;
			}
		}
	});
	
	factory.fn = myjq.prototype;
	global.$ = factory;
}))