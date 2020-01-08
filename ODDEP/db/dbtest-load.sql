BEGIN TRANSACTION;
insert into submission (token, uid, tag, pid) values ('test', 1, "测试1", 1000);
insert into submission (token, uid, tag, pid) values ('test1', 1, "测试2", 1001);
insert into submission (token, uid, tag, pid) values ('test2', 1, "测试3", 1002);
insert into submission (token, uid, tag, pid) values ('test3', 1, "测试4", 1002);
/*
insert into submission (token, uid, tag) values ('sqpayiqr940io1or:1476339593927', 1, '再吸一口 屁股');
insert into submission (token, uid) values ('caf4vztmr3aw0zfr:1476348271482', 1);
insert into submission (token, uid, status) values ('lk039ax39e3lerk9:1476348300969', 1, 'done');
insert into submission (token, uid, status) values ('lk039ax39e3lerk9:1476348300969', 1, 'failed');
insert into submission (token, uid, status) values ('lk039ax39e3lerk9:1476348300969', 1, 'running');
insert into submission (token, uid, status) values ('lk039ax39e3lerk9:1476348300969', 1, 'in queue');
insert into submission (token, uid, status, tag) values ('lk039ax39e3lerk9:1476348300969', 1, 'in queue', '三五瓶');
*/
insert into user (name, nickname, password, salt) values ('test', '三K党', '0e0b6b6980233f71786d480ff7e18a2c', 'uh182cpe46l84cxr:1479045069743');
INSERT INTO "problem" (title, source, limited, description) VALUES ("A+B problem", "测试", '["code"]', '<h2>Norwegian Mountain Trip</h2><img border="0" src="http://www.runoob.com/images/pulpit.jpg" alt="Pulpit rock" width="304" height="228">');
COMMIT;
