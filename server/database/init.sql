create database if not exists remaid;

drop table if exists remaid.usercate;
drop table if exists remaid.user;
drop table if exists remaid.medcate;
drop table if exists remaid.category;
drop table if exists remaid.media;
drop table if exists remaid.place;
drop table if exists remaid.country;
drop table if exists remaid.region;

create table if not exists remaid.region (
  reg_id int not null auto_increment primary key,
  reg_name varchar(30)
);

create table if not exists remaid.country (
  cou_id int not null auto_increment primary key,
  cou_name varchar(30),
  reg_id int not null,
  FOREIGN KEY fk_coureg(reg_id)
  REFERENCES region(reg_id)
);

create table if not exists remaid.place (
  pla_id int not null auto_increment primary key,
  pla_name varchar(30),
  cou_id int not null,
  FOREIGN KEY fk_placou(cou_id)
  REFERENCES country(cou_id)
);

create table if not exists remaid.media (
  med_id int not null auto_increment primary key,
  med_title varchar(30),
  med_filepath varchar(50) not null,
  med_type varchar(5),
  med_year date,
  reg_id int,
  cou_id int,
  pla_id int,
  FOREIGN KEY fk_medreg(reg_id)
  REFERENCES region(reg_id),
  FOREIGN KEY fk_medcou(cou_id)
  REFERENCES country(cou_id),
  FOREIGN KEY fk_medpla(pla_id)
  REFERENCES place(pla_id)
);

create table if not exists remaid.category (
  cate_id int not null auto_increment primary key,
  cate_name varchar(15) not null
);

create table if not exists remaid.medcate (
  medcate_id int not null auto_increment primary key,
  cate_id int not null,
  med_id int not null,
  FOREIGN KEY fk_medcatecate(cate_id)
  REFERENCES category(cate_id),
  FOREIGN KEY fk_medcatemed(med_id)
  REFERENCES media(med_id)
);

create table if not exists remaid.user (
  user_id int not null auto_increment primary key,
  user_name varchar(15) not null
);

create table if not exists remaid.usercate (
  usercate_id int not null auto_increment primary key,
  cate_id int not null,
  user_id int not null,
  usercate_weight int not null,
  FOREIGN KEY fk_usercatecate(cate_id)
  REFERENCES category(cate_id),
  FOREIGN KEY fk_usercateuser(user_id)
  REFERENCES user(user_id)
);

insert into region(reg_name) values ("UK");
insert into country(cou_name, reg_id) values ("England", 1);

insert into media(med_title, med_filepath, med_type, med_year, med_category, reg_id, cou_id) values ("queen", "photo\Queen.png", "photo", "band", 1980-01-01, 1, 1);

insert into category(cate_name) values ("band");

insert into medcate(cate_id, med_id) values (1, 1);
