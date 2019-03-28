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
  cate_name varchar(15) not null
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

insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type, med_year, reg_id, cou_id) values ("queen", "photo/Queen.png", "image of the band queen", "photo", 1980-01-01, 1, 1);
insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type, med_year, reg_id, cou_id) values ("hovis", "video/HovisAdvert1973.mp4", "Hovis bike advert from 1973", "video", 1973-01-01, 1, 1);
insert into rdc01hn4hfiuo1rv.media(med_title, med_filepath, med_alt, med_type, med_year) values ("drunkSailer", "audio/DrunkenSailer.mp3", "Drunken sailor shanty", "audio", 1800-01-01);

insert into rdc01hn4hfiuo1rv.category(cate_name) values ("Music");
insert into rdc01hn4hfiuo1rv.category(cate_name) values ("Adverts");
insert into rdc01hn4hfiuo1rv.category(cate_name) values ("Sailing");
insert into rdc01hn4hfiuo1rv.category(cate_name) values ("World War 2");
insert into rdc01hn4hfiuo1rv.category(cate_name) values ("Church");
insert into rdc01hn4hfiuo1rv.category(cate_name) values ("Animals");
insert into rdc01hn4hfiuo1rv.category(cate_name) values ("Everyday life");

insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (1, 1);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (2, 2);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (3, 3);
insert into rdc01hn4hfiuo1rv.medcate(cate_id, med_id) values (7, 2);
