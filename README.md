# 0425
0425期前端开发班上课案例

## 1week
--第一课复习
html css 盒子模型 flex
html5 css3
javascript基础
jquery
less
bootstarp
结构html
显示css
动作js

--js


--浏览器
UI解析内核：
webkit
moz
ms
JavaScript解析内核：
V8 运行环境
--浏览器解析时序
浏览器按代码的顺序对html + css + js进行解析
alert()函数阻塞了浏览器析
一个窗口是一个单线程
webwork解析浏览器端多线程问题


--JavaScript面向对象编程
对象：拥有属性和方法结构体，称之为对象。属性和方法属于谁的
域：范围

JavaScript如何定义一个对象
Json:javascript object native
new
基本：int float string 
对象：date array function 
{
   变量名 : 值
}
this关键字函数调用者,范围的概念，也就是函数执行的上下文环境


--github是一个存放开源代码的网站
git是本地版本管理工具
github是一个网站

git init  初始化git版本库
git add * 将修改文件增加到暂存区
git commit -m 提交文件到版本库
git reset --hard ... 回退到某个版本库
git remote add 连接名 git地址

git fetch origin 从远程库版本号
git pull origin master 拉取远程库中master分支的数据
git clone https://github.com/yuankuorg/test.git 复制github库 
git push origin master 将本地库中的修改推送到服务器

vi test.txt 新增或修改test.txt文件
a 修改test.txt文件
esc : wq修改并保存

面向对象的三个基本概念

现实世界中，先有对象，对对象进行抽象，形成了一个概念叫类(型)
OOP三要素
对象
类
抽象

OOP三特征
封装性
继承 : 是类和类一种关系，是一个
多态 : 调用同一个方法，产生不同的结果，称之种现象为多态
       动态绑订 继承和方法的覆盖

代码不仅有封装性
还具备可扩展性

基类  派生类
父类->子类

JavaScript数据类型以及判订
typeof  : 查看基本类型
ins.... : 判断对象是否属于某个类型

==数据相等性
基本数据类型比较是向上转型后的值
对象类型比较的是指向内存的地址

对象的生命周期
1、加载类(网络加载,解析文件,创建类对象)
2、创建对象(new 关键字创建对象空间，()调用类的构造函数,新建一个c变量空间，将new关键返回的地址存放到c变量空间中,对象中的__proto__指向类的原型)
3、使用对象(c. 对象访问操作符)
4、对象回收(他杀 垃圾回收(v8))
垃圾回收算法(标记-清除 复制-清除)
当对象没有人使用时，对象会被垃圾回收回收掉
var c = new clock();


--DOM:document object module文档对象模型(w3c)
DOM:由w3c规范的(类)接口
html
浏览器的UI解析器会将每一个html元素解析成一个对象
学习dom规范类的属性和方法

DOM类型
Node：attributes  对节点的操作
NameNodeMap
Attr

Element类
Document类

Node分为两种，一种是文本节点，一种元素节点
文本节点才有nodeValue
元素节点没有nodeValue

程序员,类=代码

在计算机世界中，先有类，再根据类创建对象。
类
对象: 内存

在JavaScript中，一个类就是一个函数，称之为类函数。
类的属性和方法存放在函数对象的prototype(原型)对象中

--JavaScript模块化
AMD : 异步模块加载机制 (浏览器)
CMD : 公共模块加载机制 (nodejs)

--闭包：在函数的外部可以访问函数内部的属性和方法
优点：解决代码之间的命名冲突的问题，闭包中的对象和方法都是缓存中内存中的
缺点：有可能产生内存泄露的问题

在javascript中只要不是以function开头的，都认为是函数的表达式
defind(name,require,factory) AMD

--myjq的实现

--最后项目，购物车实现