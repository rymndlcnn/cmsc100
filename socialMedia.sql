create database if not exists `socialMedia` /*!40100 DEFAULT CHARACTER SET latin1 */;
use `socialMedia`;

create table if not exists user(
	userId int(5) not null auto_increment,
	username varchar(50),
	name varchar(50),
	email varchar(50),
	password varchar(50),
	about varchar(1000), 
	birthday varchar(50),
	primary key(userId)
); /*ENGINE = InnoDB DEFAULT CHARSET = latin1*/

create table if not exists friendList(
	friendId int(5) not null,
	userId int(5) not null
); /*ENGINE = InnoDB DEFAULT CHARSET = latin1*/

create table if not exists userPost(
	postId int(5) not null auto_increment,
	userId int(5) not null,
	wallId int(5) not null,
	content varchar(1000),
	postDate timestamp not null default current_timestamp(),
	primary key(postId)
); /*ENGINE = InnoDB DEFAULT CHARSET = latin1*/

create table if not exists userComment(
	commentId int(5) not null auto_increment,
	postId int(5) not null,
	userId int(5) not null,
	comment varchar(1000),
	commentDate timestamp not null default current_timestamp(),
	primary key(commentId)
); /*ENGINE = InnoDB DEFAULT CHARSET = latin1*/


create table if not exists friendRequest(
	requestId int(5) not null auto_increment,
	userId int(5) not null,
	friendId int(5) not null,
	pending boolean default false,
	primary key(requestId)
); /*ENGINE = InnoDB DEFAULT CHARSET = latin1*/

insert into user(username, name, email, password, birthday) values("Ru", "John Philip Ruart M. Ranosa", "jmranosa@up.edu.ph", "password", "12/27/1998");
insert into user(username, name, email, password, birthday) values("Jack", "Jack Reacher", "jack@up.edu.ph", "password", "12/17/1998");
insert into user(username, name, email, password, birthday) values("Lailah", "Lailah Rose", "lailah@up.edu.ph", "password", "12/27/1997");
insert into user(username, name, email, password, birthday) values("Ana", "Ana Maganda", "ana@up.edu.ph", "password", "12/27/1998");

insert into friendList(friendId, userId) values(2, 1);
insert into friendList(friendId, userId) values(3, 1);
insert into friendList(friendId, userId) values(4, 1);

insert into userPost(userId, wallId, content) values(1, 1, "FUCK LIFE");
insert into userPost(userId, wallId, content) values(2, 1, "Shut up");
insert into userPost(userId, wallId, content) values(3, 2, "Comsci life is the life");
insert into userPost(userId, wallId, content) values(4, 2, "Hello everyone");

insert into userComment(postId, userId, comment) values(3, 1, "True dat my friend");
insert into userComment(postId, userId, comment) values(1, 1, "Bye bye");

insert into friendRequest(userId, friendId) values(1, 2);
insert into friendRequest(userId, friendId) values(1, 3);
insert into friendRequest(userId, friendId) values(4, 1);
insert into friendRequest(userId, friendId) values(2, 3);	