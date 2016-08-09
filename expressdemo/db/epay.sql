/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2016/6/17 9:38:44                            */
/*==============================================================*/

drop database epay;
create database epay default charset utf8;
use epay;

/*==============================================================*/
/* Table: admin                                                 */
/*==============================================================*/
create table admin
(
   id                   int not null auto_increment,
   name                 varchar(50),
   pwd                  varchar(50),
   issuper              int,
   primary key (id)
);

/*==============================================================*/
/* Table: goods                                                 */
/*==============================================================*/
create table goods
(
   id                   int not null auto_increment,
   gname                varchar(50),
   price                numeric(10,2),
   img                  varchar(200),
   strock               int,
   info                 text,
   type                 int,
   admin                int,
   primary key (id)
);

/*==============================================================*/
/* Table: goodstype                                             */
/*==============================================================*/
create table goodstype
(
   id                   int not null auto_increment,
   typename             varchar(50),
   pid                  int,
   primary key (id)
);

drop table if exists news;

/*==============================================================*/
/* Table: news                                                  */
/*==============================================================*/
create table news
(
   nid                  int not null auto_increment,
   ntitle               varchar(500) not null,
   content              text,
   createtime           datetime,
   primary key (nid)
);

//初始化超级管理员
insert into admin values(default,'admin@yuanku.org','admin',0);