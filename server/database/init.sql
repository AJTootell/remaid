drop table if exists rdc01hn4hfiuo1rv.usercate;
drop table if exists rdc01hn4hfiuo1rv.usermed;
drop table if exists rdc01hn4hfiuo1rv.user;
drop table if exists rdc01hn4hfiuo1rv.medcate;
drop table if exists rdc01hn4hfiuo1rv.category;
drop table if exists rdc01hn4hfiuo1rv.media;
drop table if exists rdc01hn4hfiuo1rv.place;
drop table if exists rdc01hn4hfiuo1rv.country;
drop table if exists rdc01hn4hfiuo1rv.region;

create table if not exists rdc01hn4hfiuo1rv.region (
  reg_id int not null auto_increment primary key,
  reg_name varchar(30)
);

create table if not exists rdc01hn4hfiuo1rv.country (
  cou_id int not null auto_increment primary key,
  cou_name varchar(30),
  reg_id int not null,
  FOREIGN KEY fk_coureg(reg_id)
  REFERENCES region(reg_id)
);

create table if not exists rdc01hn4hfiuo1rv.place (
  pla_id int not null auto_increment primary key,
  pla_name varchar(30),
  cou_id int not null,
  FOREIGN KEY fk_placou(cou_id)
  REFERENCES country(cou_id)
);

create table if not exists rdc01hn4hfiuo1rv.media (
  med_id int not null auto_increment primary key,
  med_title varchar(30),
  med_filepath varchar(50) not null,
  med_alt varchar(50),
  med_type varchar(7),
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

create table if not exists rdc01hn4hfiuo1rv.category (
  cate_id int not null auto_increment primary key,
  cate_name varchar(15) not null,
  cate_icon_url varchar(50)
);

create table if not exists rdc01hn4hfiuo1rv.medcate (
  medcate_id int not null auto_increment primary key,
  cate_id int not null,
  med_id int not null,
  FOREIGN KEY fk_medcatecate(cate_id)
  REFERENCES category(cate_id),
  FOREIGN KEY fk_medcatemed(med_id)
  REFERENCES media(med_id)
);

create table if not exists rdc01hn4hfiuo1rv.user (
  user_id int not null auto_increment primary key,
  user_loginTime time,
  user_showPhoto int,
  user_showVideo int,
  user_showAudio int,
  user_startDate date,
  user_endDate date,
  reg_id int,
  cou_id int,
  pla_id int,
  FOREIGN KEY fk_userreg(reg_id)
  REFERENCES region(reg_id),
  FOREIGN KEY fk_usercou(cou_id)
  REFERENCES country(cou_id),
  FOREIGN KEY fk_userpla(pla_id)
  REFERENCES place(pla_id)
);

create table if not exists rdc01hn4hfiuo1rv.usercate (
  usercate_id int not null auto_increment primary key,
  cate_id int not null,
  user_id int not null,
  usercate_weight int not null,
  FOREIGN KEY fk_usercatecate(cate_id)
  REFERENCES category(cate_id),
  FOREIGN KEY fk_usercateuser(user_id)
  REFERENCES user(user_id)
);

create table if not exists rdc01hn4hfiuo1rv.usermed (
  usermed int not null auto_increment primary key,
  med_id int not null,
  user_id int not null,
  FOREIGN KEY fk_usermedmed(med_id)
  REFERENCES media(med_id),
  FOREIGN KEY fk_usermeduser(user_id)
  REFERENCES user(user_id)
);

insert into rdc01hn4hfiuo1rv.region(reg_name) values ("Europe");
insert into rdc01hn4hfiuo1rv.country(cou_name, reg_id) values ("England", 1);

insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type) values ("drunkSailer", "audio/DrunkenSailer.mp3", "Drunken sailor shanty", "audio");
insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type, med_year) values ("londonRadio","audio/london_radio_mid_1990s.mp3","Radio jingles from the 1990's","audio",1995-01-01);
insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type) values ("ruggedCross","audio/old_rugged_cross.mp3","Old rugged cross hymn","audio");
insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type, med_year) values ("pinkFloyd","audio/pink_floyd_1979.mp3","Another brick in the wall by Pink Floyd","audio",1979-01-01);

insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type, med_year, reg_id, cou_id) values ("queen", "photo/Queen.png", "image of the band queen", "photo", 1980-01-01, 1, 1);
insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type) values ("coca_cola","photo/coca_cola.jpg","Coca cola advert","photo");
insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type) values ("cow","photo/cow.jpg","A brown cow standing in a field","photo");
insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type) values ("free_milk","photo/free_milk.jpg","Children recieveing free milk at school","photo");
insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type, med_year) values ("HMS_Invincible","photo/HMS_Invincible_1990.JPEG","The HMS Invincible","photo",1990-01-01);
insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type) values ("Lincoln-cathedral","photo/Lincoln-cathedral.jpg","Lincoln Cathedral","photo");

insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type, med_year, reg_id, cou_id) values ("hovis", "video/HovisAdvert1973.mp4", "Hovis bike advert from 1973", "video", 1973-01-01, 1, 1);
insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type, med_year) values ("Cold_war","video/1941_cold_war_duck.mp4","Donald duck cold war episode","video",1941-01-01);
insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type, med_year) values ("hairSalon","video/1970s_hair.mp4","Clip of hair salon in the 1970s","video",1975-01-01);
insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type, med_year) values ("elvis","video/elvis_presley_1973.mp4","Elvis Presley playing live in 1973","video",1973-01-01);
insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type) values ("fishTank","video/fish_tank.mp4","Clip of a fish tank","video");
insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type, med_year) values ("pope","video/pope_uk_1982.mp4","Pops John II visit to the UK in 1982","video",1982-01-01);
insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type) values ("titanic","video/titanic.mp4","Clip from the movie Titanic","video");

insert into rdc01hn4hfiuo1rv.category(cate_name,cate_icon_url) values ("Music","fas fa-music");
insert into rdc01hn4hfiuo1rv.category(cate_name,cate_icon_url) values ("Adverts","fas fa-ad");
insert into rdc01hn4hfiuo1rv.category(cate_name,cate_icon_url) values ("Sailing","fas fa-ship");
insert into rdc01hn4hfiuo1rv.category(cate_name,cate_icon_url) values ("War","fas fa-shield-alt");
insert into rdc01hn4hfiuo1rv.category(cate_name,cate_icon_url) values ("Church","fas fa-church");
insert into rdc01hn4hfiuo1rv.category(cate_name,cate_icon_url) values ("Animals","fas fa-paw");
insert into rdc01hn4hfiuo1rv.category(cate_name,cate_icon_url) values ("Everyday_life","fas fa-walking");

insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (1, 1);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (3, 1);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (4, 1);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (2, 2);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (7, 2);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (5, 3);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (1, 4);

insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (1, 5);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (2, 6);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (6, 7);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (7, 8);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (4, 9);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (3, 9);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (5, 10);

insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (2, 11);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (4, 12);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (7, 13);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (1, 14);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (6, 15);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (5, 16);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (7, 17);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (3, 17);
