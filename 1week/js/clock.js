(function( global ,factory ){
	factory( global );
}( window,function( global ){
	var clock = function(){}
	clock.prototype.init = function( id ) {
		this.divobj = document.getElementById(id);
		this.divobj.setAttribute("class","clock");
		
		this.pan = document.createElement("img");
		this.hh = document.createElement("img");
		this.mi = document.createElement("img");
		this.ss = document.createElement("img");
		
		this.pan.src = "img/表盘.png";
		this.hh.src = "img/时针.png";
		this.hh.setAttribute("class","hh");
		this.mi.src = "img/分针.png";
		this.mi.setAttribute("class","mi");
		this.ss.src = "img/秒针.png";
		this.ss.setAttribute("class","ss");
		
		this.divobj.appendChild(this.pan);
		this.divobj.appendChild(this.hh);
		this.divobj.appendChild(this.mi);
		this.divobj.appendChild(this.ss);
		
		setInterval(fncall(this.run,this,null),1000);
		return this;
	}
	clock.prototype.getDate = function() {
		return new Date();
	}
	clock.prototype.run = function() {
		var d = this.getDate();
		this.hh.style.transform = "rotate(" + ((d.getHours() * 30 - 90) + (d.getMinutes() / 2)) + "deg)";
		this.mi.style.transform = "rotate(" + (d.getMinutes() * 6 - 90) + "deg)";
		this.ss.style.transform = "rotate(" + (d.getSeconds() * 6 - 90) + "deg)";
	}
	
	//委托解决this域的问题
	var fncall = function( fn,obj,args ) { //委托函数 fn函数本身 obj函数调用者 args表示函数的参数
		return function() {
			fn.apply(obj,args);
		}
	}
	
	//工厂模式 对对象进行了加工
	var factory = function( id ) {
		var c = new clock();
		if( factory[id] ) {
			for(var key in factory[id]) {
				c[key] = factory[id][key];
			} 
		}
		return c.init(id);
	}
	factory.extend = function( id,obj ) {
		factory[id] = obj;
	}
	factory.extend("newyourk",{
		getDate : function() {
			var d = new Date();
			d = new Date(d.getTime() + (d.getTimezoneOffset() * 60 * 1000) - (5 * 60 * 60 * 1000));
			return d;
		}
	})
	
	global.$ = factory;
}))

//函数与函数指针的区别
//函数定义 编译绑订(静态绑订)
//			function run() {
//				var d = new Date();
//				var hh = document.getElementById("hh");
//				var mi = document.getElementById("mi");
//				var ss = document.getElementById("ss");
//				
//				hh.style.transform = "rotate(" + (d.getHours() * 30 - 90) + "deg)";
//				mi.style.transform = "rotate(" + (d.getMinutes() * 6 - 90) + "deg)";
//				ss.style.transform = "rotate(" + (d.getSeconds() * 6 - 90) + "deg)";
//			};

//函数表达式(运行绑订)
//var run = function() {
//	var d = new Date();
//	var hh1 = document.getElementById("hh1");
//	var mi1 = document.getElementById("mi1");
//	var ss1 = document.getElementById("ss1");
//	
//	var hh2 = document.getElementById("hh2");
//	var mi2 = document.getElementById("mi2");
//	var ss2 = document.getElementById("ss2");
//	
//	hh1.style.transform = "rotate(" + ((d.getHours() * 30 - 90) + (d.getMinutes() / 2)) + "deg)";
//	mi1.style.transform = "rotate(" + (d.getMinutes() * 6 - 90) + "deg)";
//	ss1.style.transform = "rotate(" + (d.getSeconds() * 6 - 90) + "deg)";
//	
//	var d = new Date(d.getTime() + (d.getTimezoneOffset() * 60 * 1000) - (5 * 60 * 60 * 1000));
//	hh2.style.transform = "rotate(" + ((d.getHours() * 30 - 90) + (d.getMinutes() / 2)) + "deg)";
//	mi2.style.transform = "rotate(" + (d.getMinutes() * 6 - 90) + "deg)";
//	ss2.style.transform = "rotate(" + (d.getSeconds() * 6 - 90) + "deg)";
//};

//var beijiclock = {
//	hh : 0,
//	mi : 0,
//	ss : 0,
//	colck : 0,
//	init : function() {
//		this.colck = document.getElementById("beijin");
//		//this关键表示谁调用了此函数，在调用函数时才确定函数的调用者。称这种方式为动态绑订
//		this.hh = this.colck.getElementsByClassName("hh")[0];
//		this.mi = this.colck.getElementsByClassName("mi")[0];
//		this.ss = this.colck.getElementsByClassName("ss")[0];
//		
////		setInterval(fncall(this.run,this,null) ,1000);
//		var that = this;
//		setInterval(function() {
//			that.run();
//		},1000);//闭包
//		return this;
//	},
//	run : function() {
//		var d = new Date();
//		this.hh.style.transform = "rotate(" + ((d.getHours() * 30 - 90) + (d.getMinutes() / 2)) + "deg)";
//		this.mi.style.transform = "rotate(" + (d.getMinutes() * 6 - 90) + "deg)";
//		this.ss.style.transform = "rotate(" + (d.getSeconds() * 6 - 90) + "deg)";
//	}
//}
//
//var newyourkclock = {
//	hh : 0,
//	mi : 0,
//	ss : 0,
//	colck : 0,
//	init : function() {
//		this.colck = document.getElementById("newyourk");
//		//this关键表示谁调用了此函数，在调用函数时才确定函数的调用者。称这种方式为动态绑订
//		this.hh = this.colck.getElementsByClassName("hh")[0];
//		this.mi = this.colck.getElementsByClassName("mi")[0];
//		this.ss = this.colck.getElementsByClassName("ss")[0];
//		
//		window.setInterval(fncall(this.run,this,null),1000);
//		return this;
//	},
//	run : function() {
//		var d = new Date();
//		d = new Date(d.getTime() + (d.getTimezoneOffset() * 60 * 1000) - (5 * 60 * 60 * 1000));
//		this.hh.style.transform = "rotate(" + ((d.getHours() * 30 - 90) + (d.getMinutes() / 2)) + "deg)";
//		this.mi.style.transform = "rotate(" + (d.getMinutes() * 6 - 90) + "deg)";
//		this.ss.style.transform = "rotate(" + (d.getSeconds() * 6 - 90) + "deg)";
//	}
//}