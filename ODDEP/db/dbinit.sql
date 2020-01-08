PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE user(uid integer primary key, name character(20) unique not null, nickname nchar(20) not null, password character(32) not null, salt character(30) not null, power integer default 0);
INSERT INTO "user" VALUES(1,'root','老大哥不会被敲诈','26bd71f6b39404c1ab8b25e2567e80d9','cbuo549w259g4x6r:1479045017993',99);
CREATE TABLE submission(id integer primary key, uid integer not null, pid integer default 1000, token character(30) not null, tag nchar(50), status character(10) default 'in queue', submit_time TIMESTAMP DEFAULT (datetime('now', 'localtime')));
CREATE TABLE problem(pid integer primary key, title nchar(100) not null, source nchar(256), limited varchar not null default '{}', description varchar not null);
INSERT INTO "problem" VALUES (1000, "Visual SandBox", "root", '{"draw2d_circuit_switch_HighLow":99,"draw2d_circuit_display_Led":99,"draw2d_circuit_switch_PushButton":99,"C74LS00":99,"C74LS04":99,"C74LS11":99,"C74LS14":99,"C74LS20":99,"C74LS27":99,"C74LS86":99,"C74LS90":99,"C74LS161":99,"draw2d_circuit_decoder_BCDto7Seg":99,"draw2d_circuit_display_7Segment":99}', "<p>可视化编辑。</p><p>沙盒模式，全开放无限制。</p>");
INSERT INTO "problem" VALUES (1001, "Code SandBox", "root", '["code"]', "<p>编写vhdl代码。</p><p>沙盒模式，全开放无限制。</p>");
COMMIT;